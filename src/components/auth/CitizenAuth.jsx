import { useState } from "react";
import Icon from "../icons/Icon.jsx";
import { Field, inputCls, Btn } from "../ui/Primitives.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

export default function CitizenAuth({ onBack, onSuccess }) {
  const [mode, setMode] = useState("login");
  const { login, register } = useAuth();
  const push = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (mode === "login") {
      if (!email.trim() || !password.trim()) { setError("Please enter both email and password."); return; }
      const res = await login(email, password);
      if (res.ok) { push("Signed in as " + res.session.name, "success"); onSuccess(); }
      else setError(res.error);
    } else {
      const res = await register(name, email, password);
      if (res.ok) { push("Account created — welcome, " + res.session.name + "!", "success"); onSuccess(); }
      else setError(res.error);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-ink-mid hover:text-white mb-6">
        <Icon name="arrow-left" size={15} /> Back
      </button>

      <div className="glass rounded-2xl p-7 glow-cyan">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-cyan/10 text-cyan">
          <Icon name="user" size={20} />
        </div>
        <h2 className="font-display text-xl text-ink-hi mb-1">Citizen access</h2>
        <p className="text-sm text-ink-mid mb-6">
          {mode === "login" ? "Sign in to report and track civic issues." : "Create your citizen account in seconds."}
        </p>

        <div className="flex gap-1 bg-white/[0.03] rounded-xl p-1 mb-6">
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={"flex-1 text-sm py-2 rounded-lg font-medium transition " + (mode === "login" ? "bg-white/[0.09] text-cyan" : "text-ink-mid")}
          >
            Sign in
          </button>
          <button
            onClick={() => { setMode("register"); setError(""); }}
            className={"flex-1 text-sm py-2 rounded-lg font-medium transition " + (mode === "register" ? "bg-white/[0.09] text-cyan" : "text-ink-mid")}
          >
            Register
          </button>
        </div>

        <form onSubmit={submit}>
          {mode === "register" && (
            <Field label="Full name">
              <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Lee" autoFocus />
            </Field>
          )}
          <Field label="Email address">
            <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoFocus={mode === "login"} />
          </Field>
          <Field label="Password">
            <input className={inputCls} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={mode === "login" ? "••••••••" : "Create a password"} />
          </Field>
          {error && <p className="text-xs text-[#f9748a] mb-4 -mt-2">{error}</p>}
          <Btn type="submit" className="w-full">
            {mode === "login" ? "Sign in" : "Create account"} <Icon name="arrow-right" size={15} />
          </Btn>
        </form>

        {mode === "login" && (
          <div className="mt-5 pt-4 border-t border-white/5 text-xs text-ink-lo leading-relaxed">
            Demo citizen: aditi@citizen.com / citizen123
          </div>
        )}
      </div>
    </div>
  );
}
