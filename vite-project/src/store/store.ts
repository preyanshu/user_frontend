
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice';
import teamUsersReducer from './teamUsersSlice'; 

const store = configureStore({
  reducer: {
    users: usersReducer,
    teamUsers: teamUsersReducer, 
  },
});

export default store;
