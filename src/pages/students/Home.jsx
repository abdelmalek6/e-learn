import React from "react";
import Hero from "../../components/students/Hero";
import Companies from "../../components/students/Companies";
import BestCourses from "../../components/students/BestCourses";
import Comment from "../../components/students/Comment";
import Foter from "../../components/students/Foter";
function Home() {
  return (
    <div className=" flex flex-col space-y-14 md:space-y-16 items-center   ">
      <Hero />
      <Companies />
      <BestCourses />
      <Comment />
      <Foter/>
    </div>
  );
}

export default Home;
