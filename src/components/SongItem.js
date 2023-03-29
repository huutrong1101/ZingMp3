import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const SongItem = ({
  thumbnail,
  title,
  artists,
  releaseDate,
  songData,
  order,
  percent,
  style,
}) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`justify-between items-center flex flex-auto w-full p-[10px] gap-[10px] rounded-md cursor-pointer ${
        style || "text-black hover:bg-main-200"
      }`}
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.play(true));
      }}
    >
      <div className="flex gap-4">
        {order && (
          <span
            className={`m-auto text-[32px] text-[rgba(77,34,104,0.9)] ${
              order === 1
                ? "text-shadow-no1"
                : order === 2
                ? "text-shadow-no2"
                : "text-shadow-no3"
            }`}
          >
            {order}
          </span>
        )}
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-[60px] h-[60px] object-cover rounded-md"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            {title?.length >= 30 ? `${title?.slice(0, 30)}...` : title}
          </span>
          <span className="text-xs opacity-70">{artists}</span>
          {releaseDate && (
            <span className="text-xs text-gray-700">
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent && <span className="font-bold">{`${percent}%`}</span>}
    </div>
  );
};

export default memo(SongItem);
