import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userType: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoggedIn = true;
    },
    logOut: state => {
      state.isLoggedIn = false;
      state.userType = '';
    },
    setDetails: (state, data) => {
      if (data.payload.type === 'userType') {
        state.userType = data.payload.value;
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const { logIn, logOut, setDetails } = authSlice.actions;

export default authSlice.reducer;
