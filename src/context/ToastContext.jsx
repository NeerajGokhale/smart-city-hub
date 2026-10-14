import { createContext, useContext, useState } from "react";
import Icon from "../components/icons/Icon.jsx";
import { uid } from "../utils/helpers";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function push(message, type = "info") {
    const id = uid("t");
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3400);
  }

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2 w-[calc(100%-2.5rem)] max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              "animate-toastIn glass-strong rounded-xl px-4 py-3 flex items-start gap-3 border-l-2 " +
              (t.type === "success" ? "border-l-emerald" : t.type === "error" ? "border-l-rose" : "border-l-cyan")
            }
          >
            <div className="mt-0.5" style={{ color: t.type === "success" ? "#22e0a0" : t.type === "error" ? "#f43f5e" : "#00f5ff" }}>
              <Icon name={t.type === "success" ? "check" : t.type === "error" ? "alert" : "info"} size={16} />
            </div>
            <p className="text-sm text-ink-hi leading-snug">{t.message}</p>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
