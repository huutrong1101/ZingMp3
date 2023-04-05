import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import bgChart from "../../assets/week-chart.jpg";
import { RankList } from "../../components";

const notActiveStyle = "text-[24px] py-[12px] font-semibold text-black";
const activeStyle =
  "text-[24px] py-[12px] font-semibold text-main-500 border-b-4 border-[#0E8080]";

const WeekRank = ({ weekChart }) => {
  const { pid } = useParams();

  return (
    <div>
      <div className="relative">
        <img
          src={bgChart}
          alt="bg-chartData"
          className="h-[500px] object-cover w-full grayscale"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(206,217,217,.8)]"></div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-[#CED9D9] to-transparent"></div>
        <div className="mt-[90px] absolute top-0 left-0 right-0 flex bottom-1/2 px-[60px] flex-col gap-4">
          <h3 className="font-bold text-[40px] text-main-500">
            Bảng Xếp Hạng Tuần
          </h3>
          <div className="flex gap-8">
            {weekChart?.map((item) => (
              <NavLink
                key={item.charId}
                to={item.link.split(".")[0]}
                className={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
              >
                {item.country === "vn"
                  ? "VIỆT NAM"
                  : item.country === "us"
                  ? "US-UK"
                  : "K-POP"}
              </NavLink>
            ))}
          </div>
          <div className="pb-8 w-full">
            <RankList
              data={weekChart?.find((item) => item?.link?.includes(pid))?.items}
              number={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekRank;
