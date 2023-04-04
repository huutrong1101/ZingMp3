import React, { memo } from "react";
import icons from "../ultis/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const { BsMusicNoteBeamed } = icons;

const List = ({ songData, isHideAlbum, isHideNode }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="flex items-center justify-between p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer"
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.play(true));
        dispatch(actions.playAlbum(true));
        dispatch(
          actions.setRecent({
            thumbnail: songData?.thumbnail,
            title: songData?.title,
            sid: songData?.encodeId,
            artists: songData?.artistsNames,
          })
        );
      }}
    >
      <div className="flex items-center flex-1 gap-3">
        {!isHideNode && (
          <span>
            <BsMusicNoteBeamed />
          </span>
        )}
        <img
          src={songData?.thumbnail}
          alt="thumbnailM"
          className="object-cover w-10 h-10 rounded-md"
        />
        <span className="flex flex-col w-full">
          <span className="text-sm font-semibold">
            {songData?.title?.length > 30
              ? `${songData?.title?.slice(0, 30)}...`
              : songData?.title}
          </span>
          <span className="text-xs opacity-70">{songData?.artistsNames}</span>
        </span>
      </div>
      {!isHideAlbum && (
        <div className="flex items-center justify-center flex-1">
          {songData?.album?.title?.length > 30
            ? `${songData?.album?.title?.slice(0, 30)}...`
            : songData?.album?.title}
        </div>
      )}
      <div className="flex justify-end flex-1 text-xs opacity-70">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(List);
