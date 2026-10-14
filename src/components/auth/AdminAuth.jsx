import { useState } from "react";
import Icon from "../icons/Icon.jsx";
import { Field, inputCls, Btn } from "../ui/Primitives.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

export default function AdminAuth({ onBack, onSuccess }) {
  const { login } = useAuth();
  const push = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { setError("Please enter both email and password."); return; }
    const res = await login(email, password);
    if (res.ok) { push("Signed in as " + res.session.name, "success"); onSuccess(); }
    else setError(res.error);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-ink-mid hover:text-white mb-6">
        <Icon name="arrow-left" size={15} /> Back
      </button>

      <div className="glass rounded-2xl p-7 glow-violet">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-violet/10 text-violet">
          <Icon name="shield" size={20} />
        </div>
        <h2 className="font-display text-xl text-ink-hi mb-1">Administrator access</h2>
        <p className="text-sm text-ink-mid mb-6">Admin accounts are pre-provisioned by the city. Sign in with your issued credentials.</p>

        <form onSubmit={submit}>
          <Field label="Admin email">
            <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@smartcity.gov" autoFocus />
          </Field>
          <Field label="Password">
            <input className={inputCls} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </Field>
          {error && <p className="text-xs text-[#f9748a] mb-4 -mt-2">{error}</p>}
          <Btn type="submit" variant="violet" className="w-full">
            Sign in to command center <Icon name="arrow-right" size={15} />
          </Btn>
        </form>

        <div className="mt-5 pt-4 border-t border-white/5 text-xs text-ink-lo leading-relaxed">
          Demo admin: admin@smartcity.gov / admin123
        </div>
      </div>
    </div>
  );
}
