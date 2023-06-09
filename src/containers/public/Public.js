import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import {
  Player,
  SidebarLeft,
  SidebarRight,
  Header,
  Loading,
} from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const Public = () => {
  const dispatch = useDispatch();

  const [isShowRightSidebar, setIsShowRightSidebar] = useState(false);

  const { isLoading, scrollTop } = useSelector((state) => state.app);

  const handleScrollTop = (e) => {
    e.target.scrollTop === 0
      ? dispatch(actions.zerioScrollTop(true))
      : dispatch(actions.zerioScrollTop(false));
  };

  return (
    <div className="relative flex flex-col w-full h-screen overflow-hidden bg-main-300">
      <div className="flex flex-auto w-full h-full">
        <div className="w-[240px] h-full flex-none border ">
          <SidebarLeft />
        </div>
        <div className="relative flex flex-col flex-auto border">
          {isLoading && (
            <div className="absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-main-200">
              <Loading />
            </div>
          )}
          <div
            className={`${
              scrollTop ? "bg-transparent" : "bg-main-300"
            } h-[70px] fixed top-0 left-[240px] right-0 px-[59px] z-50 flex items-center`}
          >
            <Header />
          </div>

          <div className="flex-auto w-full">
            <Scrollbars
              onScroll={handleScrollTop}
              autoHide
              style={{ width: "100%", height: "100%" }}
            >
              <Outlet />
              <div className="w-full h-[120px]"></div>
            </Scrollbars>
          </div>
        </div>
        {/* {isShowRightSidebar && ( */}
        <div
          className={`w-[300px] h-screen 1600:flex flex-none border bg-[#DDE4E4] border-r-2 border-gray-400 z-50 absolute top-0 bottom-0
          ${
            isShowRightSidebar
              ? "animate-slide-left right-0"
              : "animate-slide-right right-[-350px]"
          } `}
        >
          <SidebarRight />
        </div>
        {/* )} */}
      </div>

      <div className="fixed z-50 bottom-0 left-0 right-0 h-[90px]">
        <Player
          setIsShowRightSidebar={setIsShowRightSidebar}
          isShowRightSidebar={isShowRightSidebar}
        />
      </div>
    </div>
  );
};

export default Public;
