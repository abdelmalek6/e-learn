import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import humanizeDuration from "humanize-duration";
import Foter from "../../components/students/Foter"
import { assets } from "../../assets/assets";
import YouTube from "react-youtube";
function CourseDetails() {
  const {
    AllCourses,
    getRank,
    TotaleTimeOfLecteur,
    TotaleCourse,
    Totalelessons,
  } = useContext(AppContext);
  const { id } = useParams();
  const [cours, setcours] = useState(null);
  const [open, setopen] = useState({});
  const [isEnrollement, setEnrollement] = useState(false);
  const [previewvideo, setpreviewvideo] = useState(null);
  const toggleSection = (index) => {
    setopen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    setcours(AllCourses.find((item) => item._id === id) || null);
  }, [AllCourses, id]);

  if (!cours) {
    return <div className="py-10 px-16 text-gray-500">Loading...</div>;
  }

  const rank = getRank(cours);

  return (
   <>
    <div className="py-7 md:py-15 w-full  px-6 sm:px-16 md:px-23 flex flex-col-reverse md:flex-row gap-x-8 gap-y-6">
      {/* left || bottom div */}
      <div className="flex-1 flex flex-col space-y-5  md:space-y-7 text-left">
        <h1 className="text-2xl font-medium text-gray-900 md:text-4xl">
          {cours.courseTitle}
        </h1>

        <p
          className="text-sm max-md:text-xs text-gray-500/70 font-medium"
          dangerouslySetInnerHTML={{
            __html: cours.courseDescription.slice(0, 200),
          }}
        />

        <div className="flex flex-col gap-1">
          <div className="flex items-center flex-wrap">
            <p className="mr-2 text-sm">{rank}</p>
            {Array.from({ length: 5 }).map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(rank) ? assets.star : assets.star_blank}
                alt="star"
                className="w-3"
              />
            ))}
            <p className="ml-2 text-sm">
              {`(${cours.courseRatings.length}) `}
              <span className="text-blue-600">
                {cours.courseRatings.length > 1 ? "ratings" : "rating"}
              </span>
            </p>
            <p className="ml-2 text-sm text-black/60">
              {cours.enrolledStudents.length}{" "}
              {cours.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>
          <p className="text-sm text-black/40">
            Course By : <span className="text-blue-600">Abdelmalek</span>
          </p>
        </div>

        {/* course structure */}
        <h2 className="text-xl md:text-2xl font-medium text-gray-800">
          Course Structure
        </h2>

        <div className="flex flex-col gap-2">
          {cours.courseContent.map((lesson, index) => (
            <div key={index}>
              {/* chapter header */}
              <div
                onClick={() => toggleSection(index)}
                className="py-2.5 px-3 border border-gray-300 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={assets.down_arrow_icon}
                    alt="arrow"
                    className={`w-3 transition-transform duration-300 ${
                      open[index] ? "rotate-180" : ""
                    }`}
                  />
                  <p className="text-black/80 font-medium text-[16px]">
                    {lesson.chapterTitle}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-black/80 font-medium text-[16px]">
                  <p>
                    {lesson.chapterContent.length}{" "}
                    {lesson.chapterContent.length > 1 ? "lecteurs" : "lecteur"}
                    {" - "}
                  </p>
                  <p>
                    {humanizeDuration(
                      TotaleTimeOfLecteur(lesson.chapterContent) * 60 * 1000,
                      { units: ["h", "m"] },
                    )}
                  </p>
                </div>
              </div>

              {/* chapter content (collapsible) */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open[index]
                    ? "max-h-96 border border-t-0 border-gray-300 py-2"
                    : "max-h-0"
                }`}
              >
                <div className="px-8 flex flex-col gap-1.5">
                  {lesson.chapterContent.map((chapter, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 py-1 justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={assets.play_icon}
                          alt="play"
                          className="w-3"
                        />
                        <p className="text-[15px] font-medium text-gray-700">
                          {chapter.lectureTitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        {chapter.isPreviewFree && (
                          <p
                            onClick={() => {
                              setpreviewvideo({
                                videoId: chapter.lectureUrl.split("/").pop(),
                              });
                            }}
                            className="text-sm cursor-pointer font-medium text-blue-600"
                          >
                            preview
                          </p>
                        )}
                        <p className="text-[15px] font-medium text-gray-700">
                          {humanizeDuration(
                            chapter.lectureDuration * 60 * 1000,
                            {
                              units: ["h", "m"],
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h1 className="text-xl md:text-2xl font-medium text-gray-800 my-8">
          Course Description
        </h1>

        <p
          className="rich-text"
          dangerouslySetInnerHTML={{ __html: cours.courseDescription }}
        />
      </div>

      {/* right || top div */}
      <div className=" w-full md:w-110 h-fit   z-10 shadow-xl overflow-hidden">
        {previewvideo ? (
          <YouTube
            videoId={previewvideo.videoId}
            opts={{ playerVars: { autoplay: 1 } }}
            iframeClassName="aspect-video w-full"
          />
        ) : (
          <img src={cours.courseThumbnail} alt="course image" />
        )}

        <div className=" flex flex-col space-y-5 md:space-y-6 px-5 py-6 ">
          <div className=" flex items-center gap-3  ">
            <img src={assets.time_left_clock_icon} className=" w-4 " />
            <p className=" text-red-500 font-medium text-sm ">
              {" "}
              <span className="text-lg">5</span> days left at this price!
            </p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-4xl max-md:text-3xl font-bold text-black/80">
              $
              {(
                cours.coursePrice -
                (cours.discount * cours.coursePrice) / 100
              ).toFixed(2)}{" "}
            </p>
            <p className=" text-xl text-black/40 line-through  ">
              {" "}
              ${cours.coursePrice}{" "}
            </p>
            <p className="text-lg text-black/40 ">
              {" "}
              {cours.discount}
              <span className="text-sm">% Off</span>{" "}
            </p>
          </div>

          <div className=" flex items-center gap-4 text-black/50 font-medium ">
            {" "}
            <div className=" flex items-center  gap-1 ">
              <img src={assets.star} className="w-4" />
              <p> {getRank(cours)} </p>
            </div>
            <p>
              {" "}
              {humanizeDuration(TotaleCourse(cours) * 60 * 1000, {
                units: ["h", "m"],
              })}{" "}
            </p>
            <div className=" flex items-center gap-1">
              <img src={assets.lesson_icon} className="w-4" />
              <p> {Number(Totalelessons(cours))} lesson</p>
            </div>
          </div>

          <button
            type="button"
            className=" w-full py-3 bg-blue-600 text-sm text-white font-medium  "
          >
            {" "}
            {isEnrollement ? "Already Enrolled" : "Enroll Now "}{" "}
          </button>

          <div className="flex flex-col gap-2.5">
            <h1 className="text-gray-800 text-xl font-medium py-1 ">
              What's in the course?
            </h1>
            <ul className="text-gray-500 list-disc text-sm font-medium space-y-1">
              <li> Lifetime access with free updates.</li>
              <li> Step-by-step, hands-on project guidance.</li>
              <li> Downloadable resources and source code.</li>
              <li> Quizzes to test your knowledge.</li>
              <li> Certificate of completion.</li>
            </ul>
          </div>
        </div>
      </div>


      
    </div>
    <Foter/>
   
   </>
  );
}

export default CourseDetails;
