
// This file is redirecting to our custom hook implementation
import { useToast } from "@/hooks/use-toast";

// Re-export both our custom hook and the toast object
export { useToast };

// We don't export toast directly from this file anymore
// as it needs to be used from the hook implementation
