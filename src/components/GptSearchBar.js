import React, { useRef } from "react";
import languageConfig from "../utils/languageConstants";
import openai from "../utils/openai";
import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../utils/constants";
import { addGPTMovieResult } from "../utils/GptSlice";

export default function GptSearchBar() {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const handleGptsearchClick = async () => {
    //make an api call to openAi CHat gpt and get results.
    try {
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movvies for the query : " +
        searchText.current.value +
        ". only give me names of 5 movies comma seperated like the example result given ahea. example result: gadar, sholay, don, ek tha tiger, golmal";
      const gptResuls = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });
      const gptMovies = gptResuls.choices?.[0]?.message?.content.split(",");
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      console.log("promiseArray", gptMovies);
      const tmdbResult = await Promise.all(promiseArray);
      console.log("illi", tmdbResult);
      dispatch(
        addGPTMovieResult({ movieNames: gptMovies, movieResults: tmdbResult })
      );
    } catch (error) {
      dispatch(addGPTMovieResult({ movieNames: [], movieResults: [] }));
    }
  };

  //movie search
  const searchMovieTMDB = async (movie) => {
    console.log("movie1", movie);
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_Options
    );

    const json = await data.json();
    console.log("hola1", json.results);
    return json.results;
  };
  const currentLanguage = useSelector((store) => store.appconfig.language);
  return (
    <div className="flex justify-center pt-[45%] md:pt-[15%]">
      <form
        className="bg-black w-full md:w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={languageConfig[currentLanguage].searchPlaceholder}
        ></input>
        <button
          className="py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4"
          onClick={handleGptsearchClick}
        >
          {languageConfig[currentLanguage].search}
        </button>
      </form>
    </div>
  );
}
