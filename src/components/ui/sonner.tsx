"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const SonnerToaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      duration={50000}
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-primary group-[.toaster]:border-border group-[.toaster]:shadow-sm dark:group-[.toaster]:text-primary",
          description: "group-[.toast]:text-muted-foreground text-xs",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground mt-6",
          cancelButton:
            "group-[.toast]:bg-primary group-[.toast]:text-muted-foreground absolute top-2 right-4 ",
        },
      }}
      {...props}
    />
  );
};

export { SonnerToaster };
