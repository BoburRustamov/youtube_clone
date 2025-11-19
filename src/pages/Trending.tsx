import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getVideos } from '../features/videos/videosSlice';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';

const Trending = () => {
  const dispatch = useAppDispatch();
  const { videos, loading } = useAppSelector((state) => state.videos);

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  const formatViews = (views: string) => {
    const num = parseInt(views);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months ago`;
    return `${Math.floor(seconds / 31536000)} years ago`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-youtube-red"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold dark:text-white mb-6">Trending</h1>

        {/* Trending Videos List */}
        <div className="space-y-4">
          {videos.map((video, index) => (
            <Link
              key={video.id}
              to={`/watch/${video.id}`}
              className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-youtube-darkSurface rounded-xl transition-colors group"
            >
              {/* Rank Number */}
              <div className="hidden md:flex items-start justify-center w-12">
                <span className="text-3xl font-bold text-gray-300 dark:text-gray-600">
                  {index + 1}
                </span>
              </div>

              {/* Thumbnail */}
              <div className="relative w-full md:w-60 flex-shrink-0">
                <div className="aspect-video bg-gray-200 dark:bg-youtube-darkBorder rounded-xl overflow-hidden">
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                    10:23
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold dark:text-white line-clamp-2 mb-2">
                  {video.snippet.title}
                </h2>

                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {video.snippet.channelTitle.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    {video.snippet.channelTitle}
                    <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </p>
                </div>

                {video.statistics && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span>{formatViews(video.statistics.viewCount)} views</span>
                    <span>•</span>
                    <span>{getTimeAgo(video.snippet.publishedAt)}</span>
                  </div>
                )}

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {video.snippet.description}
                </p>
              </div>

              {/* Three-dot Menu */}
              <div className="flex-shrink-0">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Trending;
