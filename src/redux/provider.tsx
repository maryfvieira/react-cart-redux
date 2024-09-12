"use client";
import { useRef } from 'react';
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@redux/store";
import {PersistGate} from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Loading from "@components/Loading";
import AuthWrapper from '@/sessionWrapper';
import CartReduxCleaner from '@components/CartReduxCleaner';

export function Providers({ children }: { children: React.ReactNode }) {

  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  const persistor = persistStore(storeRef.current);

  return <Provider store={storeRef.current}>
            <PersistGate loading={<Loading />} persistor={persistor}>
              <AuthWrapper>{children}</AuthWrapper>
              <CartReduxCleaner persistor={persistor} ></CartReduxCleaner>
            </PersistGate>
         </Provider>;
}