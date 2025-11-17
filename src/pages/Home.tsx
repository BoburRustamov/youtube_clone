import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getVideos } from '../features/videos/videosSlice';
import VideoCard from '../components/common/VideoCard';
import Layout from '../components/layout/Layout';

const Home = () => {
  const dispatch = useAppDispatch();
  const { videos, loading, error } = useAppSelector((state) => state.videos);

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error: {error}</p>
            <p className="text-sm text-red-600 mt-2">
              Make sure you have set up your YouTube API key in the .env file.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
