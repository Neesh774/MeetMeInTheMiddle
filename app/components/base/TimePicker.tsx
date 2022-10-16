import { useState, useEffect } from "react";
import Button from "./Button";

export default function TimePicker({
  time, // in hours
  setTime,
  days,
  setDay,
}: {
  time: string;
  setTime: (time: string) => void;
  days: string[];
  setDay: (day: number) => void;
}) {
  const [hours, setHours] = useState(
    parseInt(time.slice(0, 2)) > 12
      ? parseInt(time.slice(0, 2)) - 12
      : parseInt(time.slice(0, 2))
  );
  const [minutes, setMinutes] = useState(parseInt(time.slice(2, 4)));
  const [hourValue, setHourValue] = useState(hours);
  const [minuteValue, setMinuteValue] = useState(minutes);
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
    <div className="flex flex-row justify-end items-center gap-2 w-full">
      <select
        onChange={(e) => setDay(Number((e.target as HTMLSelectElement).value))}
        className="px-1 w-28 h-7 text-sm rounded-md bg-gray-100 dark:bg-zinc-800 focus:outline-tertiary-400 border border-black/20 dark:border-zinc-600"
      >
        {days.map((day, i) => (
          <option label={day} value={i} key={i} />
        ))}
      </select>
      <div className="flex flex-row items-center gap-2">
        <input
          type="number"
          value={hourValue}
          onChange={(e) => {
            const value = Number((e.target as HTMLInputElement).value);
            setHourValue(value);
          }}
          onBlur={(e) => {
            const value = Number((e.target as HTMLInputElement).value);
            if (value > 12) {
              setHours(12);
              setHourValue(12);
            } else if (value < 1) {
              setHours(1);
              setHourValue(1);
            } else {
              setHours(value);
            }
          }}
          className="w-8 h-8 rounded-lg border text-center border-black/20 dark:border-zinc-600 bg-gray-100 dark:bg-zinc-800 focus:outline-tertiary-400"
        />
        <span className="font-extrabold text-lg">:</span>
        <input
          type="number"
          value={minuteValue.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
          })}
          onChange={(e) => {
            const number = Number((e.target as HTMLInputElement).value);
            setMinuteValue(number);
          }}
          onBlur={(e) => {
            const number = Number((e.target as HTMLInputElement).value);
            if (number > 59) {
              setMinutes(59);
              setMinuteValue(59);
            } else if (number < 0) {
              setMinutes(0);
              setMinuteValue(0);
            } else {
              setMinutes(number);
            }
          }}
          className="w-8 h-8 rounded-lg border text-center border-black/20 dark:border-zinc-600 bg-gray-100 dark:bg-zinc-800 focus:outline-tertiary-400"
        />
        <button
          className="w-8 h-8 flex justify-center items-center px-2 rounded-md bg-gray-200 dark:bg-zinc-800"
          onClick={() => {
            setMeridiem(meridiem === "AM" ? "PM" : "AM");
          }}
        >
          {meridiem}
        </button>
      </div>
    </div>
  );
}
