import { useState, useRef, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { searchForVideos, getVideos, setSearchQuery } from '../../features/videos/videosSlice';

const FilterChips = () => {
  const [selectedChip, setSelectedChip] = useState('All');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const chips = [
    'All',
    'Music',
    'Gaming',
    'Live',
    'News',
    'Sports',
    'Learning',
    'Fashion',
    'Beauty',
    'Comedy',
    'Entertainment',
    'Tech',
    'Science',
    'Movies',
    'Anime',
    'Cooking',
    'Travel',
    'DIY',
  ];

  const handleChipClick = (chip: string) => {
    setSelectedChip(chip);

    if (chip === 'All') {
      // Load all trending videos
      dispatch(setSearchQuery(''));
      dispatch(getVideos());
    } else {
      // Search for videos in that category
      dispatch(setSearchQuery(chip));
      dispatch(searchForVideos(chip));
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    handleScroll();
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-14 z-30 bg-white dark:bg-youtube-dark border-b border-gray-200 dark:border-youtube-darkBorder">
      <div className="relative flex items-center">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 z-10 h-full px-2 bg-gradient-to-r from-white dark:from-youtube-dark to-transparent"
          >
            <div className="p-2 bg-white dark:bg-youtube-darkSurface hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full">
              <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
        )}

        {/* Chips Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide py-3 px-4 space-x-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChipClick(chip)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedChip === chip
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-100 dark:bg-youtube-darkBorder text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-youtube-darkHover'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 z-10 h-full px-2 bg-gradient-to-l from-white dark:from-youtube-dark to-transparent"
          >
            <div className="p-2 bg-white dark:bg-youtube-darkSurface hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full">
              <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;
