import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getVideos } from '../features/videos/videosSlice';
import VideoCard from '../components/common/VideoCard';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';

const Library = () => {
  const dispatch = useAppDispatch();
  const { videos, loading } = useAppSelector((state) => state.videos);

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

  const librarySection = [
    { icon: 'history', label: 'History', path: '/history', count: 234 },
    { icon: 'clock', label: 'Watch Later', path: '/watch-later', count: 12 },
    { icon: 'like', label: 'Liked videos', path: '/liked', count: 89 },
  ];

  const playlists = [
    { name: 'My Favorites', count: 45, thumbnail: '' },
    { name: 'Watch Later', count: 12, thumbnail: '' },
    { name: 'Music', count: 67, thumbnail: '' },
    { name: 'Gaming', count: 23, thumbnail: '' },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold dark:text-white mb-8">Library</h1>

        {/* Quick Access Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {librarySection.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-youtube-darkSurface hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-xl transition-colors group"
            >
              <div className="w-12 h-12 bg-gray-200 dark:bg-youtube-darkBorder rounded-full flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-youtube-darkHover transition-colors">
                {item.icon === 'history' && (
                  <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {item.icon === 'clock' && (
                  <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {item.icon === 'like' && (
                  <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-semibold dark:text-white">{item.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.count} videos</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Playlists Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold dark:text-white">Playlists</h2>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New playlist</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {playlists.map((playlist, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-video bg-gradient-to-br from-gray-300 to-gray-400 dark:from-youtube-darkBorder dark:to-youtube-darkSurface rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                  {videos[index] && (
                    <img
                      src={videos[index].snippet.thumbnails.high.url}
                      alt={playlist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                    <svg className="w-12 h-12 text-white mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                    </svg>
                    <span className="text-white font-semibold">{playlist.count} videos</span>
                  </div>
                </div>
                <h3 className="font-semibold dark:text-white">{playlist.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View full playlist</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Videos */}
        <div>
          <h2 className="text-2xl font-bold dark:text-white mb-6">Recent videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            {videos.slice(0, 8).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Library;
