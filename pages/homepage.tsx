import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect } from "react";
import Header from "../components/app/Header";

export default function Homepage() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  });
  return (
    <div className="h-screen bg-zinc-50 dark:bg-zinc-800">
      <Header showModeToggle={false} />
      <section className="flex flex-row gap-8 h-screen w-11/12 mx-auto">
        <div className="flex flex-col gap-4 w-1/2 pt-[10%]">
          <div className="flex flex-col gap-4 mb-6">
            <h1 className="text-7xl font-bold font-display text-secondary-600 dark:text-secondary-400">
              Meet Me{" "}
              <span className="text-primary-600 dark:text-primary-400">
                In The Middle
              </span>
            </h1>
            <p className="text-2xl font-semibold text-gray-600 dark:text-zinc-200">
              Find the best meeting spots right in the middle of you and all
              your friends.
            </p>
          </div>
          <div className="flex flex-col p-2 ml-2 rounded-md h-24">
            <h2 className="font-semibold text-blue-500 dark:text-blue-400 text-lg">
              Perfect for small and large groups
            </h2>
            <p className="text-gray-500 pl-2 dark:text-gray-400">
              Add up to 10 different addresses, so nobody in your group gets
              left behind.
            </p>
          </div>
          <div className="flex flex-col p-2 ml-2 rounded-md h-24">
            <h2 className="font-semibold text-emerald-500 dark:text-emerald-400 text-lg">
              Allows you to filter based on type...
            </h2>
            <p className="text-gray-500 pl-2 dark:text-gray-400">
              Look for cafes, restaurants, train stations, and other places to
              meet up.
            </p>
          </div>
          <div className="flex flex-col p-2 ml-2 rounded-md h-24">
            <h2 className="font-semibold text-orange-500 dark:text-orange-400 text-lg">
              ...and on the time of day as well
            </h2>
            <p className="text-gray-500 pl-2 dark:text-gray-400">
              Specify the day and time you want to meet up, so you only see
              places that are open.
            </p>
          </div>
        </div>
        <div className="flex flex-row w-1/2 items-end justify-end">
          <Image
            src="/hero.svg"
            alt="Hero Image"
            width={400}
            height={485}
            className="-scale-x-100"
          />
        </div>
      </section>
    </div>
  );
}
