export default function Button({
  onClick,
  children,
  style,
  size,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  style?: "primary" | "secondary" | "white" | "disabled";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <button
      onClick={style != "disabled" ? onClick : undefined}
      className={`rounded-md font-medium transition-all duration-200 ease-in-out ${
        style == "secondary"
          ? "bg-secondary-400/40 text-secondary-600 hover:bg-secondary-400/60 dark:bg-secondary-600/50 dark:hover:bg-secondary-600/60"
          : style == "white"
          ? "border-2 border-zinc-300 dark:border-zinc-50/50 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20"
          : style == "disabled"
          ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          : "bg-secondary-400 text-white/90 hover:bg-secondary-600 dark:bg-secondary-600 dark:hover:bg-secondary-400"
      } ${
        size == "sm"
          ? "text-sm px-2 py-1"
          : size == "md"
          ? "text-md px-3 py-2"
          : "text-lg px-4 py-2"
      }`}
    >
      {children}
    </button>
  );
}
