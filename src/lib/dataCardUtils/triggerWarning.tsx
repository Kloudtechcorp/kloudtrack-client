import { toast } from "sonner";

export const triggerWarningToast = (message: string) => {
  toast(message, {
    description: "Please take the necessary precautions.",
    action: {
      label: "Close",
      onClick: () => console.log("Acknowledge clicked"),
    },
  });
};
