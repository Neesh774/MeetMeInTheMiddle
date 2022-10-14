import Image from "next/image";
import { useEffect, useState } from "react";
import { BiHelpCircle, BiX } from "react-icons/bi";
import Button from "../base/Button";

export default function Modal() {
  const [closed, setClosed] = useState(true);
  const [bgDelay, setBgDelay] = useState(false);

  useEffect(() => {
    if (!closed) {
      setTimeout(() => setBgDelay(true), 100);
    } else {
      setTimeout(() => setBgDelay(false), 100);
    }
  }, [closed]);

  return (
    <>
      <div className="absolute right-2 bottom-28 lg:bottom-6">
        <button
          className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-50 dark:bg-zinc-600"
          onClick={() => setClosed(!closed)}
        >
          <BiHelpCircle className="w-6 h-6" />
        </button>
      </div>
      <div
        className={`absolute left-0 right-0 flex justify-center lg:pt-32 top-0 bottom-0 transition-all duration-300 ${
          closed
            ? "opacity-0 pointer-events-none bg-black/0"
            : "z-50 opacity-100 bg-black/40"
        } ${bgDelay && "delay-100"}`}
        onClick={() => setClosed(true)}
      >
        <div
          className={`xl:w-1/3 lg:w-1/2 w-full h-full lg:h-fit rounded-lg bg-gray-100 dark:bg-zinc-800 z-50 flex flex-col px-2 pb-8 pt-2 transition-all duration-300 ease-out ${
            closed
              ? "opacity-50 lg:opacity-0 pointer-events-none translate-y-48 lg:translate-y-20"
              : "opacity-100 translate-y-0"
          } ${!bgDelay && "delay-100"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end">
            <button
              className="w-8 h-8 flex justify-center items-center rounded-md hover:bg-black/10 hover:dark:bg-white/10 transition-all duration-100"
              onClick={() => setClosed(true)}
            >
              <BiX />
            </button>
          </div>
          <div className="px-2 flex flex-col gap-4">
            <div>
              <h1 className="text-xl text-gray-800 dark:text-zinc-100 font-bold">
                What Is This?
              </h1>
              <p className="text-gray-800 dark:text-zinc-400">
                <span className="text-secondary-400 font-bold">
                  Meet Me In The Middle
                </span>{" "}
                is a tool to help you find the best places to meet up with
                friends, family, or coworkers. I created it because I wanted to
                meet up with some friends, but didn&apos;t know where to go, and
                couldn&apos;t find a tool that could help. I hope you find it
                useful!
              </p>
            </div>
            <div>
              <h1 className="text-xl text-gray-800 dark:text-zinc-100 font-bold">
                How Do I Use It?
              </h1>
              <p className="text-gray-800 dark:text-zinc-400">
                Enter the addresses of the people you want to meet up with, and
                then adjust the filters based on what you want to do. Once
                you&apos;re ready, click{" "}
                <span className="rounded-md font-medium bg-secondary-400 text-white/90 dark:bg-secondary-600 text-sm px-2 py-1 max-h-8 max-w-fit">
                  Search
                </span>{" "}
                .
              </p>
            </div>
            <div>
              <h1 className="text-xl text-gray-800 dark:text-zinc-100 font-bold">
                Who Made It?
              </h1>
              <p className="text-gray-800 dark:text-zinc-400">
                This website was created by{" "}
                <a
                  className="text-primary-400 border-primary-400 border-b-2 pb-[1.5px] hover:pb-0 transition-all duration-150"
                  href="https://ilioslabs.dev"
                >
                  Kanishq Kancharla
                </a>
                . You can find the source code{" "}
                <a
                  className="text-primary-400 border-primary-400 border-b-2 pb-[1.5px] hover:pb-0 transition-all duration-150"
                  href="https://github.com/Neesh774/MeetMeInTheMiddle"
                >
                  here
                </a>
                . It was created for the 10 Days in Public Hack Club Challenge,
                by{" "}
                <a
                  className="text-primary-400 border-primary-400 border-b-2 pb-[1.5px] hover:pb-0 transition-all duration-150"
                  href="https://hackclub.com"
                >
                  Hack Club
                </a>
                .
              </p>
            </div>
            <div>
              <h1 className="text-xl text-gray-800 dark:text-zinc-100 font-bold">
                How Can I Support You?
              </h1>
              <p className="text-gray-800 dark:text-zinc-400">
                I won&apos;t be able to keep this website running forever, so if
                you want to support me, you can{" "}
                <a
                  href="https://www.buymeacoffee.com/ilioslabs"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img
                    src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png"
                    alt="Buy Me A Coffee"
                    style={{
                      height: "40px",
                      width: "148px",
                    }}
                  />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
