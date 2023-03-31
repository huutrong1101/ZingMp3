import React from "react";
import { Outlet } from "react-router-dom";

const Search = () => {
  return (
    <div className="w-full">
      <div className="pl-[60px] flex h-[50px] mb-7 items-center text-sm border-b border-gray-400 pb-1">
        <span className="text-[24px] font-bold pr-6 border-r border-gray-400">
          Kết quả tìm kiếm
        </span>
        <div className="flex items-center ">
          <span className="px-4 font-semibold cursor-pointer hover:text-main-500">
            TẤT CẢ
          </span>
          <span className="px-4 font-semibold cursor-pointer hover:text-main-500">
            BÀI HÁT
          </span>
          <span className="px-4 font-semibold cursor-pointer hover:text-main-500">
            PLAYLIST/ALBUM
          </span>
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
