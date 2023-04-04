import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavLink, useSearchParams } from "react-router-dom";
import { searchMenu } from "../../ultis/menu";
import { useSelector } from "react-redux";

const notActiveStyle = "px-4 font-semibold cursor-pointer hover:text-main-500";
const activeStyle =
  "border-b-2 border-green-900 h-[53px] flex items-center text-main-500 px-4 font-semibold cursor-pointer hover:text-main-500";

const Search = () => {
  const { keyword } = useSelector((state) => state.music);

  return (
    <div className="w-full">
      <div className="w-full h-[70px]"></div>
      <div className="pl-[60px] flex h-[50px] mb-7 items-center text-sm border-b border-gray-400 pb-1">
        <span className="text-[24px] font-bold pr-6 border-r border-gray-400">
          Kết quả tìm kiếm
        </span>
        <div className="flex items-center ">
          {searchMenu.map((item) => (
            <NavLink
              key={item.path}
              to={`${item.path}?q=${keyword.replace(" ", "+")}`}
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              {item.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
      <div className="w-full h-[120px]"></div>
    </div>
  );
};

export default Search;
