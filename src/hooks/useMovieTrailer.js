import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  const dispatch = useDispatch();
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_Options
    );
    const json = await data.json();
    const filteredData = json.results.filter(
      (video) => video.type == "Trailer"
    );

    const trailer = filteredData.length ? filteredData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    !trailerVideo && getMovieVideo();
  }, []);
};
export default useMovieTrailer;
