import React from "react";
import MovieCard from "./MovieCard";

export default function MovieList({ title, movies }) {
  return (
    <div className="p-6  text-white">
      <h1 className="text-lg md:text-3xl py-2">{title}</h1>

      <div className="flex overflow-x-scroll  ">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
        {/* <MovieCard poster_path={props.movies[0].poster_path} /> */}
      </div>
    </div>
  );
}
