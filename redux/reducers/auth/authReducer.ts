import {
  SIGN_UP,
  AUTH_ERROR,
  UPDATE_AUTH_CREDENTIALS,
  UPDATE_AUTH_CREDENTIALS_TOKEN,
} from "./authType";
import authUser from "@models/authUser";

const initialState = {
  authUser: null,
  authError: null,
  authCredentials: {
    access_token: null,
    refresh_token: null,
    email_verified: false,
    email: null,
    uid: null,
    photo_url: null,
    api_key: null,
    display_name: null,
    phone_number: null,
    expirationTime: null,
  },
};

// Creating my reducer
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, authUser: action.payload };
    case AUTH_ERROR:
      return { ...state, authError: action.payload };
    case UPDATE_AUTH_CREDENTIALS:
      return { ...state, authCredentials: action.payload };
    case UPDATE_AUTH_CREDENTIALS_TOKEN:
      return {
        ...state,
        authCredentials: {
          ...state.authCredentials,
          access_token: action.payload.token,
          expirationTime: action.payload.expTime,
        },
      };
    default:
      return state;
  }
}
