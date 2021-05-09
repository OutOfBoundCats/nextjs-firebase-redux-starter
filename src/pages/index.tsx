import React, { Component } from "react";
import Head from "next/head";
import Image from "next/image";
import { auth } from "@services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";
import { AppState } from "@redux/store/store";
import { useRouter } from "next/router";
import {
  signUp,
  authError,
  updateAuthCredentials,
} from "@redux/reducers/auth/authAction";
import authCredentials from "@models/authCredentials";

function index() {
  let authUser = useSelector((state: AppState) => state.authReducer.authUser);
  let dispatch = useDispatch();
  let Router = useRouter();
  let loginUser = async (loginEvent) => {
    loginEvent.preventDefault();
    let email = loginEvent.target.email.value;
    let password = loginEvent.target.password.value;
    console.log(email + " and " + password);
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        console.log("Recived credentials are " + userCredentials);
        let user = userCredentials.user;
        let refresh_token = user.refreshToken;
        let access_token = user.getIdToken();
        let idToken: string = "";
        access_token.then((idToken1) => {
          idToken = idToken1;
          let email_verified = user.emailVerified;
          let email = user.email;
          let uid = user.uid;
          let photo_url = user.photoURL;
          let api_key = JSON.parse(JSON.stringify(user)).apiKey;
          let display_name = user.displayName;
          let phone_number = user.phoneNumber;
          let expiration = Date.now() + 30 * 60000;
          let authcred: authCredentials = {
            access_token: idToken,
            refresh_token: refresh_token,
            email_verified: email_verified,
            email: email,
            uid: uid,
            photo_url: photo_url,
            api_key: api_key,
            display_name: display_name,
            phone_number: phone_number,
            expirationTime: expiration.toString(),
          };
          dispatch(updateAuthCredentials(authcred));
        });

        toast.success("logged in", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        Router.replace("/demo");
      })
      .catch((error) => {
        dispatch(authError(error));
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        console.log(error.message);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={loginUser}>
          <input type="hidden" name="remember" value="true"></input>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              ></input>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              ></input>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              ></input>
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default index;
