import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getVideoById, getVideos } from '../features/videos/videosSlice';
import Layout from '../components/layout/Layout';
import VideoCard from '../components/common/VideoCard';
import Comments from '../components/common/Comments';

const Watch = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const dispatch = useAppDispatch();
  const { currentVideo, videos, loading } = useAppSelector((state) => state.videos);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById(videoId));
      dispatch(getVideos());
      window.scrollTo(0, 0);
    }
  }, [videoId, dispatch]);

  if (loading || !currentVideo) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-youtube-red"></div>
        </div>
      </Layout>
    );
  }

  const formatViews = (views: string) => {
    const num = parseInt(views);
    return num.toLocaleString();
  };

  const formatCount = (count: string) => {
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <div className="p-6 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={currentVideo.snippet.title}
              />
            </div>

            {/* Video Title */}
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
              {currentVideo.snippet.title}
            </h1>

            {/* Video Actions */}
            <div className="flex items-center justify-between mt-4 pb-3 border-b dark:border-youtube-darkBorder">
              <div className="flex items-center space-x-4">
                {/* Channel Info */}
                <Link to={`/channel/${currentVideo.snippet.channelId}`} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {currentVideo.snippet.channelTitle.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-sm dark:text-white flex items-center">
                      {currentVideo.snippet.channelTitle}
                      <svg className="w-3.5 h-3.5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">2.5M subscribers</p>
                  </div>
                </Link>

                {/* Subscribe Button */}
                <button
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isSubscribed
                      ? 'bg-gray-100 dark:bg-youtube-darkBorder text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-youtube-darkHover'
                      : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                  }`}
                >
                  {isSubscribed ? (
                    <span className="flex items-center space-x-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                      <span>Subscribed</span>
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* Like/Dislike */}
                <div className="flex items-center bg-gray-100 dark:bg-youtube-darkBorder rounded-full overflow-hidden">
                  <button
                    onClick={() => {
                      setIsLiked(!isLiked);
                      if (isDisliked) setIsDisliked(false);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-youtube-darkHover transition-colors ${
                      isLiked ? 'text-blue-600' : 'dark:text-white'
                    }`}
                  >
                    <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    {currentVideo.statistics && (
                      <span className="text-sm font-medium">
                        {formatCount(currentVideo.statistics.likeCount)}
                      </span>
                    )}
                  </button>
                  <div className="w-px h-6 bg-gray-300 dark:bg-youtube-darkHover"></div>
                  <button
                    onClick={() => {
                      setIsDisliked(!isDisliked);
                      if (isLiked) setIsLiked(false);
                    }}
                    className={`px-4 py-2 hover:bg-gray-200 dark:hover:bg-youtube-darkHover transition-colors ${
                      isDisliked ? 'text-blue-600' : 'dark:text-white'
                    }`}
                  >
                    <svg className="w-5 h-5" fill={isDisliked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>
                  </button>
                </div>

                {/* Share */}
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-youtube-darkBorder hover:bg-gray-200 dark:hover:bg-youtube-darkHover rounded-full transition-colors">
                  <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="text-sm font-medium dark:text-white">Share</span>
                </button>

                {/* Download */}
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-youtube-darkBorder hover:bg-gray-200 dark:hover:bg-youtube-darkHover rounded-full transition-colors">
                  <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="text-sm font-medium dark:text-white">Download</span>
                </button>

                {/* Save */}
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-youtube-darkBorder hover:bg-gray-200 dark:hover:bg-youtube-darkHover rounded-full transition-colors">
                  <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className="text-sm font-medium dark:text-white">Save</span>
                </button>

                {/* More */}
                <button className="p-2 bg-gray-100 dark:bg-youtube-darkBorder hover:bg-gray-200 dark:hover:bg-youtube-darkHover rounded-full transition-colors">
                  <svg className="w-5 h-5 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 p-4 bg-gray-100 dark:bg-youtube-darkSurface rounded-xl">
              <div className="flex items-center space-x-4 text-sm font-medium dark:text-white mb-2">
                {currentVideo.statistics && (
                  <span>{formatViews(currentVideo.statistics.viewCount)} views</span>
                )}
                <span>{formatDate(currentVideo.snippet.publishedAt)}</span>
              </div>
              <div className={`text-sm dark:text-white ${showFullDescription ? '' : 'line-clamp-3'}`}>
                {currentVideo.snippet.description}
              </div>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-sm font-medium mt-2 dark:text-white hover:underline"
              >
                {showFullDescription ? 'Show less' : 'Show more'}
              </button>
            </div>

            {/* Comments Section */}
            <Comments videoId={currentVideo.id} />
          </div>

          {/* Related Videos Sidebar */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 mb-4">
              <button className="px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg">
                All
              </button>
              <button className="px-3 py-1.5 bg-gray-100 dark:bg-youtube-darkBorder text-gray-900 dark:text-white text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-youtube-darkHover">
                From {currentVideo.snippet.channelTitle}
              </button>
            </div>
            {videos.slice(0, 20).map((video) => (
              <div key={video.id} className="flex space-x-2 cursor-pointer group">
                <Link to={`/watch/${video.id}`} className="flex space-x-2 w-full">
                  {/* Thumbnail */}
                  <div className="relative w-40 flex-shrink-0">
                    <div className="aspect-video bg-gray-200 dark:bg-youtube-darkSurface rounded-lg overflow-hidden">
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs font-semibold px-1 py-0.5 rounded">
                        10:23
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-2 text-gray-900 dark:text-white mb-1">
                      {video.snippet.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {video.snippet.channelTitle}
                    </p>
                    {video.statistics && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {formatCount(video.statistics.viewCount)} views
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Watch;
