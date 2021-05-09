import { updateAuthCredentialsToken } from "@redux/reducers/auth/authAction";
import axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import authCredentials from "@models/authCredentials";

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);
///https://www.youtube.com/watch?v=zPCeloCwPX8
// Sign In

export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => auth.signOut();

// Password Reset
export const doPasswordReset = (email) => auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);

// email veryfication
export const sendEmailVerification = () => {
  auth.currentUser.sendEmailVerification();
};

// email veryfication
export const getCurrentuser = () => {
  auth.currentUser;
};

//https://firebase.google.com/docs/reference/rest/auth/#section-refresh-token

export function refresh(authCredentials: authCredentials, dispatch) {
  let api_key = authCredentials.api_key;
  let refresh_token = authCredentials.refresh_token;
  console.log(refresh_token);
  console.log(api_key);

  axios
    .post(
      "https://securetoken.googleapis.com/v1/token?key=" + api_key,
      "grant_type=refresh_token&refresh_token=" + refresh_token,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((id) => {
      console.log("id is" + id);
      let expTime = Date.now() + 45 * 60000;
      let exp = expTime.toString();
      dispatch(
        updateAuthCredentialsToken({
          token: id.data.access_token,
          expTime: exp,
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
}
