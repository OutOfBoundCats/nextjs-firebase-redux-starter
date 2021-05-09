import { auth } from "@services/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { AppState } from "@redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import authCredential from "@models/authCredentials";

interface Props {
  children: React.ReactNode;
}

const AuthComponent = ({ children }: Props) => {
  let authCredentials: authCredential = useSelector(
    (state: AppState) => state.authReducer.authCredentials
  );
  let dispatch = useDispatch();
  console.log("from authcmp" + authCredentials);
  useEffect(() => {
    setTimeout(() => {
      auth.refresh(authCredentials, dispatch);
    }, 20000);
    console.log("interval cleaned up");
  }, [authCredentials]);

  return <div className="auth">{children}</div>;
};

export default AuthComponent;
