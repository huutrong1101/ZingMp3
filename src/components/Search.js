import React, { useEffect, useState } from "react";
import icons from "../ultis/icons";
import { apiSearch } from "../apis";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";
import { useNavigate, createSearchParams } from "react-router-dom";
import path from "../ultis/path";

const { FiSearch } = icons;

const Search = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      dispatch(actions.search(keyword));
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }
  };

  return (
    <div className="flex items-center w-full">
      <span className="flex text-gray-500 items-center justify-start h-10 pl-4 bg-[#DDE4E4] rounded-l-[20px]">
        <FiSearch size={24} />
      </span>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
        type="text"
        className="w-full text-gray-500 outline-none bg-[#DDE4E4] py-2 px-4 rounded-r-[20px] h-10"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
      />
    </div>
  );
};

export default Search;
