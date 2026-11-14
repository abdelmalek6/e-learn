import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { UserButton, useUser, useClerk } from "@clerk/react";
import { AppContext } from "../../context/AppContext.jsx";

function Navbar() {
  const isLocation = location.pathname.includes("/students");

  const { openSignUp } = useClerk();
  const { user } = useUser();
  
  const { isEducator } = useContext(AppContext);
  return (
    <div
      className={` flex py-4 border-b-gray-300 border-b-2 items-center justify-between gap-4 px-16 md:px-23 ${!isLocation ? "bg-cyan-100/70" : "bg-white"} `}
    >
      <img
        src={assets.logo}
        alt="logo"
        className="w-25 md:w-30 cursor-pointer "
      />

      {/* pc screen */}

      <div className="hidden md:flex items-center gap-3.5">
        {user ? (
          <div className="flex items-center gap-3.5 text-sm text-gray-500">
            <Link to={isEducator ? "/educator" : "/"}>
              {" "}
              <p>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </p>{" "}
            </Link>
            <Link to="/students/my-enrollments" >
              {" "}
              <p>My-Enrollment</p>{" "}
            </Link>
            <UserButton />
          </div>
        ) : (
          <button
            onClick={() => {
              openSignUp();
            }}
            type="button"
            className="px-6 py-1 bg-cyan-900 text-white rounded-2xl hover:bg-cyan-400"
          >
            {" "}
            Create account{" "}
          </button>
        )}
      </div>

      {/* mobile screen */}
      <div className="flex md:hidden items-center  gap-3.5">
        {user ? (
          <div className="flex items-center gap-3.5 text-sm text-gray-500">
            <Link to={isEducator ? "/educator" : "/"}>
              {" "}
              <p>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </p>{" "}
            </Link>
            <Link>
              {" "}
              <p>My-Enrollment</p>{" "}
            </Link>
            <UserButton />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              openSignUp();
            }}
          >
            <img
              src={assets.user_icon}
              alt="menu"
              className="w-6 h-6 cursor-pointer"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
