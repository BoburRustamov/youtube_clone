import { useEffect, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getVideos, loadMoreVideos } from '../features/videos/videosSlice';
import VideoCard from '../components/common/VideoCard';
import FilterChips from '../components/common/FilterChips';
import Layout from '../components/layout/Layout';

const Home = () => {
  const dispatch = useAppDispatch();
  const { videos, loading, loadingMore, error, hasMore } = useAppSelector((state) => state.videos);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastVideoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  // Infinite scroll implementation
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && !loadingMore && hasMore) {
      dispatch(loadMoreVideos());
    }
  }, [dispatch, loading, loadingMore, hasMore]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '200px', // Start loading 200px before reaching the bottom
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

  if (loading && videos.length === 0) {
    return (
      <Layout>
        <FilterChips />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-youtube-red"></div>
        </div>
      </Layout>
    );
  }

  if (error && videos.length === 0) {
    return (
      <Layout>
        <FilterChips />
        <div className="p-8">
          <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-300">Error: {error}</p>
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">
              Make sure you have set up your YouTube API key in the .env file.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <FilterChips />
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {videos.map((video, index) => (
            <div
              key={`${video.id}-${index}`}
              ref={index === videos.length - 1 ? lastVideoRef : null}
            >
              <VideoCard video={video} />
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
              You've reached the end
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
