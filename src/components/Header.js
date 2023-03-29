import React from "react";
import icons from "../ultis/icons";
import Search from "./Search";

const { HiArrowNarrowRight, HiArrowNarrowLeft } = icons;

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center w-full gap-6">
        <div className="flex gap-6 text-gray-400">
          <span>
            <HiArrowNarrowLeft size={24} />
          </span>
          <span>
            <HiArrowNarrowRight size={24} />
          </span>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
      </div>
      <div>Login</div>
    </div>
  );
};

export default Header;
