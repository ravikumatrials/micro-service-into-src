
import * as React from "react";
import { cn } from "@/lib/utils";
import { toast as baseToast } from "./use-toast";

type ToastProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

const ToastContext = React.createContext<{
  toast: (props: ToastProps) => void;
  dismissToast: (toastId: string) => void;
  dismissAllToasts: () => void;
  toasts: Array<ToastProps & { id: string }>;
}>({
  toast: () => {},
  dismissToast: () => {},
  dismissAllToasts: () => {},
  toasts: []
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<
    Array<ToastProps & { id: string }>
  >([]);

  const toast = React.useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { ...props, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  const dismissToast = React.useCallback((toastId: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
  }, []);

  const dismissAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider
      value={{ toast, dismissToast, dismissAllToasts, toasts }}
    >
      {children}
      <div className="fixed bottom-0 right-0 z-50 p-4 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "flex items-center justify-between p-4 bg-white border rounded-md shadow-md",
              toast.variant === "destructive" && "bg-red-50 border-red-300",
              toast.className
            )}
          >
            <div>
              {toast.title && <div className="font-medium">{toast.title}</div>}
              {toast.description && <div className="text-sm">{toast.description}</div>}
            </div>
            {toast.action}
            <button
              onClick={() => dismissToast(toast.id)}
              className="ml-4 text-gray-400 hover:text-gray-500"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Export the toast object from use-toast.ts with all its methods
export const toast = baseToast;
