
import { useToast } from "@/hooks/use-toast";
import { Toaster as SonnerToaster } from "sonner";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <>
      {/* Use the sonner toaster for our actual toasts */}
      <SonnerToaster 
        theme="light"
        className="toaster group"
        toastOptions={{
          classNames: {
            toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground",
            actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          },
        }}
      />
      
      {/* Legacy toast provider for backward compatibility */}
      <ToastProvider>
        {Array.isArray(toasts) && toasts.length > 0 && toasts.map(function ({ id, title, description, action, className, variant, ...props }) {
          return (
            <Toast key={id} className={className} variant={variant}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </Toast>
          );
        })}
        <ToastViewport />
      </ToastProvider>
    </>
  );
}
