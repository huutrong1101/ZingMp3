import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Player,
  SidebarLeft,
  SidebarRight,
  Header,
  Loading,
} from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

const Public = () => {
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
  const { isLoading } = useSelector((state) => state.app);
  return (
    <div className="relative flex flex-col w-full h-screen bg-main-300">
      <div className="flex flex-auto w-full h-full">
        <div className="w-[240px] h-full flex-none border ">
          <SidebarLeft />
        </div>
        <div className="relative flex flex-col flex-auto border ">
          {isLoading && (
            <div className="absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-main-200">
              <Loading />
            </div>
          )}
          <div className="h-[70px] flex-none px-[59px] flex items-center">
            <Header />
          </div>
          <div className="flex-auto w-full">
            <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
              <Outlet />
            </Scrollbars>
          </div>
        </div>
        {isShowRightSidebar && (
          <div className="w-[300px] h-screen 1600:flex flex-none border animate-slide-left">
            <SidebarRight />
          </div>
        )}
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
