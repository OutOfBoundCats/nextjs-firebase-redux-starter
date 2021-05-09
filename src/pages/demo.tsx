import React, { Component } from "react";
import withAuth from "@hooks/useAuth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@services/firebase";
import { AppState } from "@redux/store/store";
import axios, { AxiosRequestConfig } from "axios";

import firebase from "firebase/app";
import "firebase/auth";

import {} from "@redux/reducers/auth/authAction";
import { toast } from "react-toastify";
import authCredentials from "@models/authCredentials";

function Dashboard() {
  const authCredential: authCredentials = useSelector(
    (state: AppState) => state.authReducer.authCredentials
  );
  if (typeof window !== "undefined") {
    const Router = useRouter();

    // If there is no access token we redirect to "/" page .
    if (!authCredential || authCredential.email_verified != true) {
      if (authCredential && authCredential.email_verified != true) {
        toast.error("email is not verified", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      Router.replace("/");
      return null;
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>protected</h2>
    </div>
  );
}

export default Dashboard;
