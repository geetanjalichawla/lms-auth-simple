import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  {
    user:{},
isAuthenticated : true

  },
  {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      localStorage.setItem("isAuth", true);
      state.user = action.payload.token.original.home_chef;
      state.token = action.payload.token.original.token;
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.token.original.home_chef)
      );
      console.log(action.payload.token.original);
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload.token.original.access_token)
      );
      state.message = action.payload.status;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("isAuth");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      if (action.payload)
        state.error =
          action.payload.error ||
          action.payload.password ||
          action.payload.email ||
          "something went wrong";
      else state.error = "something went wrong";
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },

    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },

    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      localStorage.removeItem("isAuth");
    },
    logoutFail: (state, action) => {
      state.loading = false;
    },

    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.message = "successfully Registered";
      state.isAuthenticated = true;
      localStorage.setItem("isAuth", true);


    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error =
(        action.payload||
        "something went wrong");
        // debugger
        console.log(action.payload)
    },

    changeUserStatusRequest: (state) => {
      state.loading = true;
    },
    changeUserStatusSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.user = {
        ...state.user,
        close_store :state.user.close_store === 1 ? 0 : 1
      }
    },
    changeUserStatusFail: (state, action) => {
      state.loading = false;
      state.error = "something went wrong"
    },
    setError : (state, action) =>{
      state.error = action.payload

    },
    setMessage : (state, action) =>{
      state.message = action.payload

    },
    updateUser:(state,action)=>{
      state.user = action.payload;
    
    }
  }
);