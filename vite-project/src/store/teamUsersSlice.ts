import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface TeamUsersState {
  teamUsers: any[]; // Change this to the actual type of your team users
  loading: boolean;
  error: string | null;
}

const initialState: TeamUsersState = {
  teamUsers: [],
  loading: false,
  error: null,
};

export const fetchAllUsers = createAsyncThunk(
  'teamUsers/fetchAllUsers',
  async () => {
    try {
      const response = await fetch('http://localhost:5000/api/team/get/all');
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

export const createTeam = createAsyncThunk(
  'teamUsers/createTeam',
  async (teamData: any) => {
    try {
      const response = await fetch('http://localhost:5000/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });
      if (!response.ok) {
        throw new Error('Failed to create team');
      }
      const data = await response.json();
      return data;
    } catch (error:any) {
      throw error.message;
    }
  }
);

const teamUsersSlice = createSlice({
  name: 'teamUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.teamUsers = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching users';
      })
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.teamUsers.push(action.payload);
        state.loading = false;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error creating team';
      });
  },
});

export default teamUsersSlice.reducer;