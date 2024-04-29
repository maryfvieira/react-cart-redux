import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import rootReducer from './rootReducer';
import { persistReducer } from "redux-persist";
import storage from "./storage";

// ----------------------------------------------------------------------

// Define the root state type using the ReturnType utility of TypeScript
//export type RootState = ReturnType<typeof rootReducer>;


const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["tracking"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });
};

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//       immutableCheck: false,
//     }),
// });

// Extract the dispatch function from the store for convenience
const { dispatch } = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

// Create a custom useDispatch hook with typed dispatch
const useDispatch = () => useAppDispatch<AppDispatch>();

// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];

// Export the Redux store, dispatch, useSelector, and useDispatch for use in components
export { dispatch, useSelector, useDispatch };