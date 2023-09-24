import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

export default function GptSearch() {
  return (
    <>
      <div className="absolute -z-10">
        <img
          className="h-screen object-cover w-screen"
          src={BG_URL}
          alt="Background"
        />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
}
