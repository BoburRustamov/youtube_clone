import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Video } from '../../types';

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleMouseEnter = () => {
    // Delay autoplay slightly to prevent accidental triggers
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

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/watch/${video.id}`}>
        <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
          {isHovering ? (
            <iframe
              ref={videoRef}
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&modestbranding=1`}
              className="w-full h-full"
              allow="autoplay"
              title={video.snippet.title}
            />
          ) : (
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="mt-3">
          <h3 className="font-medium text-sm line-clamp-2 text-gray-900">
            {video.snippet.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {video.snippet.channelTitle}
          </p>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            {video.statistics && (
              <>
                <span>{formatViews(video.statistics.viewCount)} views</span>
                <span>•</span>
              </>
            )}
            <span>{getTimeAgo(video.snippet.publishedAt)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
