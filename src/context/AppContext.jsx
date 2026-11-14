import { createContext, useEffect, useState } from "react";
import { dummyCourses, dummyTestimonial } from "../assets/assets.js";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [AllCourses, setAllCourses] = useState([]);
  const [comments, setcomments] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledcourses, setEnroll] = useState([]);

  const fetchcourses = async () => {
    setAllCourses(dummyCourses);
    setcomments(dummyTestimonial);
  };
  // enrolled courses

  const fetchEnroll = async () => {
    setEnroll(dummyCourses);
  };

  // get ranked of courses
  const getRank = (course) => {
    if (course?.courseRatings.length === 0) {
      return 0;
    }
    let totalrRank = 0;
    course?.courseRatings.forEach((ele) => {
      totalrRank += ele.rating;
    });

    return totalrRank / course?.courseRatings.length;
  };
  // TotaleTimeOfLecteur

  const TotaleTimeOfLecteur = (lesson) => {
    let totale = 0;
    lesson.forEach((ele) => {
      totale += ele.lectureDuration;
    });
    return totale;
  };

  // totale cours time
  const TotaleCourse = (course) => {
    let totale = 0;

    course.courseContent.forEach((ele) => {
      ele.chapterContent.forEach(
        (lecteur) => (totale += lecteur.lectureDuration),
      );
    });

    return totale;
  };

  const Totalelessons = (course) => {
    let totale = 0;

    course.courseContent.forEach((ele) => {
      totale += Number(ele.chapterContent.length);
    });

    return totale;
  };

  useEffect(() => {
    fetchcourses();
    fetchEnroll();
  }, []);

  const value = {
    AllCourses,
    comments,
    TotaleTimeOfLecteur,
    getRank,
    isEducator,
    isEducator,
    TotaleCourse,
    Totalelessons,
    enrolledcourses,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
