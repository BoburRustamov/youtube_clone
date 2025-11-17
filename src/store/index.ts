import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import videosReducer from '../features/videos/videosSlice';
import shortsReducer from '../features/shorts/shortsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    videos: videosReducer,
    shorts: shortsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
