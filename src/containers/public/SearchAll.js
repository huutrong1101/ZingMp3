import React from "react";
import { useSelector } from "react-redux";
import { handleNumber } from "../../ultis/fn";
import { SongItem, List, SectionItem, Artist } from "../../components";

const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);

  console.log(searchData);

  return (
    <div className="flex flex-col w-full px-[60px] gap-[60px]">
      <div className="flex flex-col ">
        <h3 className="mb-5 text-lg font-bold">Nổi bật</h3>
        <div className="flex gap-8 ">
          {searchData?.top && (
            <div className="cursor-pointer p-[10px] flex flex-1 gap-8 items-center bg-main-200 rounded-md">
              <img
                src={searchData?.top?.thumbnail}
                alt="avatar"
                className={`w-[84px] h-[84px] object-cover ${
                  searchData.top.objectType === "artist" ? "rounded-full" : ""
                }`}
              />
              <div className="flex flex-col text-xs">
                <span className="mb-[6px]">
                  {searchData.top.objectType === "artist" ? "Nghệ sĩ " : ""}
                </span>
                <span className="text-sm font-semibold">
                  {searchData?.top?.title || searchData?.top?.name}
                </span>
                {searchData.top.objectType === "artist" && (
                  <span>
                    {handleNumber(searchData?.artists[0]?.totalFollow)} quan tâm
                  </span>
                )}
              </div>
            </div>
          )}
          {searchData?.songs
            ?.filter((item, index) =>
              [...Array(2).keys()].some((i) => i === index)
            )
            ?.map((item) => (
              <div key={item.encodeId} className="flex-1">
                <SongItem
                  thumbnail={item.thumbnail}
                  songData={item}
                  title={item.title}
                  artists={item.artistsNames}
                  size="w-[84px] h-[84px]"
                  style="bg-main-200"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="mb-5 text-lg font-bold">Bài hát</h3>
        <div className="flex justify-between flex-wrap">
          {searchData?.songs?.slice(0, 6)?.map((item, index) => (
            <div
              key={item.encodeId}
              className={`flex-auto w-[45%] ${
                index % 2 !== 0 ? "pl-4" : "pr-4"
              }`}
            >
              <List songData={item} isHideAlbum />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="mb-5 text-lg font-bold">Playlist/Album</h3>
        <div className="flex items-start justify-between gap-[28px]">
          {searchData?.playlists?.slice(0, 5)?.map((item) => (
            <SectionItem key={item.encodeId} item={item} />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="mb-5 text-lg font-bold">Nghệ Sĩ/OA</h3>
        <div className="flex items-start justify-between gap-[28px]">
          {searchData?.artists?.slice(0, 5)?.map((item) => (
            <Artist key={item.id} data={item}>
              ca sĩ
            </Artist>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAll;
