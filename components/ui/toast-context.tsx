"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { X, Check, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (props: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    ({
      title,
      description,
      type = "info",
      duration = 3000,
    }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { id, title, description, type, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-4 max-w-md w-full p-4 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-start gap-4 animate-in slide-in-from-right-full duration-300 relative group overflow-hidden"
          >
            {/* Contextual Icon Background */}
            <div
              className={`
              flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black 
              ${
                t.type === "success"
                  ? "bg-[#98FB98]"
                  : t.type === "error"
                    ? "bg-[#FF6B6B]"
                    : t.type === "warning"
                      ? "bg-[#FFDE59]"
                      : "bg-[#87CEEB]"
              }
            `}
            >
              {t.type === "success" && <Check className="h-6 w-6 text-black" />}
              {t.type === "error" && (
                <AlertCircle className="h-6 w-6 text-black" />
              )}
              {t.type === "warning" && (
                <AlertCircle className="h-6 w-6 text-black" />
              )}
              {t.type === "info" && <Info className="h-6 w-6 text-black" />}
            </div>

            <div className="flex-1 space-y-1">
              {t.title && (
                <h3 className="font-black uppercase tracking-tight text-lg leading-none">
                  {t.title}
                </h3>
              )}
              {t.description && (
                <p className="text-sm font-bold text-gray-600 leading-tight">
                  {t.description}
                </p>
              )}
            </div>

            <button
              onClick={() => dismiss(t.id)}
              className="absolute top-2 right-2 p-1 hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
