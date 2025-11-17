import axios from 'axios';
import type { Video } from '../types';

// You'll need to get this from https://console.cloud.google.com/
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideos = async (): Promise<Video[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        maxResults: 24,
        regionCode: 'US',
        key: API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

export const fetchVideoById = async (videoId: string): Promise<Video> => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics',
        id: videoId,
        key: API_KEY,
      },
    });
    return response.data.items[0];
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

export const searchVideos = async (query: string): Promise<Video[]> => {
  try {
    const searchResponse = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        maxResults: 24,
        type: 'video',
        key: API_KEY,
      },
    });

    const videoIds = searchResponse.data.items.map((item: any) => item.id.videoId).join(',');

    const videosResponse = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics',
        id: videoIds,
        key: API_KEY,
      },
    });

    return videosResponse.data.items;
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error;
  }
};

export const fetchShorts = async (): Promise<Video[]> => {
  try {
    // Search for shorts (vertical videos)
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: 'shorts',
        maxResults: 20,
        type: 'video',
        videoDuration: 'short', // Videos under 4 minutes
        key: API_KEY,
      },
    });

    const videoIds = response.data.items.map((item: any) => item.id.videoId).join(',');

    const videosResponse = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics',
        id: videoIds,
        key: API_KEY,
      },
    });

    return videosResponse.data.items;
  } catch (error) {
    console.error('Error fetching shorts:', error);
    throw error;
  }
};
