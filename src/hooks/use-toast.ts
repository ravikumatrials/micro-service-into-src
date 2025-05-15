
import { toast as sonnerToast } from 'sonner';

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
  default: (...args: Parameters<typeof sonnerToast>): void => {
    return sonnerToast(...args);
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

export const useToast = () => {
  return { toast };
};
