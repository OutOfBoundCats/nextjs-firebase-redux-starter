import {
  SIGN_UP,
  AUTH_ERROR,
  UPDATE_AUTH_CREDENTIALS_TOKEN,
  UPDATE_AUTH_CREDENTIALS,
} from "./authType";
import authUser from "@models/authUser";

export const signUp = (payload) => ({
  type: SIGN_UP,
  payload: authUser,
});

export const authError = (authError) => ({
  type: AUTH_ERROR,
  payload: authError,
});

export const updateAuthCredentials = (authCred) => ({
  type: UPDATE_AUTH_CREDENTIALS,
  payload: authCred,
});

export const updateAuthCredentialsToken = (authCredToken) => ({
  type: UPDATE_AUTH_CREDENTIALS_TOKEN,
  payload: authCredToken,
});
