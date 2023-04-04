import React from "react";
import icons from "../ultis/icons";
import Search from "./Search";
import { useNavigate, useParams } from "react-router-dom";

const { HiArrowNarrowRight, HiArrowNarrowLeft } = icons;

const Header = () => {
  const navigate = useNavigate();

  const { singer } = useParams();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center w-full gap-6">
        <div className="flex gap-6 cursor-pointer">
          <span onClick={() => navigate(-1)}>
            <HiArrowNarrowLeft size={24} color={singer ? "gray" : "black"} />
          </span>
          <span onClick={() => navigate(1)}>
            <HiArrowNarrowRight size={24} color={singer ? "gray" : "black"} />
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
