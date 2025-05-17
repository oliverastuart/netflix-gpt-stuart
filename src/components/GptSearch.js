import React, { useEffect } from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGPTMovieResult } from "../utils/GptSlice";

export default function GptSearch() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(addGPTMovieResult({ movieNames: null, movieResults: null }));
    };
  }, []);
  return (
    <>
      <div className="absolute -z-10">
        <img
          className="h-screen object-cover w-screen"
          src={BG_URL}
          alt="Background"
        />
      </div>
      <div className="flex flex-col gap-6">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
}
