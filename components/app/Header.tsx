import { useTheme } from "next-themes";
import { useState } from "react";
import { TbMoon, TbSun } from "react-icons/tb";
import useHasMounted from "../../utils/useHasMounted";
import IconButton from "../base/IconButton";
export default function Header() {
  const { theme, setTheme } = useTheme();
  const hasMounted = useHasMounted();
  return (
    <header className="flex justify-between items-center py-4 max-h-[8%] border-b-2 bg-slate-50 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 px-8">
      <h1 className="text-4xl font-bold font-display text-secondary-600 dark:text-secondary-400 pointer-events-none select-none">
        Meet Me{" "}
        <span className="text-primary-600 dark:text-primary-400">Here</span>
      </h1>
      {hasMounted && (
        <IconButton
          onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
        >
          {theme == "dark" ? <TbMoon /> : <TbSun />}
        </IconButton>
      )}
    </header>
  );
}
