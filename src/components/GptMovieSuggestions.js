import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import SomethingWentWrong from "./SomethingWentWrong";

export default function GptMovieSuggestions() {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  if (movieNames?.length === 0) return <SomethingWentWrong />;
  if (!movieNames) return null;
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-80 bg-black">
      {movieNames.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={movieResults[index]}
        />
      ))}
    </div>
  );
}
