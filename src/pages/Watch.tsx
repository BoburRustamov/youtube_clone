import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getVideoById, getVideos } from '../features/videos/videosSlice';
import Layout from '../components/layout/Layout';
import VideoCard from '../components/common/VideoCard';

const Watch = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const dispatch = useAppDispatch();
  const { currentVideo, videos, loading } = useAppSelector((state) => state.videos);

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById(videoId));
      dispatch(getVideos()); // Get related videos
    }
  }, [videoId, dispatch]);

  if (loading || !currentVideo) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </Layout>
    );
  }

  const formatViews = (views: string) => {
    const num = parseInt(views);
    return num.toLocaleString();
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
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={currentVideo.snippet.title}
              />
            </div>

            {/* Video Info */}
            <div className="mt-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {currentVideo.snippet.title}
              </h1>

              <div className="flex items-center justify-between mt-4 pb-4 border-b">
                <div>
                  <p className="font-medium text-gray-900">
                    {currentVideo.snippet.channelTitle}
                  </p>
                  {currentVideo.statistics && (
                    <p className="text-sm text-gray-600">
                      {formatViews(currentVideo.statistics.viewCount)} views •{' '}
                      {formatDate(currentVideo.snippet.publishedAt)}
                    </p>
                  )}
                </div>

                {currentVideo.statistics && (
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span className="text-sm font-medium">
                        {parseInt(currentVideo.statistics.likeCount).toLocaleString()}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-900 whitespace-pre-wrap">
                  {currentVideo.snippet.description}
                </p>
              </div>
            </div>
          </div>

          {/* Related Videos */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Related Videos</h2>
            {videos.slice(0, 10).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Watch;
