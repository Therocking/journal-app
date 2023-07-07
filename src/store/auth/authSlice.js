import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // cheking, no-authenticated, authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
},
reducers: {
    login: (state, { payload } ) => {
        state.status = 'authenticated'; // cheking; no-authenticated; authenticated
        state.uid = payload.uid;
        state.email = payload.email;
        state.displayName = payload.displayName;
        state.photoURL = payload.photoURL;
        state.errorMessage = null;
    },
    logout: (state, { payload } ) => {
        state.status = 'no-authenticated'; // cheking; no-authenticated; authenticated
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
        state.errorMessage = payload?.errorMessage;
    },
    chekingCredencials: (state) => {
        state.status = 'checking'
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
        state.errorMessage = null;
    },
},
});
export const { login, logout, chekingCredencials } = authSlice.actions;