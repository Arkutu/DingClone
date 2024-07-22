import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./reducers/appReducer";

export const store = configureStore({
  reducer: {
    appState: stateReducer,
  },
});
