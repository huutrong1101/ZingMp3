import React from "react";
import { NewRelease, Section, Slider, ChartSection } from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { chill, top100, hotAlbum, xone, newEveryDay, friday, weekChart } =
    useSelector((state) => state.app);

  return (
    <div className="w-full overflow-y-auto">
      <Slider />
      <Section data={chill} />
      {/* <Section data={newEveryDay} />
      <Section data={friday} /> */}
      <NewRelease />
      <ChartSection />
      <div className="flex items-center px-[43px] w-f mt-12">
        {weekChart?.map((item) => (
          <Link
            to={item?.link?.split(".")[0]}
            key={item.link}
            className="flex-1 px-4"
          >
            <img
              src={item.cover}
              alt="cover"
              className="object-cover w-full rounded-md"
            />
          </Link>
        ))}
      </div>
      <Section data={top100} />
      <Section data={hotAlbum} />
      {/* <Section data={xone} /> */}

      <div className="w-full h-[100px]"></div>
    </div>
  );
};

export default Home;
