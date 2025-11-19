import { useEffect, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadMoreSearchResults } from '../features/videos/videosSlice';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const dispatch = useAppDispatch();
  const { videos, loading, loadingMore, error, searchQuery, hasMore } = useAppSelector((state) => state.videos);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastVideoRef = useRef<HTMLDivElement | null>(null);

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

  // Infinite scroll implementation
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && !loadingMore && hasMore) {
      dispatch(loadMoreSearchResults());
    }
  }, [dispatch, loading, loadingMore, hasMore]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '200px',
      threshold: 0.1,
    });

    if (lastVideoRef.current) {
      observerRef.current.observe(lastVideoRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, videos]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-youtube-red"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-8">
          <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-300">Error: {error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-6xl">
        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Search results for "<span className="font-medium">{searchQuery}</span>"
            </p>
          </div>
        )}

        {/* Search Results List - YouTube style horizontal layout */}
        <div className="space-y-4">
          {videos.map((video, index) => (
            <div
              key={`${video.id}-${index}`}
              ref={index === videos.length - 1 ? lastVideoRef : null}
            >
              <Link
                to={`/watch/${video.id}`}
                className="flex flex-col md:flex-row gap-4 hover:bg-gray-50 dark:hover:bg-youtube-darkSurface p-2 rounded-xl transition-colors group"
              >
              {/* Thumbnail */}
              <div className="relative w-full md:w-96 flex-shrink-0">
                <div className="aspect-video bg-gray-200 dark:bg-youtube-darkBorder rounded-xl overflow-hidden">
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                    {Math.floor(Math.random() * 15) + 1}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Video Details */}
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-2 mb-2">
                  {video.snippet.title}
                </h3>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {video.statistics && (
                    <>
                      <span>{formatViews(video.statistics.viewCount)} views</span>
                      <span className="mx-1">•</span>
                    </>
                  )}
                  <span>{getTimeAgo(video.snippet.publishedAt)}</span>
                </div>

                {/* Channel Info */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {video.snippet.channelTitle.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                    {video.snippet.channelTitle}
                    <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {video.snippet.description}
                </p>
              </div>

              {/* Three-dot Menu */}
              <div className="flex-shrink-0 md:self-start">
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-youtube-darkHover rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </button>
              </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Loading more indicator */}
        {loadingMore && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-youtube-red"></div>
          </div>
        )}

        {/* End of content message */}
        {!hasMore && videos.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              You've reached the end of search results
            </p>
          </div>
        )}

        {/* No Results */}
        {videos.length === 0 && !loading && (
          <div className="text-center py-12">
            <svg className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try different keywords or remove search filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
