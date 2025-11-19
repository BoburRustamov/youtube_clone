import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Video } from '../../types';

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovering(false);
  };

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

  const getDuration = () => {
    // Mock duration - in real app, this would come from video data
    const durations = ['4:23', '10:15', '5:42', '12:30', '8:19', '15:45'];
    return durations[Math.floor(Math.random() * durations.length)];
  };

  return (
    <div
      className="cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/watch/${video.id}`}>
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-200 dark:bg-youtube-darkSurface rounded-xl overflow-hidden">
          {isHovering ? (
            <iframe
              ref={videoRef}
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&modestbranding=1`}
              className="w-full h-full"
              allow="autoplay"
              title={video.snippet.title}
            />
          ) : (
            <>
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                {getDuration()}
              </div>
            </>
          )}
        </div>

        {/* Video Info */}
        <div className="flex mt-3 space-x-3">
          {/* Channel Avatar */}
          <div className="flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {video.snippet.channelTitle.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Video Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-2 text-gray-900 dark:text-white mb-1">
              {video.snippet.title}
            </h3>

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
              <p className="hover:text-gray-900 dark:hover:text-white">
                {video.snippet.channelTitle}
              </p>
              {/* Verified Badge */}
              <svg className="w-3.5 h-3.5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>

            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              {video.statistics && (
                <>
                  <span>{formatViews(video.statistics.viewCount)} views</span>
                  <span>•</span>
                </>
              )}
              <span>{getTimeAgo(video.snippet.publishedAt)}</span>
            </div>
          </div>

          {/* Three-dot Menu */}
          <div className="relative flex-shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowMenu(!showMenu);
              }}
              className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full transition-opacity"
            >
              <svg className="w-5 h-5 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-youtube-darkSurface rounded-lg shadow-2xl border dark:border-youtube-darkBorder overflow-hidden z-50">
                <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-youtube-darkHover text-left">
                  <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-sm dark:text-white">Add to queue</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-youtube-darkHover text-left">
                  <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm dark:text-white">Save to Watch later</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-youtube-darkHover text-left">
                  <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className="text-sm dark:text-white">Save to playlist</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-youtube-darkHover text-left">
                  <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="text-sm dark:text-white">Share</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-youtube-darkHover text-left">
                  <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm dark:text-white">Not interested</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-youtube-darkHover text-left">
                  <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  <span className="text-sm dark:text-white">Don't recommend channel</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-youtube-darkHover text-left">
                  <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                  <span className="text-sm dark:text-white">Report</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
