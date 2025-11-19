import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getVideos } from '../features/videos/videosSlice';
import VideoCard from '../components/common/VideoCard';
import Layout from '../components/layout/Layout';

const Channel = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const dispatch = useAppDispatch();
  const { videos, loading } = useAppSelector((state) => state.videos);
  const [activeTab, setActiveTab] = useState<'home' | 'videos' | 'shorts' | 'playlists' | 'about'>('home');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  if (loading) {
    return (
      <Layout showSidebar={false}>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-youtube-red"></div>
        </div>
      </Layout>
    );
  }

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const channelName = channelId?.replace(/-/g, ' ') || 'Channel Name';
  const subscriberCount = 2547893;
  const videoCount = 342;

  return (
    <Layout showSidebar={false}>
      {/* Channel Banner */}
      <div className="w-full h-32 md:h-48 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>

      {/* Channel Info */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 py-6">
          {/* Channel Avatar */}
          <div className="w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-4xl md:text-6xl border-4 border-white dark:border-youtube-dark -mt-12 md:-mt-16">
            {channelName.charAt(0).toUpperCase()}
          </div>

          {/* Channel Details */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold dark:text-white flex items-center">
              {channelName.charAt(0).toUpperCase() + channelName.slice(1)}
              <svg className="w-5 h-5 md:w-6 md:h-6 ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </h1>
            <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>@{channelName.replace(/ /g, '').toLowerCase()}</span>
              <span>•</span>
              <span>{formatCount(subscriberCount)} subscribers</span>
              <span>•</span>
              <span>{videoCount} videos</span>
            </div>
            <p className="mt-2 text-sm dark:text-gray-300">
              Welcome to our channel! We create amazing content for you. Subscribe to stay updated with our latest videos.
            </p>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={() => setIsSubscribed(!isSubscribed)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
              isSubscribed
                ? 'bg-gray-100 dark:bg-youtube-darkBorder text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-youtube-darkHover'
                : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
            }`}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>

        {/* Channel Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-youtube-darkBorder">
          <nav className="flex space-x-8">
            {['home', 'videos', 'shorts', 'playlists', 'about'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-3 text-sm font-medium uppercase transition-colors relative ${
                  activeTab === tab
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'home' && (
            <div className="space-y-8">
              {/* Featured Video */}
              <div>
                <h2 className="text-xl font-semibold dark:text-white mb-4">Featured</h2>
                {videos[0] && (
                  <div className="max-w-4xl">
                    <VideoCard video={videos[0]} />
                  </div>
                )}
              </div>

              {/* Popular Videos */}
              <div>
                <h2 className="text-xl font-semibold dark:text-white mb-4">Popular videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                  {videos.slice(0, 4).map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold dark:text-white">Uploads</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-lg">
                    <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'shorts' && (
            <div>
              <h2 className="text-xl font-semibold dark:text-white mb-6">Shorts</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {videos.slice(0, 12).map((video) => (
                  <div key={video.id} className="cursor-pointer group">
                    <div className="relative aspect-[9/16] bg-gray-200 dark:bg-youtube-darkSurface rounded-xl overflow-hidden">
                      <img
                        src={video.snippet.thumbnails.high.url}
                        alt={video.snippet.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-xs font-semibold">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        <span>2.3M</span>
                      </div>
                    </div>
                    <h3 className="mt-2 text-sm font-medium dark:text-white line-clamp-2">
                      {video.snippet.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'playlists' && (
            <div>
              <h2 className="text-xl font-semibold dark:text-white mb-6">Created playlists</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="cursor-pointer group">
                    <div className="relative aspect-video bg-gray-200 dark:bg-youtube-darkSurface rounded-xl overflow-hidden mb-3">
                      {videos[index] && (
                        <img
                          src={videos[index].snippet.thumbnails.high.url}
                          alt="Playlist"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-white mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                        </svg>
                        <span className="text-white font-semibold">{Math.floor(Math.random() * 50) + 10} videos</span>
                      </div>
                    </div>
                    <h3 className="font-semibold dark:text-white">Playlist {index + 1}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View full playlist</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="max-w-4xl">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold dark:text-white mb-4">Description</h2>
                  <p className="text-sm dark:text-gray-300 leading-relaxed">
                    Welcome to our channel! We create high-quality content covering various topics including technology, gaming, music, and entertainment. Our goal is to provide valuable and engaging content for our viewers.
                    <br /><br />
                    Subscribe to stay updated with our latest videos and join our growing community!
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold dark:text-white mb-3">Channel details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>For business inquiries: business@channel.com</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span>{formatCount(subscriberCount)} subscribers</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>{videoCount} videos</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Joined Jan 15, 2020</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold dark:text-white mb-3">Links</h3>
                  <div className="flex flex-wrap gap-3">
                    <a href="#" className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-youtube-darkSurface hover:bg-gray-200 dark:hover:bg-youtube-darkHover rounded-full transition-colors">
                      <svg className="w-5 h-5 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                      <span className="dark:text-white">Facebook</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-youtube-darkSurface hover:bg-gray-200 dark:hover:bg-youtube-darkHover rounded-full transition-colors">
                      <svg className="w-5 h-5 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                      </svg>
                      <span className="dark:text-white">Twitter</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-youtube-darkSurface hover:bg-gray-200 dark:hover:bg-youtube-darkHover rounded-full transition-colors">
                      <svg className="w-5 h-5 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.411 2.865 8.14 6.839 9.458.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.137 22 16.41 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                      <span className="dark:text-white">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Channel;
