import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import { Lists, AudioLoading } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import icons from "../../ultis/icons";

const { BsFillPlayFill } = icons;

const Album = () => {
  const location = useLocation();

  const { pid } = useParams();

  const [playListData, setPlayListData] = useState([]);

  const dispatch = useDispatch();

  const { isPlaying } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid));
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true));
      const response = await apis.apiGetDetaiPlaylist(pid);
      dispatch(actions.loading(false));
      if (response.data.err === 0) {
        setPlayListData(response.data.data);
        dispatch(actions.setPlayList(response?.data?.data?.song?.items));
      }
    };
    fetchDetailPlaylist();
  }, [pid]);

  useEffect(() => {
    if (location.state?.playAlbum) {
      const randomSong =
        Math.round(Math.random() * playListData?.song?.items?.length) - 1;
      dispatch(
        actions.setCurSongId(playListData?.song?.items[randomSong]?.encodeId)
      );
      dispatch(actions.play(true));
    }
  }, [pid, playListData]);

  return (
    <div className="relative flex w-full h-full gap-8 px-[59px] animate-scale-up-center">
      <div className="flex flex-col items-center flex-none w-1/4">
        <div className="relative w-full overflow-hidden cursor-pointer">
          <img
            src={playListData?.thumbnailM}
            alt="thumbnail"
            className={`object-contain w-full ${
              isPlaying
                ? "rounded-full animate-rotate-center"
                : "rounded-md  animate-rotate-center-pause"
            } shadow-md`}
          />
          <div
            className={`absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center text-white hover:bg-overlay-30 ${
              isPlaying && "rounded-full"
            }`}
          >
            <span className="p-3 border border-white rounded-full ">
              {isPlaying ? <AudioLoading /> : <BsFillPlayFill size={30} />}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-[20px] font-bold text-gray-800">
            {playListData.title}
          </h3>
          <span className="flex items-center gap-2 text-xs text-gray-500">
            <span>Cập nhật:</span>
            <span>
              {moment
                .unix(playListData?.contentLastUpdate)
                .format("DD/MM/YYYY")}
            </span>
          </span>
          <span className="flex items-center gap-2 text-xs text-gray-500">
            {playListData?.artistsNames}
          </span>
          <span className="flex items-center gap-2 text-xs text-gray-500">{`${Math.round(
            playListData?.like / 1000
          )}K người yêu thích`}</span>
        </div>
      </div>
      <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
        <div className="flex-auto mb-40">
          <span className="text-sm">
            <span className="text-gray-600">Lời tựa </span>
            <span>{playListData?.sortDescription}</span>
          </span>

          <Lists totalDuration={playListData?.song?.totalDuration} />
        </div>
      </Scrollbars>
    </div>
  );
};

export default Album;
