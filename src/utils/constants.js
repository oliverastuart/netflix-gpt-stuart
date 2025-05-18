export const LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR =
  "https://imgs.search.brave.com/FrjknLEFfRY9CepUgm1ImDKqj8lF3wVf5egvCuiYEzs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzE4LzAxLzk4/LzM2MF9GXzExODAx/OTgyMl82Q0tYUDZy/WG1WaERPemJYWmxM/cUVNMnlhNEhoWXpT/Vi5qcGc";

export const API_Options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";
export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/42df4e1f-bef6-499e-87ff-c990584de314/5e7c383c-1f88-4983-b4da-06e14c0984ba/IN-en-20230904-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];

const modelName = "gemini-1.5-flash-latest";
export const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`;
export const MOVIE_DB_URL = "https://api.themoviedb.org/3/search/movie?query=";
