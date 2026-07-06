import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    id: null,
    firstName: "",
    lastName: "",
    email: ""

};

const userSlice = createSlice({

    name: "user",

    initialState,

    reducers: {

        setUser(state, action) {

            return action.payload;

        },

        clearUser() {

            return initialState;

        }

    }

});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;