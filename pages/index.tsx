import type { NextPage } from "next";
import { useState } from "react";
import Header from "../components/app/Header";
import Map from "../components/app/Map";
import Results from "../components/app/Results";
import Sidebar from "../components/app/Sidebar";
import Button from "../components/base/Button";
import Buttons from "../components/base/DisplayButtons";
import MetaTags from "../components/base/MetaTags";
import { Location } from "../utils/types";

const Home: NextPage = () => {
  const [addresses, setAddresses] = useState<string[]>([""]);
  const [locations, setLocations] = useState<Location[]>([]);
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex h-full relative">
        <Sidebar
          addresses={addresses}
          setAddresses={setAddresses}
          setLocations={setLocations}
        />
        <Results locations={locations} setLocations={setLocations} />
        <Map addresses={addresses} locations={locations} />
      </div>
    </div>
  );
};

export default Home;
