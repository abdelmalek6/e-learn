import React from "react";
import { assets } from "../../assets/assets.js";
import Search from "./Search.jsx";
function Hero() {
  return (
    <div className="w-full flex items-center flex-col space-y-6 md:pt-32 pt-20 bg-gradient-to-b from-cyan-100/70  justify-center md:px-15 px-5  ">
      <h1 className="text-center text-[32px] relative md:text-[46px] font-bold  max-w-3xl mx-auto ">
        Empower your future with the courses designed to{" "}
        <span className="text-[#2563EB]">fit your choice</span>{" "}
        <img
          src={assets.sketch}
          className="max-md:hidden absolute right-0 -bottom-7 "
        />{" "}
      </h1>
      <p className=" text-sm font-medium max-md:hidden text-gray-600 max-w-2xl text-center  mx-auto">
        We bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>
      <p className=" text-xs block font-medium md:hidden text-gray-600 max-w-2xl text-center  mx-auto">
        We bring together world-class instructors to help you achieve your
        professional goals.
      </p>

      {/* search */}

      <Search />
    </div>
  );
}

export default Hero;
