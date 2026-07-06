import { createSlice } from "@reduxjs/toolkit";

const initialState={

    notifications:[],

    unreadCount:0

};

const notificationSlice=createSlice({

    name:"notification",

    initialState,

    reducers:{}

});

export default notificationSlice.reducer;