import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { apiGetArtist } from "../../apis/music";
import icons from "../../ultis/icons";
import { Artist, List, Section } from "../../components";
const { AiOutlineUserAdd, BsFillPlayFill } = icons;

const Singer = () => {
  const { singer } = useParams();

  const [artistData, setArtistData] = useState(null);

  const [isHoverPlay, setIsHoverPlay] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const fetchArtisData = async () => {
      const res = await apiGetArtist(singer);
      if (res.data.err === 0) {
        setArtistData(res.data.data);
      }
    };

    singer && fetchArtisData();
  }, [singer]);

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [singer]);

  return (
    <div className="flex flex-col w-full">
      <div ref={ref} className="relative">
        <img
          src={artistData?.cover}
          alt="backgroud"
          className="h-[400px] object-cover w-full"
        />
        <div className="text-white absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(0,0,0,.5)] to-transparent px-[60px]">
          <div className="absolute bottom-0 pb-6">
            <div className="flex items-center gap-8">
              <h1 className="text-[60px] font-bold">{artistData?.name}</h1>
              <span
                onMouseEnter={() => setIsHoverPlay(true)}
                onMouseLeave={() => setIsHoverPlay(false)}
                className="relative p-2 bg-white rounded-full cursor-pointer text-main-500 hover:bg-white hover:text-gray-100"
              >
                <div className="w-8 h-8"></div>
                {isHoverPlay && (
                  <span className="absolute top-[-1px] bottom-[-1px] left-[-1px] right-[-1px] rounded-full bg-main-500 animate-scale-up-center"></span>
                )}
                <span className="absolute top-0 bottom-0 left-0 right-0 z-50 p-2">
                  <BsFillPlayFill size={32} />
                </span>
              </span>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm text-gray-300">
                {`${Number(
                  artistData?.totalFollow.toFixed(1)
                ).toLocaleString()} người quan tâm`}
              </span>
              <button
                type="button"
                className="flex items-center justify-center gap-1 px-4 py-1 text-sm text-white rounded-l-full rounded-r-full bg-main-500"
              >
                <AiOutlineUserAdd />
                <span className="text-xs opacity-90">QUAN TÂM</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full mt-[30px] px-[60px]">
        <h3 className="mb-5 text-lg font-bold">Bài Hát Nổi Bật</h3>
        <div className="flex flex-wrap justify-between">
          {artistData?.sections
            ?.find((item) => item.sectionId === "aSongs")
            ?.items?.slice(0, 6)
            ?.map((item, index) => (
              <div key={item.encodeId} className="flex-auto w-[45%]">
                <List songData={item} isHideAlbum isHideNode />
              </div>
            ))}
        </div>
      </div>
      {artistData?.sections
        ?.filter((item) => item.sectionType === "playlist")
        ?.map((item, index) => (
          <Section data={item} key={index} />
        ))}

      <div className="flex flex-col w-full px-[60px] mt-10">
        <h3 className="mb-5 text-lg font-bold">
          {
            artistData?.sections?.find((item) => item.sectionType === "artist")
              ?.title
          }
        </h3>
        <div className="flex items-start gap-[28px]">
          {artistData?.sections
            ?.find((item) => item.sectionType === "artist")
            ?.items?.slice(0, 5)
            ?.map((item) => (
              <Artist key={item.id} data={item} link={item.link}>
                ca sĩ
              </Artist>
            ))}
        </div>
      </div>
      <div className="px-[60px] mt-10">
        <h3 className="mb-5 text-lg font-bold">{`Về ${artistData?.name}`}</h3>
        <div className="flex gap-8">
          <img
            src={artistData?.thumbnailM}
            alt="thumbnail"
            className="w-[45%] flex-none object-cover h-[304px] rounded-md"
          />
          <div className="flex flex-col gap-8 text-[14px]">
            <p dangerouslySetInnerHTML={{ __html: artistData?.biography }}></p>
            <div className="flex flex-col gap-2">
              <span className="text-[20px] font-bold">
                {Number(artistData?.follow.toFixed(1)).toLocaleString()}
              </span>
              <span>Người quan tâm</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[250px]"></div>
    </div>
  );
};

export default Singer;
