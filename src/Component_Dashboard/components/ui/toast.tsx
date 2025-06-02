import * as React from "react"
import {
  type ReactNode,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border border-border bg-background px-4 py-3 shadow-sm transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-100 data-[state=open]:zoom-in-95",
  {
    variants: {
      variant: {
        default: "border",
        destructive:
          "destructive group/destructive border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]/destructive:border-muted/50 group-[.destructive]/destructive:text-gray-50",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md text-gray-50 opacity-0 transition-opacity hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-hover:opacity-100 group-[.destructive]/destructive:text-gray-300 group-[.destructive]/destructive:hover:text-gray-50",
      className
    )}
    aria-label="Close"
    {...props}
  >
    <Icons.close className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("mb-1 text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-70", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastViewportProps = React.ComponentPropsWithoutRef<typeof ToastViewport>

const ToastContext = React.createContext<{
  addToast: (toast: ToastProps) => void
  updateToast: (toast: ToastProps) => void
  removeToast: (toastId: string) => void
  toasts: ToastProps[]
}>({
  addToast: () => {},
  updateToast: () => {},
  removeToast: () => {},
  toasts: [],
})

const useToast = () => useContext(ToastContext)

type ToasterProps = {
  children?: ReactNode
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
  hotkey?: string[]
  closeDelay?: number
}

const Toaster = ({
  children,
  position = "bottom-right",
  hotkey,
  closeDelay = 2000,
}: ToasterProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (hotkey && hotkey.every((key) => event.key === key)) {
        event.preventDefault()
        dismiss()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [hotkey])

  const addToast = (toast: ToastProps) => {
    const id = String(Math.random())
    setToasts((prevToasts) => [...prevToasts, { id, ...toast }])

    if (toast.duration !== null) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration || closeDelay)
    }
  }

  const updateToast = (toast: ToastProps) => {
    setToasts((prevToasts) =>
      prevToasts.map((t) => (t.id === toast.id ? { ...t, ...toast } : t))
    )
  }

  const removeToast = (toastId: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toastId))
  }

  const dismiss = () => {
    toasts.forEach((toast) => {
      removeToast(toast.id as string)
    })
  }

  const contextValue = React.useMemo(
    () => ({
      addToast,
      updateToast,
      removeToast,
      toasts,
    }),
    [addToast, updateToast, removeToast, toasts]
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastProvider>
        <ToastViewport
          className={position}
          style={{
            "--radix-toast-swipe-move-x": "calc(var(--radix-toast-swipe-end-x) * -1)",
          }}
        />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

export {
  Toaster,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  Toast,
  ToastViewport,
  useToast,
}
