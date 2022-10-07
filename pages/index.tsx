import type { NextPage } from "next";
import { useState } from "react";
import Header from "../components/app/Header";
import Map from "../components/app/Map";
import Sidebar from "../components/app/Sidebar";
import Button from "../components/base/Button";
import Buttons from "../components/base/DisplayButtons";
import MetaTags from "../components/base/MetaTags";

const Home: NextPage = () => {
  const [addresses, setAddresses] = useState<string[]>([""]);
  const [locations, setLocations] = useState<any>();
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex h-full">
        <Sidebar
          addresses={addresses}
          setAddresses={setAddresses}
          setLocations={setLocations}
        />
        <Map addresses={addresses} locations={locations} />
      </div>
    </div>
  );
};

export default Home;
