import { ExternalToast, toast } from "sonner";

interface Notification {
  success: (message: string) => void;
  error: (message: string) => void;
}

const baseOpts: ExternalToast = {
  position: "bottom-center",
};

export const notification: Notification = {
  success: (message) => {
    toast.success(message, { ...baseOpts });
  },
  error: (message) => {
    toast.error(message, { ...baseOpts });
  },
};
