import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getShorts, nextShort, prevShort } from '../features/shorts/shortsSlice';
import Layout from '../components/layout/Layout';

const Shorts = () => {
  const dispatch = useAppDispatch();
  const { shorts, loading, error, currentIndex } = useAppSelector((state) => state.shorts);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getShorts());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, clientHeight } = containerRef.current;
      const scrolledIndex = Math.round(scrollTop / clientHeight);

      if (scrolledIndex !== currentIndex) {
        // Update current index based on scroll position
        if (scrolledIndex > currentIndex) {
          dispatch(nextShort());
        } else {
          dispatch(prevShort());
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentIndex, dispatch]);

  if (loading) {
    return (
      <Layout showSidebar={false}>
        <div className="flex items-center justify-center h-screen bg-black">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout showSidebar={false}>
        <div className="flex items-center justify-center h-screen bg-black">
          <p className="text-white">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showSidebar={false}>
      <div
        ref={containerRef}
        className="h-[calc(100vh-3.5rem)] overflow-y-scroll snap-y snap-mandatory bg-black"
        style={{ scrollbarWidth: 'none' }}
      >
        {shorts.map((short, index) => (
          <div
            key={short.id}
            className="h-[calc(100vh-3.5rem)] snap-start flex items-center justify-center relative"
          >
            <div className="max-w-md w-full h-full bg-black flex items-center justify-center">
              <iframe
                src={`https://www.youtube.com/embed/${short.id}?autoplay=${
                  index === currentIndex ? '1' : '0'
                }&mute=0&loop=1&playlist=${short.id}`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={short.snippet.title}
              />
            </div>

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
              <h3 className="font-semibold text-lg mb-1">{short.snippet.title}</h3>
              <p className="text-sm opacity-90">{short.snippet.channelTitle}</p>
            </div>

            {/* Navigation Arrows */}
            {index > 0 && (
              <button
                onClick={() => {
                  dispatch(prevShort());
                  containerRef.current?.scrollTo({
                    top: (currentIndex - 1) * containerRef.current.clientHeight,
                    behavior: 'smooth',
                  });
                }}
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}

            {index < shorts.length - 1 && (
              <button
                onClick={() => {
                  dispatch(nextShort());
                  containerRef.current?.scrollTo({
                    top: (currentIndex + 1) * containerRef.current.clientHeight,
                    behavior: 'smooth',
                  });
                }}
                className="absolute bottom-24 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Shorts;
