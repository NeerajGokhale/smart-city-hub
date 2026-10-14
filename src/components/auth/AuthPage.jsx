import { useState } from "react";
import RoleSelect from "./RoleSelect.jsx";
import CitizenAuth from "./CitizenAuth.jsx";
import AdminAuth from "./AdminAuth.jsx";
import Icon from "../icons/Icon.jsx";

export default function AuthPage({ onDone }) {
  const [role, setRole] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 min-h-[70vh] flex flex-col justify-center relative">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none">
        <Icon name="sparkle" size={22} className="text-cyan" />
      </div>
      {!role && <RoleSelect onPick={setRole} />}
      {role === "citizen" && <CitizenAuth onBack={() => setRole(null)} onSuccess={onDone} />}
      {role === "admin" && <AdminAuth onBack={() => setRole(null)} onSuccess={onDone} />}
    </div>
  );
}
