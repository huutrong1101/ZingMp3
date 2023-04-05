import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArrSlider } from "../ultis/fn";
import * as actions from "../store/actions";
import { useNavigate } from "react-router-dom";
import { Button } from "./";
import icons from "../ultis/icons";

const { MdArrowBackIosNew, MdArrowForwardIos } = icons;

var intervalId;

const Sliders = () => {
  const { banner } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [min, setMin] = useState(0);

  const [max, setMax] = useState(2);

  const [isAuto, setIsAuto] = useState(true);

  //animation for banner
  useEffect(() => {
    if (isAuto) {
      intervalId = setInterval(() => {
        handleAnimationBanner(1);
      }, 3000);
    }
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [min, max, isAuto]);

  const handleAnimationBanner = (step) => {
    const sliderEls = document.getElementsByClassName("slider-item");
    const list = getArrSlider(min, max, sliderEls.length - 1);
    for (let i = 0; i < sliderEls.length; i++) {
      // Delete classnames (css)
      sliderEls[i]?.classList?.remove(
        "animate-slide-right",
        "order-last",
        "z-20"
      );
      sliderEls[i]?.classList?.remove(
        "animate-slide-left",
        "order-first",
        "z-10"
      );
      sliderEls[i]?.classList?.remove("animate-slide-left2", "order-2", "z-10");

      // Hide or Show images
      if (list?.some((item) => item === i)) {
        sliderEls[i].style.cssText = `display: block`;
      } else {
        sliderEls[i].style.cssText = `display: none`;
      }
    }

    // Add animation by adding classnames
    list.forEach((item) => {
      if (item === max) {
        sliderEls[item]?.classList?.add(
          "animate-slide-right",
          "order-last",
          "z-20"
        );
      } else if (item === min) {
        sliderEls[item]?.classList?.add(
          "animate-slide-left",
          "order-first",
          "z-10"
        );
      } else {
        sliderEls[item]?.classList?.add(
          "animate-slide-left2",
          "order-2",
          "z-10"
        );
      }
    });
    if (step === 1) {
      setMin((prev) => (prev === sliderEls?.length - 1 ? 0 : prev + step));
      setMax((prev) => (prev === sliderEls?.length - 1 ? 0 : prev + step));
    }
    if (step === -1) {
      setMin((prev) => (prev === 0 ? sliderEls?.length - 1 : prev + step));
      setMax((prev) => (prev === 0 ? sliderEls?.length - 1 : prev + step));
    }
  };

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(actions.setCurSongId(item?.encodeId));
      dispatch(actions.play(true));
      dispatch(actions.setPlayList(null));
    } else if (item?.type === 4) {
      const albumPath = item?.link.split(".")[0];
      navigate(albumPath);
    } else {
      dispatch(actions.setPlayList(null));
    }
  };

  const handleBack = useCallback(
    (actionId) => {
      intervalId && clearInterval(intervalId);
      setIsAuto(false);
      handleAnimationBanner(actionId);
    },
    [min, max]
  );

  const handleHover = () => {
    setIsAuto(true);
  };

  return (
    <div className="w-full overflow-hidden px-[59px] relative">
      <Button
        handleOnClick={() => handleBack(1)}
        text={<MdArrowBackIosNew size={30} />}
        style="absolute top-1/2 left-[70px] bg-[rgba(255,255,255,0.3)] text-white p-2 rounded-full z-30"
      />
      <Button
        handleOnClick={() => handleBack(-1)}
        text={<MdArrowForwardIos size={30} />}
        style="absolute top-1/2 right-[70px] bg-[rgba(255,255,255,0.3)] text-white p-2 rounded-full z-30"
      />

      <div onMouseLeave={handleHover} className="flex w-full gap-8 pt-8">
        {banner?.map((item, index) => (
          <img
            key={item?.encodeId}
            alt=""
            src={item?.banner}
            className={`cursor-pointer flex-1 object-contain w-[30%] rounded-lg slider-item ${
              index <= 2 ? "block" : "hidden"
            }`}
            onClick={() => handleClickBanner(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sliders;
