import React from "react";
import { genreMap } from "../utils/constants";

export default function MovieDetailModal({ movie, onClose }) {
  if (!movie) return null;

  const {
    title,
    overview,
    release_date,
    vote_average,
    backdrop_path,
    genre_ids,
    poster_path,
  } = movie;

  console.log("yolo-gen", movie);

  const imageUrl = `https://image.tmdb.org/t/p/w780${
    backdrop_path || poster_path
  }`;

  const genres = genre_ids.map((id) => genreMap[id] || "Unknown").join(", ");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-auto max-h-[90vh] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-3xl bg-white rounded-full pb-1 px-2"
        >
          &times;
        </button>

        {/* Image */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover rounded-t-2xl p-1"
        />

        {/* Content */}
        <div className="p-6 pt-0">
          <h2 className="text-2xl font-bold mb-2 text-black">
            {title || "NA"}
          </h2>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-bold">Genres:</span> {genres || "NA"}
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-bold">Release Date:</span>
            {release_date || "NA"}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            <span className="font-bold">Rating:</span> {vote_average} / 10
          </p>
          <p className="text-gray-800 text-sm leading-relaxed">
            {overview || ""}
          </p>
        </div>
      </div>
    </div>
  );
}
