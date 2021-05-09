import {
  createStore,
  AnyAction,
  Store,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";

import thunkMiddleware from "redux-thunk";
import count from "../reducers/count/reducer";
import tick from "../reducers/tick/reducer";
import counter from "../reducers/counter/reducer";
import authReducer from "@redux/reducers/auth/authReducer";
import { createLogger } from "redux-logger";
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//https://github.com/vercel/next.js/tree/canary/examples/with-redux-wrapper
//https://github.com/kirill-konshin/next-redux-wrapper#motivation
//https://react-redux.js.org/using-react-redux/connect-mapstate
//https://github.com/fazlulkarimweb/with-next-redux-wrapper-redux-persist

const bindMiddleware = (middleware) => {
  const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === "development",
  });

  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    //middleware.push(loggerMiddleware);
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  count,
  tick,
  counter,
  authReducer,
});

export type AppState = ReturnType<typeof combinedReducer>;

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

//************************************************************************** */
function is_server() {
  return !(typeof window != "undefined" && window.document);
}

const makeStore = () => {
  if (!is_server) {
    //If it's on server side, create a store
    return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "nextjs",
      whitelist: ["counter", "authReducer"], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, reducer); // Create a new reducer with our existing reducer

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    ); // Creating the store again

    return store;
  }
};

export const wrapper = createWrapper(makeStore);
