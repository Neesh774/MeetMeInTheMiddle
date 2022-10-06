import type { NextPage } from "next";
import Header from "../components/app/Header";
import Sidebar from "../components/app/Sidebar";
import Button from "../components/base/Button";
import Buttons from "../components/base/DisplayButtons";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <div className="flex min-h-[92%]">
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
