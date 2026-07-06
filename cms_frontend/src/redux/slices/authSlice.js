import { createSlice } from "@reduxjs/toolkit";

const savedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = savedAuth
    ? {
        isLoggedIn: true,
        token: savedAuth.token,
        userId: savedAuth.userId,
        firstName: savedAuth.firstName,
        role: savedAuth.role
    }
    : {
        isLoggedIn: false,
        token: null,
        userId: null,
        firstName: "",
        role: ""
    };

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        loginSuccess(state, action) {

            state.isLoggedIn = true;

            state.token = action.payload.token;

            state.userId = action.payload.userId;

            state.firstName = action.payload.firstName;

            state.role = action.payload.role;

        },

        logout(state) {

            state.isLoggedIn = false;

            state.token = null;

            state.userId = null;

            state.firstName = "";

            state.role = "";

        }

    }

});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;