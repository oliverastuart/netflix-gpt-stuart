import React, { useState } from "react";
import Header from "./Header";

export default function Login() {
  const [isSigninForm, setIsSigninForm] = useState(true);

  const toggleSigninForm = () => {
    setIsSigninForm(!isSigninForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute ">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/42df4e1f-bef6-499e-87ff-c990584de314/5e7c383c-1f88-4983-b4da-06e14c0984ba/IN-en-20230904-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Background"
        />
      </div>
      <form className="w-3/12 absolute mt-10 bg-black p-12 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSigninForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSigninForm && (
          <input
            type="text"
            placeholder="Full Name "
            className="p-4 my-4 w-full bg-gray-700"
          ></input>
        )}
        <input
          type="text"
          placeholder="Email-ID "
          className="p-4 my-4 w-full bg-gray-700"
        ></input>

        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        ></input>
        <button className="p-2 my-6  bg-red-700 w-full rounded-lg  ">
          {isSigninForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4" onClick={toggleSigninForm}>
          {isSigninForm ? "New to Netflix? Sign Up" : "Already a user? Sign In"}
        </p>
      </form>
    </div>
  );
}
