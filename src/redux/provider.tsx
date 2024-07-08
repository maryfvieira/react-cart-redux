"use client";
import { useRef } from 'react';
// import { Provider as ReduxProvider} from "react-redux";
// import { makeStore, AppStore } from "@redux/store";
// import {PersistGate} from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
import Loading from "@components/Loading";
import NextAuthSessionProvider from '@/providers/sessionProvider'

export function Providers({ children }: { children: React.ReactNode }) {

  // const storeRef = useRef<AppStore>()
  // if (!storeRef.current) {
  //   storeRef.current = makeStore()
  // }
  // const persistor = persistStore(storeRef.current);

  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
  // return <ReduxProvider store={storeRef.current}>
  //           <PersistGate loading={<Loading />} persistor={persistor}>
  //             <NextAuthSessionProvider>
  //               {children}
  //             </NextAuthSessionProvider>
  //           </PersistGate>
  //        </ReduxProvider>;
}