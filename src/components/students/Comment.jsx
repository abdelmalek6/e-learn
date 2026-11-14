import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

function Comment() {
  const { comments } = useContext(AppContext);
  return (
    <div className="  py-10 flex flex-col  h-screen space-y-8">
      <div>
        <h1 className=" text-3xl pb-10 text-gray-900 font-medium text-center  ">
          Testimonials
        </h1>
        <p className="md:text-[17px] text-sm px-5 md:px-80 text-gray-400 font-medium text-center">
          Hear from our learners as they share their journeys of transformation,
          success, and how our platform has made a difference in their lives.
        </p>
      </div>

      {/* comments */}
      <div className=" grid md:grid-cols-3 grid-cols-1 gap-5 px-4 md:px-30 ">
        {comments.map((ele, index) => {
          return (
            <div className="rounded-xl flex-1 pb-4  border-gray-300 border-1 shadow-2xs overflow-hidden">
              {/* user */}
              <div className=" flex items-center gap-5 py-4 px-3 bg-gray-300/80  ">
                <img
                  src={ele.image}
                  className=" w-10 rounded-full object-cover "
                />
                <div className="flex flex-col">
                  <p className="text-gray-800 font-medium text-sm">
                    {ele.name}
                  </p>
                  <p> {ele.role} </p>
                </div>
              </div>
              {/* riting */}

              <div className=" flex flex-col gap-2.5 px-3 py-4 bg-white">
                {/* stars */}
                <div className="flex items-center">
                  {Array.from({ length: 5}).map((_, i) => {
                    return (
                      <img
                        src={
                          Math.floor(i < ele.rating)
                            ? assets.star
                            : assets.star_blank
                        }
                        className="w-5"
                      />
                    );
                  })}
                </div>

                <p className=" text-sm font-medium text-gray-400  ">
                  {ele.feedback}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* any ... */}

      <div className=" flex gap-3 px-10 flex-col items-center py-8 ">
        <h1 className="text-3xl md:text-4xl text-gray-800 font-medium">
          Learn anything, anytime, anywhere
        </h1>
        <p className="text-gray-400 font-medium text-sm">
          Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim
          id veniam aliqua proident excepteur commodo do ea.
        </p>

        <div className=" flex items-center pt-10 gap-2 ">
          <button
            type="button"
            className=" py-3 px-8 cursor-pointer text-xs font-medium w-fit text-white border-none bg-blue-500 rounded-xl  "
          >
            Get started{" "}
          </button>
          <button
            type="button"
            className=" py-3 px-8 flex text-xs cursor-pointer font-medium w-fit text-black rounded-xl  "
          >
            Learn more
            <img src={assets.arrow_icon} className="w-3 ml-2 " />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
