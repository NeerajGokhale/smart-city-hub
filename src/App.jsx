import { useState } from "react";
import { ToastProvider } from "./context/ToastContext.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import { ensureSeeded } from "./data/seed.js";

import TopNav from "./components/layout/TopNav.jsx";
import Footer from "./components/layout/Footer.jsx";
import AlertBanner from "./components/layout/AlertBanner.jsx";
import HomeView from "./components/home/HomeView.jsx";
import AuthPage from "./components/auth/AuthPage.jsx";
import CitizenPortal from "./components/citizen/CitizenPortal.jsx";
import AdminPanel from "./components/admin/AdminPanel.jsx";

ensureSeeded();

function AppShell() {
  const { session } = useAuth();
  const [requestedView, setRequestedView] = useState("home");

  // Derive the actual view from the requested one + current session, rather than
  // patching it after the fact in an effect. This keeps role changes, logout and
  // post-login redirects consistent within a single render.
  let view = requestedView;
  if (!session && (view === "citizen" || view === "admin")) view = "home";
  if (session && view === "auth") view = session.role === "admin" ? "admin" : "home";
  if (session && session.role === "citizen" && view === "admin") view = "citizen";
  if (session && session.role === "admin" && view === "citizen") view = "admin";

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav view={view} setView={setRequestedView} />
      {view !== "auth" && <AlertBanner />}
      <div className="flex-1">
        {view === "home" && <HomeView setView={setRequestedView} />}
        {view === "auth" && <AuthPage onDone={() => {}} />}
        {view === "citizen" && session && session.role === "citizen" && <CitizenPortal />}
        {view === "admin" && session && session.role === "admin" && <AdminPanel />}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <DataProvider>
          <AppShell />
        </DataProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
