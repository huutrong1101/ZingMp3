import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SongItem } from "./";

const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);

  const [isActive, setIsActive] = useState(-1);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    switch (isActive) {
      case -1:
        return setSongs(newRelease?.items?.all);
      case 0:
        return setSongs(newRelease?.items?.vPop);
      case 1:
        return setSongs(newRelease?.items?.others);
      default:
        break;
    }
  }, [isActive, newRelease]);

  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[20px]">{newRelease?.title}</h3>
        <span className="text-xs">TẤT CẢ</span>
      </div>
      <div className="flex items-center gap-5 text-xs">
        <button
          type="button"
          onClick={() => setIsActive(-1)}
          className={`px-4 py-1  border border-gray-400 rounded-l-full rounded-r-full ${
            isActive === -1 && "bg-main-500 text-white"
          }`}
        >
          TẤT CẢ
        </button>
        <button
          type="button"
          onClick={() => setIsActive(0)}
          className={`px-4 py-1  border border-gray-400 rounded-l-full rounded-r-full ${
            isActive === 0 && "bg-main-500 text-white"
          }`}
        >
          VIỆT NAM
        </button>
        <button
          type="button"
          onClick={() => setIsActive(1)}
          className={`px-4 py-1  border border-gray-400 rounded-l-full rounded-r-full ${
            isActive === 1 && "bg-main-500 text-white"
          }`}
        >
          QUỐC TẾ
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        {songs?.slice(0, 12).map((item) => (
          <div className="w-[45%] min-[1024px]:w-[30%]" key={item.encodeId}>
            <SongItem
              songData={item}
              thumbnail={item.thumbnail}
              title={item.title}
              artists={item.artistsNames}
              releaseDate={item.releaseDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
