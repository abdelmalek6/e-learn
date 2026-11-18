import React from "react";
import { Outlet } from "react-router-dom";
import Enav from "../../components/educator/Enav";
import SideEdu from "../../components/educator/SideEdu";
function Educator() {
  return (
    <div className=" h-screen w-full ">
      <Enav />
      <div className="h-[100%] flex items-center overflow-scroll  " >
        <SideEdu />
        <Outlet />
      </div>
    </div>
  );
}

export default Educator;
