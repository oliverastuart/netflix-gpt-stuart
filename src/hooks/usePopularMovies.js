import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../utils/constants";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const dispatch = useDispatch();
  const getPopularMovies = async () => {
    //fetch data from tmdb api and put it in redux store
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_Options
    );
    const json = await data.json();
    console.log("movies", json);
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    //to avoid api calls we can check if data is already present in popularMovies only then render else dont
    !popularMovies && getPopularMovies();
  }, []);
};
export default usePopularMovies;
