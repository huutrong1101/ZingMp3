import React, { memo, useState } from "react";
import { handleNumber } from "../ultis/fn";
import icons from "../ultis/icons";
import { Link } from "react-router-dom";

const { AiOutlineUserAdd } = icons;

const Artist = ({ data, link }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="w-1/5 flex flex-col gap-[15px]">
      <Link
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        to={link}
        className="relative overflow-hidden rounded-full cursor-pointer"
      >
        <img
          src={data.thumbnailM}
          alt="singer"
          className={`object-contain w-full rounded-full ${
            isHover ? "animate-scale-up-image" : "animate-scale-down-image"
          }`}
        />
        {isHover && (
          <div className="absolute top-0 bottom-0 left-0 right-0 rounded-full bg-overlay-30"></div>
        )}
      </Link>
      <div className="flex flex-col items-center gap-1">
        <Link
          to={link}
          className="text-sm font-medium hover:underline hover:text-main-500"
        >
          {data?.name}
        </Link>
        <span className="text-xs opacity-70">{`${handleNumber(
          data?.totalFollow
        )} quan tâm`}</span>
        <button
          type="button"
          className="flex items-center justify-center gap-1 px-4 py-1 text-sm text-white rounded-l-full rounded-r-full bg-main-500"
        >
          <AiOutlineUserAdd />
          <span className="text-xs opacity-70">QUAN TÂM</span>
        </button>
      </div>
    </div>
  );
};

export default memo(Artist);
