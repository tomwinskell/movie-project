import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
const isServer = typeof window === 'undefined';
const config = {
  headers: {
    Authorization: `Bearer ${!isServer ? localStorage.getItem('token') : ''}`,
  },
};

// Async thunks
export const addMovieToWatchList = createAsyncThunk(
  'watchlist/addMovie',
  async (movie, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/watchlist`,
        { movie },
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchWatchListMovies = createAsyncThunk(
  'watchlist/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/watchlist`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeMovieFromWatchList = createAsyncThunk(
  'watchlist/removeMovie',
  async (movie, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/watchlist`,
        { movie },
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    movies: [],
    count: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchListMovies.fulfilled, (state, action) => {
        state.movies = action.payload.movies;
        state.count = action.payload.watchListCount;
      })
      .addCase(addMovieToWatchList.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchWatchListMovies.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeMovieFromWatchList.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default watchlistSlice.reducer;
