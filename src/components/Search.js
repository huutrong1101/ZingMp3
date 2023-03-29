import React from "react";
import icons from "../ultis/icons";

const { FiSearch } = icons;

const Search = () => {
  return (
    <div className="flex items-center w-full">
      <span className="flex text-gray-500 items-center justify-start h-10 pl-4 bg-[#DDE4E4] rounded-l-[20px]">
        <FiSearch size={24} />
      </span>
      <input
        type="text"
        className="w-full text-gray-500 outline-none bg-[#DDE4E4] py-2 px-4 rounded-r-[20px] h-10"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
      />
    </div>
  );
};

export default Search;
