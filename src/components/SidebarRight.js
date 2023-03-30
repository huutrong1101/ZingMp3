import React, { useEffect, useState } from "react";
import icons from "../ultis/icons";
import { useSelector } from "react-redux";
import { SongItem } from "./";
import { apiGetDetaiPlaylist } from "../apis";
import { Scrollbars } from "react-custom-scrollbars-2";

const { ImBin } = icons;

const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(true);

  const { curSongId, curSongData, curAlbumId, isPlaying, recentSongs } =
    useSelector((state) => state.music);

  const [playList, setPlayList] = useState(null);

  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetaiPlaylist(curAlbumId);
    if (response.data?.err === 0) {
      setPlayList(response?.data?.data?.song?.items);
    }
  };

  useEffect(() => {
    curAlbumId && fetchDetailPlaylist();
  }, []);

  useEffect(() => {
    if (curAlbumId && isPlaying) {
      fetchDetailPlaylist();
    }
  }, [curAlbumId, isPlaying]);

  useEffect(() => {
    isPlaying && setIsRecent(false);
  }, [isPlaying, curSongId]);

  return (
    <div className="flex flex-col w-full h-full text-xs">
      <div className="gap-8 justify-between h-[70px] flex-none py-[14px] px-2 items-center flex">
        <div className="cursor-pointer flex justify-center px-[6px] flex-auto rounded-l-full rounded-r-full bg-main-200 py-[6px]">
          <span
            className={`py-[5px]  flex-1 flex justify-center rounded-l-full rounded-r-full items-center font-semibold ${
              !isRecent && "bg-main-100 text-main-500"
            }`}
            onClick={() => setIsRecent((prev) => !prev)}
          >
            Danh sách phát
          </span>
          <span
            className={`py-[5px]  flex-1 flex justify-center rounded-l-full rounded-r-full items-center font-semibold ${
              isRecent && "bg-main-100 text-main-500"
            }`}
            onClick={() => setIsRecent((prev) => !prev)}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="p-1 rounded-full cursor-pointer hover:bg-main-100">
          <ImBin size={14} />
        </span>
      </div>
      {isRecent ? (
        <div className="flex flex-col flex-auto w-full px-2">
          <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
            {recentSongs && (
              <div className="flex flex-col max-h-full">
                {recentSongs?.map((item) => (
                  <SongItem
                    key={item?.sid}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artists={item?.artists}
                    songData={item}
                    sm
                  />
                ))}
              </div>
            )}
          </Scrollbars>
        </div>
      ) : (
        <div className="flex flex-col flex-auto w-full px-2">
          <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
            <SongItem
              thumbnail={curSongData?.thumbnail}
              title={curSongData?.title}
              artists={curSongData?.artistsNames}
              songData={curSongData}
              sm
              style="bg-main-500 text-white"
            />
            <div className="flex flex-col text-black pt-[15px] px-[2] pb-[5px]">
              <span className="text-sm font-bold">Tiếp theo</span>
              <span className="flex gap-1 text-xs opacity-70">
                <span>Từ playlist</span>
                <span className="font-semibold text-main-500">
                  {curSongData?.album?.title?.length >= 30
                    ? `${curSongData?.album?.title?.slice(0, 30)}...`
                    : curSongData?.album?.title}
                </span>
              </span>
              {playList && (
                <div className="flex flex-col max-h-full">
                  {playList?.map((item) => (
                    <SongItem
                      key={item?.encodeId}
                      thumbnail={item?.thumbnail}
                      title={item?.title}
                      artists={item?.artistsNames}
                      songData={item}
                      sm
                    />
                  ))}
                </div>
              )}
            </div>
          </Scrollbars>
        </div>
      )}
      <div className="w-full h-[90px]"></div>
    </div>
  );
};

export default SidebarRight;
