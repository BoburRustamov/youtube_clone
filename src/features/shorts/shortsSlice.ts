import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Video } from '../../types';
import { fetchShorts } from '../../services/youtubeApi';

interface ShortsState {
  shorts: Video[];
  loading: boolean;
  error: string | null;
  currentIndex: number;
}

const initialState: ShortsState = {
  shorts: [],
  loading: false,
  error: null,
  currentIndex: 0,
};

export const getShorts = createAsyncThunk(
  'shorts/getShorts',
  async () => {
    const response = await fetchShorts();
    return response;
  }
);

const shortsSlice = createSlice({
  name: 'shorts',
  initialState,
  reducers: {
    nextShort: (state) => {
      if (state.currentIndex < state.shorts.length - 1) {
        state.currentIndex += 1;
      }
    },
    prevShort: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShorts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShorts.fulfilled, (state, action) => {
        state.loading = false;
        state.shorts = action.payload;
      })
      .addCase(getShorts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch shorts';
      });
  },
});

export const { nextShort, prevShort, setCurrentIndex } = shortsSlice.actions;
export default shortsSlice.reducer;
