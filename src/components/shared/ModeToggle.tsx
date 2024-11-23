import { Moon, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "@/components/theme-provider";
import { ModeToggleProps } from "@/types";

export function ModeToggle({ expand }: ModeToggleProps) {
  const { setTheme, theme } = useTheme();

  return (
    <ToggleGroup
      type="single"
      className={`flex flex-row gap-0 ${
        expand && "flex-row"
      } rounded-sm bg-black/5 dark:bg-white/5 h-8 `}
      value={theme}
    >
      <ToggleGroupItem
        value="light"
        className="rounded-md border-b-4 border-[#fbd008] dark:border-none"
        onClick={() => {
          const selectedTheme = theme === "light" ? "dark" : "light";
          setTheme(selectedTheme);
        }}
      >
        <Sun className="size-3" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="dark"
        className="rounded-md dark:border-b-4 dark:border-[#fbd008]"
        onClick={() => {
          const selectedTheme = theme === "dark" ? "light" : "dark";
          setTheme(selectedTheme);
        }}
      >
        <Moon className="size-3" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
