import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

export default function MovieCard(props) {
  return (
    <div className="w-48 pr-4">
      <img src={IMG_CDN_URL + props.posterPath} alt="Movie card"></img>
    </div>
  );
}
