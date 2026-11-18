import React from "react";
import { UserButton, useUser, useClerk } from "@clerk/react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

function Enav() {
  const { user } = useUser();
  return (
    <div
      className={` flex py-4  border-b-gray-300 border-b-2 items-center justify-between gap-4 px-10 md:px-15 bg-white `}
    >
      <img
        src={assets.logo}
        alt="logo"
        className="w-25 md:w-30 cursor-pointer "
      />

      {/* pc screen */}

      <div className="hidden md:flex items-center gap-3.5">
        {user && (
          <div className="flex items-center gap-3.5 text-sm text-gray-500">
            <p className="text-sm font-medium text-gray-700">
              Hi {user.firstName}
            </p>
            <UserButton />
          </div>
        )}
      </div>

      {/* mobile screen */}
      <div className="flex md:hidden items-center  gap-3.5">
        {user && (
          <div className="flex items-center gap-3.5 text-sm text-gray-500">
            <p className="text-sm text-gray-800 font-medium">
              {user.firstName}
            </p>
            <UserButton />
          </div>
        )}
      </div>
    </div>
  );
}

export default Enav;
