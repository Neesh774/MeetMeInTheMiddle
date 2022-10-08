import { useTheme } from "next-themes";
import { useState } from "react";
import { TbMoon, TbSun } from "react-icons/tb";
import useHasMounted from "../../utils/useHasMounted";
import IconButton from "../base/IconButton";
import Image from "next/image";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const hasMounted = useHasMounted();
  return (
    <header className="flex justify-between items-center py-4 max-h-[8%] border-b-2 bg-slate-50 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 px-8">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={296}
        height={45}
        layout="fixed"
      />
      {hasMounted && (
        <IconButton
          onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
          width="6"
        >
          {theme == "dark" ? <TbMoon /> : <TbSun />}
        </IconButton>
      )}
    </header>
  );
}
