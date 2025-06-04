import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { ToggleGptSearchView } from "../utils/GptSlice";
import { changeLanguage } from "../utils/appConfigSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showGpt = useSelector((store) => store.gpt.showGptSearch);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoUrl: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
        // ...
      }
    });
    return () => unsubscribe();
  }, []);
  const user = useSelector((store) => store.user);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };
  const handleGpt = () => {
    dispatch(ToggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute  px-0 md:px-8 py-4 bg-gradient-to-b from-black z-10 w-full flex  flex-col md:flex-row md:justify-between justify-center">
      <img className="w-52 mx-auto md:mx-0 -mb-6  " src={LOGO} alt="Logo" />
      {user && (
        <div className="flex p-2  items-center  justify-between  ">
          {showGpt && (
            <select
              className="bg-black rounded-lg text-white p-3"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((item) => (
                <option key={item.identifier} value={item.identifier}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 m-2 bg-purple-800 rounded-lg text-white"
            onClick={() => {
              handleGpt();
            }}
          >
            {showGpt ? "Homepage" : "GPT Search"}
          </button>
          <div className="flex gap-1 md:gap-2">
            <img
              className="w-10 h-10  md:inline-block rounded-full "
              //src="https://occ-0-6624-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlW1WtKuaLIz8VxCx5NryzDK3_ez064IsBGdXjVUT59G5IRuFdqZlCJCneepU.png?r=229"
              alt="user-icon"
              src={user?.photoUrl}
            ></img>
            <button
              className="font-bold text-white ml-1 align-top"
              onClick={handleSignout}
            >
              (Sign Out)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
