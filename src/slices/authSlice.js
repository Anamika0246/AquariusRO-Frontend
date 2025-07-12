import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

// Check if token is valid and fetch user data
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return null;

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, userData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed';
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
