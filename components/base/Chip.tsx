import { BsCheckLg } from "react-icons/bs";
export default function Chip({
  checked,
  toggle,
  children,
}: {
  checked: boolean;
  toggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center justify-center px-2 py-3 h-5 cursor-pointer rounded-full bg-gray-200 dark:bg-zinc-800 transition-colors duration-300 border-2 ${
        checked
          ? "border-tertiary-400 dark:border-tertiary-600"
          : "border-gray-300 dark:border-zinc-700"
      }`}
      onClick={toggle}
    >
      {checked && (
        <BsCheckLg className="text-tertiary-600 dark:text-tertiary-400 mr-2 text-sm" />
      )}
      {children}
    </div>
  );
}
