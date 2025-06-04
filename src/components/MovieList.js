import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieDetailModal from "./MovieDetailModal";

export default function MovieList({ title, movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="p-6 text-white">
      <h1 className="text-lg md:text-3xl font-bold py-8">{title}</h1>

      <div className="flex overflow-x-scroll">
        <div className="flex gap-4">
          {movies?.map((movie) => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              className="cursor-pointer"
            >
              <MovieCard posterPath={movie.poster_path} />
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Show modal when a movie is selected */}
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
