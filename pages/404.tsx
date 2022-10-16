import Link from "next/link";
import Header from "../components/app/Header";

export default function PageNotFound() {
  return (
    <div className="h-full">
      <Header />
      <div className="flex flex-col h-[92%] items-center justify-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <Link href="/" passHref>
          <span className="text-tertiary-400 cursor-pointer mt-2 underline">
            Go Back Home
          </span>
        </Link>
      </div>
    </div>
  );
}
