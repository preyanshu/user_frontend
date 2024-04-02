// usersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
  domain: string;
  available: boolean;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// interface FilterOptions {
//   search?: string;
//   domain?: string;
//   gender?: string;
//   available?: boolean;
//   page: number;
//   limit: number;
// }

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (options: any) => {
    try {
      const queryParams = new URLSearchParams(options).toString();
      const response = await fetch(`https://users-backend-3yxi.onrender.com/api/users?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      return data;
    } catch (error:any) {
      throw error.message;
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers:builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching users';
      });
  },
});

export default usersSlice.reducer;
