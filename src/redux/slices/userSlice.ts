import { I_UserPublic, T_UserRole, UserState } from "@/global";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setCookie, deleteCookie } from 'cookies-next';
import authConfig from "@config/authConfig";
import { PURGE } from "redux-persist";


const initialState: UserState = {
  data: {} as I_UserPublic,
  isLoading: false,
  isLogged: false,
  token: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      clearUser: state => {
        state.isLoading = true;
        state.data={} as I_UserPublic
        state.isLoading = false;
        state.isLogged = false;
        state.token = "";
        deleteCookie(authConfig.jwtTokenName);
        state.isLoading = false;
      },
      setUser: (state, action) => {
        state.isLoading = true;
        
        if(action.payload!=null){
          const {token, data} = action.payload;
            state.data=data;
            state.token = token;
            state.isLogged = true;
            setCookie(authConfig.jwtTokenName, token);
        }
        state.isLoading = false;
        
      },
      setRole: (state, action: PayloadAction<T_UserRole>) =>{
        state.isLoading = true;
        state.data.role=action.payload
        state.isLoading = false;
      },
      setAvatar: (state, action: PayloadAction<string>) =>{
        state.isLoading = true;
        state.data.avatar=action.payload
        state.isLoading = false;
      },
      setFirstName: (state, action: PayloadAction<string>) =>{
        state.isLoading = true;
        state.data.firstName=action.payload
        state.isLoading = false;
      },
      setLastName: (state, action: PayloadAction<string>) =>{
        state.isLoading = true;
        state.data.lastName=action.payload
        state.isLoading = false;
      },
      setUpdateDate:(state, action: PayloadAction<Date>) =>{
        state.isLoading = true;
        state.data.updatedAt=action.payload
        state.isLoading = false;
      },
      refreshToken:(state,action:PayloadAction<string>) => {
        state.token = action.payload;
        setCookie(authConfig.jwtTokenName, action.payload);
      }
    }
    ,
  // extraReducers: (builder) => {
  //   builder.addCase(PURGE, (state) => {
  //     storage.removeItem("persist:root");
  //   });
  // },
});

export const {
    clearUser,
    setUser,
    setRole,
    setAvatar,
    setFirstName,
    setLastName,
    setUpdateDate
    
  } = userSlice.actions;
  
  export default userSlice.reducer;