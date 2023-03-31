import React, { memo } from "react";
import { handleNumber } from "../ultis/fn";
import icons from "../ultis/icons";

const { AiOutlineUserAdd } = icons;

const Artist = ({ data }) => {
  return (
    <div className="w-1/5 flex flex-col gap-[15px]">
      <img
        src={data.thumbnailM}
        alt="singer"
        className="w-full object-contain rounded-full"
      />
      <div className="gap-1 flex flex-col items-center">
        <span className="text-sm font-medium">{data.name}</span>
        <span className="text-xs opacity-70">{`${handleNumber(
          data.totalFollow
        )} quan tâm`}</span>
        <button
          type="button"
          className="bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1"
        >
          <AiOutlineUserAdd />
          <span className="text-xs opacity-70">QUAN TÂM</span>
        </button>
      </div>
    </div>
  );
};

export default memo(Artist);
