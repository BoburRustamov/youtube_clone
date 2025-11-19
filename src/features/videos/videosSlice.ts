import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Video } from '../../types';
import { fetchVideos, fetchVideoById, searchVideos } from '../../services/youtubeApi';

interface VideosState {
  videos: Video[];
  currentVideo: Video | null;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  searchQuery: string;
  hasMore: boolean;
  nextPageToken: string | null;
}

const initialState: VideosState = {
  videos: [],
  currentVideo: null,
  loading: false,
  loadingMore: false,
  error: null,
  searchQuery: '',
  hasMore: true,
  nextPageToken: null,
};

export const getVideos = createAsyncThunk(
  'videos/getVideos',
  async () => {
    const response = await fetchVideos();
    return response;
  }
);

export const loadMoreVideos = createAsyncThunk(
  'videos/loadMore',
  async (_, { getState }) => {
    const state = getState() as { videos: VideosState };
    const pageToken = state.videos.nextPageToken;
    const response = await fetchVideos(pageToken || undefined);
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
        state.videos = action.payload.videos;
        state.nextPageToken = action.payload.nextPageToken || null;
        state.hasMore = !!action.payload.nextPageToken;
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch videos';
      })
      .addCase(loadMoreVideos.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(loadMoreVideos.fulfilled, (state, action) => {
        state.loadingMore = false;
        // Append new videos to existing ones
        state.videos = [...state.videos, ...action.payload.videos];
        state.nextPageToken = action.payload.nextPageToken || null;
        state.hasMore = !!action.payload.nextPageToken;
      })
      .addCase(loadMoreVideos.rejected, (state, action) => {
        state.loadingMore = false;
        state.error = action.error.message || 'Failed to load more videos';
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
        state.hasMore = false; // Disable infinite scroll on search
      })
      .addCase(searchForVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Search failed';
      });
  },
});

export const { setSearchQuery, clearCurrentVideo } = videosSlice.actions;
export default videosSlice.reducer;
