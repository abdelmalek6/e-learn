import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import uniqid from "uniqid";

const emptyLecteur = {
  Title: "",
  Url: "",
  isFree: false,
  duration: "",
};

function NewCourse() {
  const [formData, setFormData] = useState({
    Title: "",
    Headings: "",
    Description: "",
    Price: 0,
  });
  const [chapters, setChapters] = useState([]);
  const [Thumbnail, setThumbnail] = useState("");

  const [popup, setPopup] = useState(null);
  const [lecteurData, setLecteurData] = useState(emptyLecteur);

  const [collapsed, setCollapsed] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (Thumbnail) URL.revokeObjectURL(Thumbnail);
    };
  }, [Thumbnail]);

  /* ----------------------------- Chapters ---------------------------- */
  const NewChapter = () => {
    const title = prompt("Enter chapter title");
    if (!title || !title.trim()) return;

    const newChapter = {
      chapterId: uniqid(),
      title: title.trim(),
      content: [],
      Order: chapters.length > 0 ? chapters[chapters.length - 1].Order + 1 : 1,
    };
    setChapters([...chapters, newChapter]);
  };

  const removeChapter = (chapterId) => {
    setChapters(chapters.filter((chap) => chap.chapterId !== chapterId));
  };

  const toggleChapter = (chapterId) => {
    setCollapsed({ ...collapsed, [chapterId]: !collapsed[chapterId] });
  };

  /* ----------------------------- Lecteurs ---------------------------- */
  const openPopup = (chapterId) => {
    setLecteurData(emptyLecteur);
    setPopup(chapterId);
  };

  const closePopup = () => {
    setPopup(null);
    setLecteurData(emptyLecteur);
  };

  const handleLecteurChange = (e) => {
    const { name, value, type, checked } = e.target;

    setLecteurData({
      ...lecteurData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addLecteur = (e) => {
    e.preventDefault();

    if (!lecteurData.Title.trim() || !lecteurData.Url.trim()) {
      alert("Title and URL are required");
      return;
    }

    const newLecteur = {
      lecteurId: uniqid(),
      Title: lecteurData.Title.trim(),
      Url: lecteurData.Url.trim(),
      isFree: lecteurData.isFree,
      duration: lecteurData.duration,
    };

    setChapters(
      chapters.map((chap) =>
        chap.chapterId === popup
          ? { ...chap, content: [...chap.content, newLecteur] }
          : chap,
      ),
    );
    closePopup();
  };

  const removeLecteur = (chapterId, lecteurId) => {
    setChapters(
      chapters.map((chap) =>
        chap.chapterId === chapterId
          ? {
              ...chap,
              content: chap.content.filter((l) => l.lecteurId !== lecteurId),
            }
          : chap,
      ),
    );
  };

  /* ------------------------------ Submit ----------------------------- */
  const handleSubmit = () => {
    const course = {
      ...formData,
      Price: Number(formData.Price),
      Thumbnail,
      chapters,
    };
    console.log(course);
  };

  return (
    <div className="px-10  max-md:px-5 h-full w-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="py-6 space-y-5 w-[50%] max-md:w-full"
      >
        {/* Title */}
        <div className="flex flex-col gap-2.5">
          <label className="text-base text-gray-500 font-medium">
            Course Title
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="Title"
            value={formData.Title}
            placeholder="Type here"
            className="px-4 py-2 outline-none rounded border-gray-600 border-[1px]"
          />
        </div>

        {/* Headings */}
        <div className="flex flex-col gap-2.5">
          <label className="text-base text-gray-500 font-medium">
            Course Headings
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="Headings"
            value={formData.Headings}
            placeholder="Type here"
            className="px-4 py-2 outline-none rounded border-gray-600 border-[1px]"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2.5">
          <label className="text-base text-gray-500 font-medium">
            Course Description
          </label>
          <textarea
            onChange={handleChange}
            name="Description"
            value={formData.Description}
            placeholder="Type here"
            className="w-full rounded border-gray-600 border-[1px] outline-none py-2 px-3"
          ></textarea>
        </div>

        {/* Price + Thumbnail */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-gray-500 font-medium">
              Course Price
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="Price"
              min="0"
              value={formData.Price}
              placeholder="0"
              className="py-2 px-2 w-[120px] outline-none border-[1px] rounded border-gray-600"
            />
          </div>

          <div className="flex items-center gap-3">
            <p className="text-base text-gray-500 font-medium">
              Course Thumbnail
            </p>
            <button
              type="button"
              onClick={() => document.getElementById("file").click()}
              className="bg-blue-600 px-4 py-2 rounded border-none cursor-pointer"
            >
              <img src={assets.file_upload_icon} className="w-5" />
            </button>
            <input
              onChange={handleThumbnail}
              type="file"
              accept="image/*"
              className="hidden"
              id="file"
            />
            {Thumbnail ? <img src={Thumbnail} className="w-15" /> : null}
          </div>
        </div>

        {/* Chapters */}
        <div className="w-full my-3  space-y-3">
          {chapters.length ? (
            chapters.map((chap) => (
              <div
                key={chap.chapterId}
                className="w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                {/* Chapter header */}
                <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div
                    className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer select-none"
                    onClick={() => toggleChapter(chap.chapterId)}
                  >
                    <img
                      src={assets.dropdown_icon}
                      className={`w-4 shrink-0 transition-transform duration-200 ${
                        collapsed[chap.chapterId] ? "-rotate-90" : ""
                      }`}
                    />
                    <p className="text-gray-800 font-semibold text-sm truncate">
                      {chap.Order}. {chap.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-gray-500 bg-gray-200 px-2.5 py-1 rounded-full">
                      {chap.content.length} lecture
                      {chap.content.length !== 1 ? "s" : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeChapter(chap.chapterId)}
                      className="p-1 rounded hover:bg-red-100 transition-colors cursor-pointer"
                      title="Delete chapter"
                    >
                      <img src={assets.cross_icon} className="w-4" />
                    </button>
                  </div>
                </div>

                {/* Lecteurs */}
                {!collapsed[chap.chapterId] && (
                  <div className="p-3 space-y-2">
                    {chap.content.length === 0 && (
                      <p className="text-xs text-gray-400 px-1">
                        No lecteurs in this chapter yet.
                      </p>
                    )}

                    {chap.content.map((lecteur, lecteurIdx) => (
                      <div
                        key={lecteur.lecteurId}
                        className="flex items-center justify-between gap-3 px-3 py-2 rounded-md border border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xs font-medium text-gray-400 w-5 shrink-0">
                            {lecteurIdx + 1}
                          </span>
                          <p className="text-sm text-gray-700 font-medium truncate">
                            {lecteur.Title}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 text-xs">
                          {lecteur.duration && (
                            <span className="text-gray-500">
                              {lecteur.duration} min
                            </span>
                          )}
                          <span
                            className={`px-2 py-0.5 rounded-full font-medium ${
                              lecteur.isFree
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {lecteur.isFree ? "Free" : "Paid"}
                          </span>
                          <a
                            href={lecteur.Url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Link
                          </a>
                          <button
                            type="button"
                            onClick={() =>
                              removeLecteur(chap.chapterId, lecteur.lecteurId)
                            }
                            className="p-1 rounded hover:bg-red-100 transition-colors cursor-pointer"
                            title="Delete lecteur"
                          >
                            <img src={assets.cross_icon} className="w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => openPopup(chap.chapterId)}
                      className="w-full py-2 mt-1 text-sm font-medium text-gray-600 border border-dashed border-gray-400 rounded-md hover:bg-gray-100 hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      + Add lecteur
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 text-center py-6 border border-dashed border-gray-300 rounded-lg">
              No chapters added yet.
            </p>
          )}
        </div>

        {/* Add chapter */}
        <button
          onClick={NewChapter}
          type="button"
          className="w-full rounded py-2 bg-gray-200 flex items-center justify-center text-black font-medium lowercase cursor-pointer"
        >
          Add chapter
        </button>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          type="button"
          className="py-3 px-9 cursor-pointer my-3 w-fit bg-black text-white font-medium rounded text-sm"
        >
          Add
        </button>
      </form>

      {/* Popup : Add lecteur */}
      {popup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closePopup}
        >
          <form
            onSubmit={addLecteur}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded p-6 space-y-4"
          >
            <img
              src={assets.cross_icon}
              className="absolute top-3 right-3 w-5 cursor-pointer"
              onClick={closePopup}
            />

            <h2 className="text-lg font-semibold text-gray-800">Add Lecteur</h2>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-500 font-medium">
                Lecteur Title
              </label>
              <input
                type="text"
                name="Title"
                value={lecteurData.Title}
                onChange={handleLecteurChange}
                placeholder="Type here"
                className="px-3 py-2 outline-none rounded border-gray-600 border-[1px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-500 font-medium">
                Lecteur URL
              </label>
              <input
                type="text"
                name="Url"
                value={lecteurData.Url}
                onChange={handleLecteurChange}
                placeholder="https://..."
                className="px-3 py-2 outline-none rounded border-gray-600 border-[1px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-500 font-medium">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                min="0"
                value={lecteurData.duration}
                onChange={handleLecteurChange}
                placeholder="0"
                className="px-3 py-2 w-[120px] outline-none rounded border-gray-600 border-[1px]"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-500 font-medium cursor-pointer">
              <input
                type="checkbox"
                name="isFree"
                checked={lecteurData.isFree}
                onChange={handleLecteurChange}
              />
              Is Preview Free?
            </label>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded text-sm font-medium cursor-pointer"
            >
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewCourse;
