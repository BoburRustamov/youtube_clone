import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getVideos } from '../features/videos/videosSlice';
import VideoCard from '../components/common/VideoCard';
import Layout from '../components/layout/Layout';

const Subscriptions = () => {
  const dispatch = useAppDispatch();
  const { videos, loading } = useAppSelector((state) => state.videos);

  const mockChannels = [
    { name: 'Tech Channel', avatar: 'T', color: 'from-blue-500 to-cyan-500' },
    { name: 'Music World', avatar: 'M', color: 'from-purple-500 to-pink-500' },
    { name: 'Gaming Hub', avatar: 'G', color: 'from-green-500 to-teal-500' },
    { name: 'News Daily', avatar: 'N', color: 'from-red-500 to-orange-500' },
    { name: 'Cooking Master', avatar: 'C', color: 'from-yellow-500 to-orange-500' },
    { name: 'Travel Vlogs', avatar: 'T', color: 'from-indigo-500 to-purple-500' },
  ];

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

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
      <div className="p-6">
        {/* Channels Row */}
        <div className="mb-8">
          <div className="flex items-center space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {/* All Channels */}
            <button className="flex flex-col items-center space-y-2 flex-shrink-0 group">
              <div className="w-20 h-20 bg-gray-200 dark:bg-youtube-darkBorder rounded-full flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-youtube-darkHover transition-colors">
                <svg className="w-8 h-8 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-xs font-medium dark:text-white">All</span>
            </button>

            {mockChannels.map((channel, index) => (
              <button key={index} className="flex flex-col items-center space-y-2 flex-shrink-0 group">
                <div className={`w-20 h-20 bg-gradient-to-br ${channel.color} rounded-full flex items-center justify-center text-white font-bold text-2xl ring-4 ring-transparent group-hover:ring-gray-200 dark:group-hover:ring-youtube-darkBorder transition-all`}>
                  {channel.avatar}
                </div>
                <span className="text-xs font-medium dark:text-white text-center max-w-[80px] truncate">
                  {channel.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Latest Videos Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold dark:text-white">Latest</h2>
            <button className="flex items-center space-x-2 px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-lg transition-colors">
              <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span className="text-sm font-medium dark:text-white">Manage</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Subscriptions;
