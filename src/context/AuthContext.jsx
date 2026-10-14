import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthCtx = createContext(null);

async function loadProfileAsSession(user) {
  if (!user) return null;
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, name, email, role")
    .eq("id", user.id)
    .single();
  if (error || !profile) {
    if (error) console.error("[auth] could not load profile:", error.message);
    // Profile row missing (e.g. schema was reset): fall back to a least-privilege citizen session
    // built from the auth user, so login still works. Role is NEVER taken from client metadata.
    return {
      role: "citizen",
      userId: user.id,
      name: user.user_metadata?.name || (user.email || "").split("@")[0] || "Citizen",
      email: user.email,
    };
  }
  return { role: profile.role, userId: profile.id, name: profile.name, email: profile.email };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On first load, check if Supabase already has a session stored
    // (it persists this in the browser for you automatically).
    supabase.auth.getSession().then(async ({ data }) => {
      const s = await loadProfileAsSession(data.session?.user ?? null);
      setSession(s);
      setLoading(false);
    });

    // Keep our session in sync whenever Supabase's auth state changes
    // (login, logout, token refresh, another tab logging out, etc.)
    // NOTE: don't await Supabase calls directly inside this callback — supabase-js holds an auth
    // lock while it runs, so a query here can deadlock. Defer it to the next tick instead.
    const { data: listener } = supabase.auth.onAuthStateChange((_event, authSession) => {
      setTimeout(async () => {
        const s = await loadProfileAsSession(authSession?.user ?? null);
        setSession(s);
      }, 0);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) return { ok: false, error: error.message };
    const s = await loadProfileAsSession(data.user);
    if (!s) return { ok: false, error: "Could not load account details." };
    setSession(s);
    return { ok: true, session: s };
  }

  async function register(name, email, password) {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return { ok: false, error: "All fields are required." };
    }
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { name: name.trim() } }, // role is never sent from here — always defaults to 'citizen'
    });
    if (error) return { ok: false, error: error.message };
    if (!data.session) {
      // Only happens if "Confirm email" is turned back on in Supabase settings.
      return { ok: false, error: "Check your email to confirm your account, then sign in." };
    }
    const s = await loadProfileAsSession(data.user);
    if (!s) return { ok: false, error: "Could not load account details." };
    setSession(s);
    return { ok: true, session: s };
  }

  async function logout() {
    await supabase.auth.signOut();
    setSession(null);
  }

  return (
    <AuthCtx.Provider value={{ session, loading, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}