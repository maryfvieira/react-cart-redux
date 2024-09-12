import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import rootReducer from '@redux/rootReducer';
import { persistReducer, persistStore } from "redux-persist";
import storage from "@redux/storage";
import { useRef } from 'react';
import { encryptTransform } from 'redux-persist-transform-encrypt';


// ----------------------------------------------------------------------

const persistConfig = {
  key: "root",
  storage,
  transforms: [ encryptTransform({
    secretKey: 'my-super-secret-key',
    onError: function (error) {
      console.log(error);
    },
  }),]
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

const { dispatch } = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

const persistor = persistStore(makeStore());

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

// Create a custom useDispatch hook with typed dispatch
const useDispatch = () => useAppDispatch<AppDispatch>();

export { dispatch, useSelector, useDispatch, persistor };