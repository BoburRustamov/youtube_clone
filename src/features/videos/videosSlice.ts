import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Video } from '../../types';
import { fetchVideos, fetchVideoById, searchVideos } from '../../services/youtubeApi';

interface VideosState {
  videos: Video[];
  currentVideo: Video | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: VideosState = {
  videos: [],
  currentVideo: null,
  loading: false,
  error: null,
  searchQuery: '',
};

export const getVideos = createAsyncThunk(
  'videos/getVideos',
  async () => {
    const response = await fetchVideos();
    return response;
  }
);

export const getVideoById = createAsyncThunk(
  'videos/getVideoById',
  async (videoId: string) => {
    const response = await fetchVideoById(videoId);
    return response;
  }
);

export const searchForVideos = createAsyncThunk(
  'videos/search',
  async (query: string) => {
    const response = await searchVideos(query);
    return response;
  }
);

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearCurrentVideo: (state) => {
      state.currentVideo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch videos';
      })
      .addCase(getVideoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVideo = action.payload;
      })
      .addCase(getVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch video';
      })
      .addCase(searchForVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchForVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(searchForVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Search failed';
      });
  },
});

export const { setSearchQuery, clearCurrentVideo } = videosSlice.actions;
export default videosSlice.reducer;
