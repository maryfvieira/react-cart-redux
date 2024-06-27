import { I_UserPublic, T_UserRole, UserState } from "@/global";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  data: {} as I_UserPublic,
  isLoading: false,
  isLogged: false,
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
      },
      setUser: (state, action: PayloadAction<I_UserPublic>) => {
        state.isLoading = true;
        
        if(action.payload!=null){
            state.data=action.payload;
            state.isLogged = true;
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
      }
    }
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