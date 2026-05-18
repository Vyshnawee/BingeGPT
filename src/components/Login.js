import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);

  const name = useRef(null);
  const email = useRef("null");
  const password = useRef("null");

  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value,
    );
    setErrMessage(message);
    if (message) return;

    if (isSignInForm) {
      //sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://tse4.mm.bing.net/th/id/OIP.jixXH_Els1MXBRmKFdMQPAHaHa?pid=Api&h=220&P=0",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }),
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              navigate("/error");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errMessage);
          console.log(errorCode + "-" + errMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/77c412a9-62ea-48a0-a5ee-466e11e851d5/web/IN-en-20260511-TRIFECTA-perspective_f0af4f75-4cc5-42bd-b0c5-2b65b8b50e03_medium.jpg"
          alt="bg"
        ></img>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-8 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl pb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-2 w-full bg-neutral-700"
          ></input>
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 my-2 w-full bg-neutral-700"
        ></input>

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full bg-neutral-700"
        ></input>

        <p className="text-red-500 font-bold text-sm py-2">{errMessage}</p>

        <button
          className="p-2 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now."
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
