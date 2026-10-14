import { useState } from "react";
import Icon from "../icons/Icon.jsx";
import { Field, inputCls, Btn, Pill, Empty } from "../ui/Primitives.jsx";
import { useData } from "../../context/DataContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { SEVERITY_CFG } from "../../data/constants";
import { fmtDate } from "../../utils/helpers";

export default function AlertComposer() {
  const { alerts, addAlert, toggleAlert, deleteAlert } = useData();
  const push = useToast();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("Info");

  function submit(e) {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    addAlert({ title: title.trim(), message: message.trim(), severity });
    push("Alert published to all citizens.", "success");
    setTitle(""); setMessage(""); setSeverity("Info");
  }

  const sorted = [...alerts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="grid lg:grid-cols-[380px_1fr] gap-6">
      <div className="glass rounded-2xl p-6 h-fit">
        <h3 className="font-display text-[15px] text-ink-hi mb-4">Compose broadcast alert</h3>
        <form onSubmit={submit}>
          <Field label="Title">
            <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Flash Flood Warning" />
          </Field>
          <Field label="Severity">
            <div className="flex gap-2">
              {Object.keys(SEVERITY_CFG).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSeverity(s)}
                  className={"flex-1 text-xs py-2 rounded-lg border transition " + (severity === s ? "border-current" : "border-white/10 opacity-50")}
                  style={{ color: SEVERITY_CFG[s].color }}
                >
                  {s}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Message">
            <textarea className={inputCls + " min-h-[90px] resize-none"} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Details for citizens..." />
          </Field>
          <Btn type="submit" variant="violet" className="w-full">
            Publish alert <Icon name="zap" size={14} />
          </Btn>
        </form>
      </div>
      <div>
        <h3 className="font-display text-[15px] text-ink-hi mb-4">All alerts</h3>
        {sorted.length === 0 ? (
          <Empty icon="alert" title="No alerts yet" message="Published alerts will appear here." />
        ) : (
          <div className="flex flex-col gap-3">
            {sorted.map((a) => {
              const cfg = SEVERITY_CFG[a.severity];
              return (
                <div key={a.id} className="glass rounded-xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ color: cfg.color, background: cfg.bg }}>
                    <Icon name={a.severity === "Critical" ? "siren" : "alert"} size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Pill color={cfg.color}>{cfg.label}</Pill>
                      <span className={"text-[10px] px-2 py-0.5 rounded-full " + (a.active ? "bg-emerald/10 text-emerald" : "bg-white/5 text-ink-lo")}>
                        {a.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-ink-hi">{a.title}</p>
                    <p className="text-xs text-ink-mid mt-0.5">{a.message}</p>
                    <p className="text-[10px] text-ink-lo mt-1.5">{fmtDate(a.createdAt)}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => { toggleAlert(a.id); push(a.active ? "Alert deactivated." : "Alert activated.", "info"); }}
                      className="text-[10px] px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-ink-mid whitespace-nowrap"
                    >
                      {a.active ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => { deleteAlert(a.id); push("Alert deleted.", "info"); }} className="text-[10px] px-2.5 py-1.5 rounded-lg bg-rose/10 hover:bg-rose/20 text-[#f9748a]">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
