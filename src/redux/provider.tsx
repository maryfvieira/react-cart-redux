"use client";
import { useRef } from 'react';
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import {PersistGate} from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Loading from "@components/Loading";

export function Providers({ children }: { children: React.ReactNode }) {

  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  const persistor = persistStore(storeRef.current);

  return <Provider store={storeRef.current}>
            <PersistGate loading={<Loading />} persistor={persistor}>
              {children}
            </PersistGate>
         </Provider>;
}