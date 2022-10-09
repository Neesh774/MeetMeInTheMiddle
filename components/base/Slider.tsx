export default function Slider({
  value,
  setValue,
  min,
  max,
}: {
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex flex-row items-center gap-2 w-full mx-4 lg:mx-12">
      <input
        type="range"
        min={min ?? 0}
        max={max ?? 100}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <div className="text-lg font-semibold text-zinc-500 dark:text-zinc-400">
        {value}
      </div>
    </div>
  );
}
