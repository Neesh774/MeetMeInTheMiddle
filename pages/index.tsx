import type { InferGetServerSidePropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Header from "../components/app/Header";
import Map from "../components/app/Map";
import Results from "../components/app/Results";
import Sidebar from "../components/app/Sidebar";
import { Address, Location } from "../utils/types";
import { Filters as FiltersType } from "../utils/types";
import { GetServerSideProps } from "next";
import Modal from "../components/app/Help";

const Home: NextPage = ({
  addresses: initialAddresses,
  spots,
  radius,
  day,
  time,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [locations, setLocations] = useState<Location[]>([]);
  const [filters, setFilters] = useState<FiltersType>({
    spotTypes: spots,
    radius,
    day,
    time,
  });
  const [resultsClosed, setResultsClosed] = useState(true);
  const [detailsClosed, setDetailsClosed] = useState(true);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newQuery = {
      ...router.query,
      addresses: addresses.map((a) => a.place_id).join(";"),
      spots: Object.keys(filters.spotTypes)
        .filter(
          (key) => filters.spotTypes[key as keyof typeof filters.spotTypes]
        )
        .join(","),
      radius: filters.radius.toString(),
      day: filters.day?.toString() || "",
      time: filters.time?.toString() || "",
    };
    // check if query objects are same
    if (
      router.query.addresses !== newQuery.addresses ||
      router.query.spots !== newQuery.spots ||
      (router.query.radius as string) !== newQuery.radius ||
      router.query.day != newQuery.day ||
      router.query.time != newQuery.time
    ) {
      router.push(
        {
          pathname: "/",
          query: {
            ...router.query,
            addresses: addresses.map((a) => a.place_id).join(";"),
            spots: Object.keys(filters.spotTypes)
              .filter(
                (key) =>
                  filters.spotTypes[key as keyof typeof filters.spotTypes]
              )
              .join(","),
            radius: filters.radius,
            day: filters.day,
            time: filters.time,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [addresses, filters, router]);

  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex h-full relative flex-col-reverse lg:flex-row overflow-hidden">
        <Sidebar
          addresses={addresses}
          setAddresses={setAddresses}
          setLocations={setLocations}
          filters={filters}
          setFilters={setFilters}
          closed={detailsClosed}
          setClosed={setDetailsClosed}
          resultsClosed={resultsClosed}
          setResultsClosed={setResultsClosed}
        />
        <Results
          filters={filters}
          locations={locations}
          setLocations={setLocations}
          resultsRef={resultsRef}
          closed={resultsClosed}
          setClosed={setResultsClosed}
          detailsClosed={detailsClosed}
          setDetailsClosed={setDetailsClosed}
        />
        <Map
          addresses={addresses}
          locations={locations}
          resultsRef={resultsRef}
          setClosed={setResultsClosed}
          openDetails={() => setDetailsClosed(false)}
        />
      </div>
      <Modal />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { addresses, spots, radius, day, time } = context.query;

  const spotTypes = {
    cafe: false,
    dining: false,
    park: false,
    bar: false,
    movies: false,
    landmark: false,
    bowling: false,
    station: false,
  };

  if (spots) {
    (spots as string).split(",").forEach((spot) => {
      spotTypes[spot as keyof typeof spotTypes] = true;
    });
  } else {
    spotTypes["cafe"] = true;
  }

  return {
    props: {
      addresses: addresses
        ? (addresses as string).split(";").map((a) => ({
            place_id: a,
            formatted_address: "",
          }))
        : [
            {
              formatted_address: "",
            },
          ],
      spots: spotTypes,
      radius: radius ? parseInt(radius as string) : 5,
      day: day ? (day as string) : null,
      time: time ? (time as string) : null,
    },
  };
};

export default Home;
