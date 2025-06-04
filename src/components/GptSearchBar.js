import React, { useRef, useState } from "react";
import languageConfig from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_Options, GEMINI_API_URL, MOVIE_DB_URL } from "../utils/constants";
import { addGPTMovieResult } from "../utils/GptSlice";

export default function GptSearchBar() {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleGptsearchClick = async () => {
    try {
      setLoading(true);
      const userQuery = searchText.current.value;
      if (!userQuery.trim()) {
        return;
      }

      const promptText = `
      Act as a Movie Recommendation system.
      Suggest some movies for the query: "${userQuery}".
      IMPORTANT:
      1. Only give me names of 5 movies.
      2. The movie names MUST be comma-separated (e.g., Gadar, Sholay, Don, Ek Tha Tiger, Golmaal).
      3. Do NOT include any numbering, bullet points, or any other text before or after the movie list.
    `;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: promptText,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        },
      };

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        dispatch(addGPTMovieResult({ movieNames: [], movieResults: [] }));
      }

      const data = await response.json();
      console.log("Gemini API Full Response:", data);

      const textResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      console.log("Gemini text response (raw):", textResponse);

      if (!textResponse.trim()) {
        console.warn("Gemini returned an empty response or malformed content.");
        dispatch(addGPTMovieResult({ movieNames: [], movieResults: [] }));
        return;
      }

      const gptMovies = textResponse
        .split(",")
        .map((movie) => movie.trim().replace(/[^\w\s'-:]/g, ""))
        .filter(Boolean);

      console.log("Parsed movie names:", gptMovies);

      if (gptMovies.length === 0) {
        dispatch(addGPTMovieResult({ movieNames: [], movieResults: [] }));
        return;
      }

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResult = await Promise.all(promiseArray);

      dispatch(
        addGPTMovieResult({ movieNames: gptMovies, movieResults: tmdbResult })
      );
    } catch (error) {
      console.error("Error in handleGptsearchClick:", error);
      dispatch(addGPTMovieResult({ movieNames: [], movieResults: [] }));
    } finally {
      setLoading(false);
    }
  };

  const searchMovieTMDB = async (movie) => {
    console.log("movie1", movie);
    const data = await fetch(
      MOVIE_DB_URL + movie + "&include_adult=false&language=en-US&page=1",
      API_Options
    );

    const json = await data.json();
    console.log("hola1", json.results);
    return json.results;
  };
  const currentLanguage = useSelector((store) => store.appconfig.language);
  return (
    <div className="flex justify-center pt-[65%] md:pt-[15%]">
      <form
        className="bg-black w-full md:w-1/2 mx-2 md:mx-0 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-8 text-xs md:text-lg"
          placeholder={languageConfig[currentLanguage].searchPlaceholder}
        ></input>
        <button
          disabled={loading}
          className={`py-2 px-4 text-white rounded-lg col-span-4 m-4 ${
            loading ? "bg-red-500" : "bg-red-700"
          }`}
          onClick={handleGptsearchClick}
        >
          {languageConfig[currentLanguage].search}
        </button>
      </form>
    </div>
  );
}
