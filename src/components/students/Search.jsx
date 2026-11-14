import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Search() {
  const [data, setdata] = useState("");
  const navigate = useNavigate();
  const handellsubmit = (e) => {
    e.preventDefault();
    navigate("/students/course-list/" + data);
  };

  return (
    <form onSubmit={handellsubmit}>
      <div className=" flex items-center justify-between md:w-2xl max-w-2xl  py-0.5 border-gray-600 border-[1px] rounded-xl px-1  ">
        <input
          value={data}
          onChange={(e) => {
            setdata(e.target.value);
          }}
          type="text"
          className="outline-none w-full border-none py-2 px-4 "
          placeholder=" Search "
        />

        <button
          type="submit"
          className="py-2 px-15 hover:bg-blue-400/80 bg-blue-600 text-sm text-white rounded-xl  "
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;
