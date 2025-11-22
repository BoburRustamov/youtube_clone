/**
 * Generates a consistent duration string based on video ID
 * The same video ID will always return the same duration
 */
export const getVideoDuration = (videoId: string): string => {
  // Generate a hash from video ID for consistent duration
  let hash = 0;
  for (let i = 0; i < videoId.length; i++) {
    const char = videoId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Use absolute value to ensure positive number
  const absHash = Math.abs(hash);

  // Generate minutes (1-20) and seconds (0-59)
  const minutes = (absHash % 20) + 1;
  const seconds = absHash % 60;

  // Format as MM:SS
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Formats a duration string (e.g., "PT10M23S") to readable format (e.g., "10:23")
 * If duration is not provided, generates a consistent one based on video ID
 */
export const formatDuration = (duration: string | undefined, videoId: string): string => {
  if (!duration) {
    return getVideoDuration(videoId);
  }

  // Parse ISO 8601 duration format (PT10M23S)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) {
    return getVideoDuration(videoId);
  }

  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
