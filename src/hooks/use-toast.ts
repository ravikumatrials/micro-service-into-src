
import { toast as sonnerToast, type ExternalToast } from 'sonner';
import * as React from "react";

type ToastProps = {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
  action?: React.ReactNode;
};

// A wrapper that normalizes the toast API
export const toast = {
  // Default toast
  default: (message: React.ReactNode, data?: ExternalToast): void => {
    sonnerToast(message, data);
  },
  // Success toast
  success: (message: string | ToastProps): void => {
    if (typeof message === 'string') {
      sonnerToast.success(message);
    } else {
      sonnerToast.success(message.title, {
        description: message.description,
        duration: message.duration,
        action: message.action,
      });
    }
  },
  // Error toast
  error: (message: string | ToastProps): void => {
    if (typeof message === 'string') {
      sonnerToast.error(message);
    } else {
      sonnerToast.error(message.title, {
        description: message.description,
        duration: message.duration,
        action: message.action,
      });
    }
  },
  // Info toast
  info: (message: string | ToastProps): void => {
    if (typeof message === 'string') {
      sonnerToast.info(message);
    } else {
      sonnerToast.info(message.title, {
        description: message.description,
        duration: message.duration,
        action: message.action,
      });
    }
  },
  // Warning toast
  warning: (message: string | ToastProps): void => {
    if (typeof message === 'string') {
      sonnerToast.warning(message);
    } else {
      sonnerToast.warning(message.title, {
        description: message.description,
        duration: message.duration,
        action: message.action,
      });
    }
  },
};

// Export a simple version of useToast for compatibility with components expecting the toast function
export const useToast = () => {
  return { toast };
};
