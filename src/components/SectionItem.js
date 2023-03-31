import React, { memo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../ultis/icons";

const { AiOutlineHeart, BsFillPlayFill, BsThreeDots } = icons;

const SectionItem = ({ item, data }) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const imageRef = useRef();

  const handleHover = () => {
    setIsHover(true);
    imageRef.current.classList?.remove("animate-scale-down-image");
    imageRef.current.classList?.add("animate-scale-up-image");
  };
  const handleLeave = () => {
    setIsHover(false);
    imageRef.current.classList?.remove("animate-scale-up-image");
    imageRef.current.classList?.add("animate-scale-down-image");
  };

  return (
    <div
      onClick={() => {
        navigate(item?.link?.split(".")[0], { state: { playAlbum: false } });
      }}
      className="flex flex-col justify-start flex-auto w-1/5 gap-3 text-sm cursor-pointer"
    >
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="relative w-full overflow-hidden rounded-lg"
      >
        {isHover && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 text-white rounded-lg bg-overlay-30">
            <span>
              <AiOutlineHeart size={25} />
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate(item?.link?.split(".")[0], {
                  state: { playAlbum: true },
                });
              }}
              className="p-1 border border-white rounded-full"
            >
              <BsFillPlayFill size={35} />
            </span>
            <span>
              <BsThreeDots size={25} />
            </span>
          </div>
        )}
        <img
          ref={imageRef}
          src={item?.thumbnailM}
          alt="avatar"
          className="w-full h-auto rounded-lg"
        />
      </div>
      <span className="flex flex-col">
        <span className="font-semibold">
          {item?.title?.length > 30
            ? item?.title.slice(0, 30) + "..."
            : item?.title}
        </span>
        {data?.sectionId === "h100" ? (
          <span>{item?.artistsNames}</span>
        ) : (
          <span>
            {item?.sortDescription
              ? item?.sortDescription?.length >= 40
                ? `${item?.sortDescription?.slice(0, 40)}...`
                : item?.sortDescription
              : item?.artistsNames}
          </span>
        )}
      </span>
    </div>
  );
};

export default memo(SectionItem);
