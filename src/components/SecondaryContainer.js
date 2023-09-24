import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

export default function SecondaryContainer() {
  const movies = useSelector((store) => store.movies);
  console.log("movies", movies.nowPlayingMovies);
  return (
    <div className=" bg-black">
      <div className="mt-0 md:-mt-48 relative z-20 pl-4 md:pl-12">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Now Trending"} movies={movies.popularMovies} />
        <MovieList title={"Romantic Movies"} movies={movies.nowPlayingMovies} />
      </div>
    </div>
  );
}
