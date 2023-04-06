import React, { useEffect, useState, useRef } from "react";
import { BsPlayFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";
import { LoadingSong } from "./";

const {
  AiOutlineHeart,
  BsThreeDots,
  CiRepeat,
  MdSkipPrevious,
  MdSkipNext,
  CiShuffle,
  BsPauseFill,
  TbRepeatOnce,
  BsMusicNoteList,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
  BsFillVolumeDownFill,
} = icons;

var intervalId;

const Player = ({ setIsShowRightSidebar, isShowRightSidebar }) => {
  const [audio, setAudio] = useState(new Audio());

  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);

  const [songInfo, setSongInfo] = useState(null);

  const dispatch = useDispatch();

  const [curSeconds, setCurSeconds] = useState(0);

  const [isShuffe, setIsShuffe] = useState(false);

  const [repeatMode, setRepeatMode] = useState(0);

  const [isLoadedSource, setIsLoadedSource] = useState(true);

  const [isHoverVolume, setIsHoverVolume] = useState(false);

  const [volume, setVolume] = useState(100);

  const thumbRef = useRef();

  const trackRef = useRef();

  const volumeRef = useRef();

  useEffect(() => {
    const fetchDetailSong = async () => {
      setIsLoadedSource(false);
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      setIsLoadedSource(true);
      if (res1?.data?.err === 0) {
        setSongInfo(res1?.data?.data);
        dispatch(actions.setCurSongData(res1?.data?.data));
      }
      if (res2?.data?.err === 0) {
        audio.pause();
        setAudio(new Audio(res2?.data?.data["128"]));
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        toast.warning(res2?.data?.msg);
        setCurSeconds(0);
        thumbRef.current.style.cssText = `right: 100%`;
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying && thumbRef.current) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;

        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffe) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : handleNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffe, repeatMode]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    if (volumeRef.current) {
      volumeRef.current.style.cssText = `right: ${100 - volume}%`;
    }
  }, [volume]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };

  const handleClickProgressbar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();

    const percent = Math.round(
      ((e.clientX - trackRect.left) * 10000) / trackRect.width / 100
    );

    thumbRef.current.style.cssText = `right: ${100 - percent}%`;

    audio.currentTime = (percent * songInfo.duration) / 100;

    setCurSeconds(Math.round((percent * songInfo.duration) / 100));
  };

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1]?.encodeId));
      dispatch(actions.play(true));
    }
  };

  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1]?.encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs?.length) - 1;
    dispatch(actions.setCurSongId(songs[randomIndex]?.encodeId));
    dispatch(actions.play(true));
  };

  const handleRepeatOne = () => {
    audio.play();
  };

  return (
    <div className="flex h-full px-5 bg-main-400">
      <div className="w-[30%] flex-auto flex items-center gap-3">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="object-cover w-16 h-16 rounded-md "
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700">
            {songInfo?.title}
          </span>
          <span className="text-xs text-gray-500">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-4 pl-2">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className="py-2 gap-2 w-[40%] flex-auto flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-8">
          <span
            onClick={() => setIsShuffe((prev) => !prev)}
            className={`cursor-pointer ${isShuffe && "text-purple-600"}`}
            title="Bật phát ngẫu nhiên"
          >
            <CiShuffle size={24} />
          </span>
          <span
            onClick={handlePrevSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 border border-gray-700 rounded-full cursor-pointer hover:text-main-500 hover:border-main-500"
            onClick={handleTogglePlayMusic}
          >
            {!isLoadedSource ? (
              <LoadingSong />
            ) : isPlaying ? (
              <BsPauseFill size={30} />
            ) : (
              <BsPlayFill size={30} />
            )}
          </span>
          <span
            onClick={handleNextSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
            className={`cursor-pointer ${repeatMode && "text-purple-600"}`}
            title="Bật phát lại tất cả"
          >
            {repeatMode === 1 ? (
              <TbRepeatOnce size={24} />
            ) : (
              <CiRepeat size={24} />
            )}
          </span>
        </div>
        <div className="flex items-center justify-center w-full gap-3 text-xs">
          <span>{moment.utc(curSeconds * 1000).format("mm:ss")}</span>
          <div
            ref={trackRef}
            onClick={handleClickProgressbar}
            className="w-3/5 h-[3px] hover:h-[8px] cursor-pointer rounded-l-full rounded-r-full bg-[rgba(0,0,0,0.1)] relative"
          >
            <div
              ref={thumbRef}
              id="thumb-progress"
              className="rounded-l-full rounded-r-full absolute top-0 h-full left-0  bg-[#0e8080]"
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
      <div className="w-[30%] flex-auto flex items-center justify-end gap-4">
        <div
          onMouseEnter={() => setIsHoverVolume(true)}
          onMouseLeave={() => setIsHoverVolume(false)}
          className="flex items-center gap-2"
        >
          <span onClick={() => setVolume((prev) => (+prev === 0 ? 70 : 0))}>
            {+volume >= 50 ? (
              <BsFillVolumeUpFill />
            ) : +volume === 0 ? (
              <BsFillVolumeMuteFill />
            ) : (
              <BsFillVolumeDownFill />
            )}
          </span>
          <div
            className={`w-[130px] h-1 bg-white rounded-l-full rounded-r-full  ${
              isHoverVolume ? "hidden" : "relative"
            }`}
          >
            <div
              ref={volumeRef}
              className="absolute left-0 bottom-0 top-0 bg-main-500 rounded-l-full rounded-r-full"
            ></div>
          </div>
          <input
            type="range"
            step={1}
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className={`w-[130px] bg-main-500 ${
              isHoverVolume ? "inline" : "hidden"
            }`}
          />
        </div>

        <span
          onClick={() => setIsShowRightSidebar((prev) => !prev)}
          className={`p-2 border rounded-full cursor-pointer opacity-90 hover:opacity-100 ${
            isShowRightSidebar ? "bg-main-500  text-white" : ""
          }`}
        >
          <BsMusicNoteList size={18} />
        </span>
      </div>
    </div>
  );
};

export default Player;
