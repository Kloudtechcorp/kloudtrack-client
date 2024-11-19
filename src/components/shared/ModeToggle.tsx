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
      } rounded-full bg-gray-200 dark:bg-gray-800 h-8`}
      value={theme}
    >
      <ToggleGroupItem
        value="light"
        className="rounded-full"
        onClick={() => {
          const selectedTheme = theme === "light" ? "dark" : "light";
          setTheme(selectedTheme);
        }}
      >
        <Sun className="size-3" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="dark"
        className="rounded-full"
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
