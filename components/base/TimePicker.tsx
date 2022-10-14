import { useState, useEffect } from "react";
import Button from "./Button";

export default function TimePicker({
  time, // in hours
  setTime,
}: {
  time: string;
  setTime: (time: string) => void;
}) {
  const [hours, setHours] = useState(
    parseInt(time.slice(0, 2)) > 12
      ? parseInt(time.slice(0, 2)) - 12
      : parseInt(time.slice(0, 2))
  );
  const [minutes, setMinutes] = useState(parseInt(time.slice(3, 5)));
  const [meridiem, setMeridiem] = useState(
    parseInt(time.slice(0, 2)) > 12 ? "PM" : "AM"
  );

  useEffect(() => {
    // convert to 24 hour time
    let newTime = hours;
    if (meridiem == "PM") {
      newTime += 12;
    }
    if (newTime == 24) {
      newTime = 0;
    }
    setTime(
      newTime.toString().padStart(2, "0") + minutes.toString().padStart(2, "0")
    );
  }, [hours, minutes, meridiem]);

  return (
    <div className="flex flex-row items-center gap-2">
      <input
        type="number"
        value={hours}
        onChange={(e) => {
          const value = Number((e.target as HTMLInputElement).value);
          setHours(value);
        }}
        onBlur={(e) => {
          const value = Number((e.target as HTMLInputElement).value);
          if (value > 12) {
            setHours(12);
          } else if (value < 1) {
            setHours(1);
          } else {
            setHours(value);
          }
        }}
        className="w-10 h-8 rounded-lg border text-center border-zinc-400 dark:border-zinc-600"
      />
      <span>:</span>
      <input
        type="number"
        value={minutes < 10 ? "0" + minutes : minutes}
        min={0}
        max={59}
        onChange={(e) => {
          const number = Number((e.target as HTMLInputElement).value);
          setMinutes(number);
        }}
        className="w-10 h-8 rounded-lg border text-center border-zinc-400 dark:border-zinc-600"
      />
      <button
        className="h-8 px-2 rounded-lg bg-gray-200 dark:bg-zinc-700"
        onClick={() => {
          setMeridiem(meridiem === "AM" ? "PM" : "AM");
        }}
      >
        {meridiem}
      </button>
    </div>
  );
}
