

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: null,
    email: null,
    user_id: null,
    token: null,
    isAdmin: false,
    profile_image: null,
    mobile:null
  
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, email, user_id, token, isAdmin ,profile_image ,mobile} = action.payload;
      state.user = {
        name: name || null,
        email: email || null,
        user_id: user_id || null,
        token: token || null,
        isAdmin: isAdmin || false,
        profile_image: profile_image || null,
        mobile:mobile || null
      };
    },
    logout: (state) => {
      state.user = {
        name: null,
        email: null,
        user_id: null,
        token: null,
        isAdmin: false,
        profile_image: null,
      };
      
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = {
          ...profile_image,
          ...action.payload,
        };
      }
    },
 
  },
});

export const { setUser, logout ,updateUserProfile ,} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.user.token;
export const selectIsAdmin = (state) => state.user.user.isAdmin;
export const selectUserId = (state) => state.user.user.user_id;

export default userSlice.reducer;
