import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

function Foter() {
  return (
    <div className="px-15 md:px-20 bg-[#111820] w-full py-4 ">
      {/* links  */}
      <div className="grid py-5 md:py-7 grid-cols-1 space-y-8 md:grid-cols-[0.8fr_0.8fr_1fr]">
        <div className="flex flex-col gap-8 max-md:items-center px-4 md:px-10">
          <img src={assets.logo_dark} className="w-30 text-white " />
          <p className=" text-gray-300 max-md:text-center font-medium text-sm " >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        <div className="flex flex-col max-md:items-center gap-4">
          <p className="text-[15px] text-white pb-4 font-medium">Company</p>
          <div className="flex flex-row md:flex-col gap-4 text-white font-medium text-sm  ">
            <Link className="text-gray-300" >Home</Link>
            <Link className="text-gray-300" >About us</Link>
            <Link className="text-gray-300" >Contact us</Link>
            <Link className="text-gray-300" >Privacy policy</Link>
          </div>
        </div>
        <div className="py-2  font-medium hidden md:block">
          <h1 className="text-[15px] text-white pb-4">
            Subscribe to our newsletter
          </h1>
          <p className=" text-gray-200 text-sm  ">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="flex items-center gap-2.5 py-4">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="py-3 bg-gray-200/20 text-xs px-3 text-white rounded-xl outline-none  "
            />
            <button
              type="button"
              className=" px-5 text-xs w-fit py-3 rounded-xl bg-blue-500"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* copy ryth */}

      <div className=" w-full border-t-gray-300 border-t-[1px]  py-2 ">
        <p className="text-center font-medium text-white text-sm">
          Copyright 2026 © Malek. All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default Foter;
