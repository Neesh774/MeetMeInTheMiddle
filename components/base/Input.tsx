export default function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 px-2 border-2 border-gray-200 dark:border-gray-500 rounded-md outline-none focus:border-secondary-400 dark:focus:border-secondary-400 transition-all duration-200"
    />
  );
}
