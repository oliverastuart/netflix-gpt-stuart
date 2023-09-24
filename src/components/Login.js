import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";
export default function Login() {
  const dispatch = useDispatch();
  const [isSigninForm, setIsSigninForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleSigninForm = () => {
    setIsSigninForm(!isSigninForm);
  };
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSigninForm) {
      //sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //auth.currentUser can be replased with user object on the above line of code
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoUrl: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(errorMessage);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
          // ..
        });
    } else {
      //sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute ">
        <img
          className="h-screen object-cover w-screen"
          src={BG_URL}
          alt="Background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute mt-32 md:mt-26 bg-black p-12 mx-auto right-0 left-0 text-white bg-opacity-80 "
      >
        <h1 className="font-bold text-3xl py-4">
          {isSigninForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSigninForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name "
            className="p-4 my-4 w-full bg-gray-700"
          ></input>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email-ID "
          className="p-4 my-4 w-full bg-gray-700"
        ></input>

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        ></input>
        <p className="text-red-600">{errorMessage}</p>
        <button
          className="p-2 my-6  bg-red-700 w-full rounded-lg  "
          onClick={handleButtonClick}
        >
          {isSigninForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSigninForm}>
          {isSigninForm ? "New to Netflix? Sign Up" : "Already a user? Sign In"}
        </p>
      </form>
    </div>
  );
}
