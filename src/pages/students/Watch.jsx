import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import { assets } from "../../assets/assets";
import Rating from "../../components/students/Rating";
function Watch() {
  const { id } = useParams();
  const [open, setopen] = useState({});
  const [video, setvideo] = useState(null);
  const { AllCourses, TotaleTimeOfLecteur, TotaleCourse, Totalelessons } =
    useContext(AppContext);
  const [cours, setcours] = useState(null);
  const toggleSection = (index) => {
    setopen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const fetchcourses = async () => {
    const findcours = await AllCourses.find((item) => item._id == id);

    setcours(findcours);
  };

  useEffect(() => {
    fetchcourses();
  }, [AllCourses, id]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-12 lg:py-12 flex flex-col-reverse gap-8 md:grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-start md:gap-10">
        {/* left bottom */}

        <div className="flex flex-col gap-6">
          <div className="flex items-end justify-between border-b border-slate-200 pb-4">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              course structur
            </h1>
            <span className="text-sm text-slate-500">
              {cours?.courseContent?.length || 0}{" "}
              {cours?.courseContent?.length > 1 ? "chapters" : "chapter"}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {cours?.courseContent.map((lesson, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-xl border bg-white transition-shadow duration-300 ${
                  open[index]
                    ? "border-indigo-200 shadow-md shadow-indigo-100/60"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* chapter header */}
                <div
                  onClick={() => toggleSection(index)}
                  className="flex cursor-pointer select-none items-center justify-between gap-4 px-4 py-3.5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        open[index] ? "bg-indigo-600" : "bg-slate-100"
                      }`}
                    >
                      <img
                        src={assets.down_arrow_icon}
                        alt="arrow"
                        className={`w-2.5 transition-transform duration-300 ${
                          open[index] ? "rotate-180 invert" : ""
                        }`}
                      />
                    </span>
                    <p className="truncate text-[15px] font-semibold text-slate-900">
                      {lesson.chapterTitle}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 text-[13px] font-medium text-slate-500">
                    <p>
                      {lesson.chapterContent.length}{" "}
                      {lesson.chapterContent.length > 1
                        ? "lecteurs"
                        : "lecteur"}
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
                      ? "max-h-96 overflow-y-auto border-t border-slate-100"
                      : "max-h-0"
                  }`}
                >
                  <div className="flex flex-col p-2">
                    {lesson.chapterContent.map((chapter, i) => {
                      const isActive =
                        video?.chapter === index + 1 && video?.video === i + 1;
                      return (
                        <div
                          key={i}
                          className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                            isActive
                              ? "bg-indigo-50 ring-1 ring-indigo-200"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <img
                              src={assets.play_icon}
                              alt="play"
                              className={`w-3.5 shrink-0 ${
                                isActive ? "opacity-100" : "opacity-60"
                              }`}
                            />
                            <p
                              className={`truncate text-sm font-medium ${
                                isActive ? "text-indigo-900" : "text-slate-700"
                              }`}
                            >
                              {chapter.lectureTitle}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-3">
                            {chapter && (
                              <p
                                onClick={() => {
                                  setvideo({
                                    ...chapter,
                                    video: i + 1,
                                    chapter: index + 1,
                                  });
                                }}
                                className="cursor-pointer rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-indigo-700 active:scale-95"
                              >
                                watch
                              </p>
                            )}
                            <p className="w-16 text-right text-[13px] font-medium text-slate-500">
                              {humanizeDuration(
                                chapter.lectureDuration * 60 * 1000,
                                {
                                  units: ["h", "m"],
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3.5 ">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Course Rating
            </h1>
            <Rating />
          </div>
        </div>

        {/* right top */}
        <div className="w-full md:sticky md:top-6">
          {video ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70">
              <YouTube
                videoId={video?.lectureUrl.split("/").pop()}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="aspect-video w-full"
              />
              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-sm font-medium text-slate-600">
                    <span>{video?.chapter}</span>-<span> {video?.video} </span>
                  </span>
                  {video?.lectureTitle}
                </p>

                <button
                  type="button"
                  className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95"
                >
                  {" "}
                  Mark as seen{" "}
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70">
              <img
                src={cours?.courseThumbnail}
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Watch;
