import React from "react";
import { NewRelease, Section, Sliders, ChartSection } from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    actists,
    top100,
    hotAlbum,
    chill,
    focus,
    xone,
    newEveryDay,
    friday,
    weekChart,
    singers,
  } = useSelector((state) => state.app);

  return (
    <div className="w-full overflow-y-auto">
      <div className="w-full h-[70px]"></div>
      <Sliders />
      {actists && <Section data={actists} />}
      {newEveryDay && <Section data={newEveryDay} />}
      {friday && <Section data={friday} />}
      <NewRelease />
      {chill && <Section data={chill} />}
      {focus && <Section data={focus} />}
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
      {top100 && <Section data={top100} />}
      {hotAlbum && <Section data={hotAlbum} />}
    </div>
  );
};

export default Home;
