import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();

  const mainMenuItems = [
    { icon: 'home', label: 'Home', path: '/' },
    { icon: 'shorts', label: 'Shorts', path: '/shorts' },
    { icon: 'subscriptions', label: 'Subscriptions', path: '/subscriptions' },
  ];

  const libraryItems = [
    { icon: 'library', label: 'Library', path: '/library' },
    { icon: 'history', label: 'History', path: '/history' },
    { icon: 'videos', label: 'Your videos', path: '/your-videos' },
    { icon: 'clock', label: 'Watch Later', path: '/watch-later' },
    { icon: 'like', label: 'Liked videos', path: '/liked' },
  ];

  const exploreItems = [
    { icon: 'trending', label: 'Trending', path: '/trending' },
    { icon: 'music', label: 'Music', path: '/music' },
    { icon: 'gaming', label: 'Gaming', path: '/gaming' },
    { icon: 'news', label: 'News', path: '/news' },
    { icon: 'sports', label: 'Sports', path: '/sports' },
  ];

  const subscriptionChannels = [
    { name: 'Tech Channel', avatar: 'T' },
    { name: 'Music World', avatar: 'M' },
    { name: 'Gaming Hub', avatar: 'G' },
    { name: 'News Daily', avatar: 'N' },
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'shorts':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        );
      case 'subscriptions':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'library':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'history':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'videos':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'clock':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'like':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        );
      case 'trending':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'music':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case 'gaming':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
        );
      case 'news':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      case 'sports':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Full Sidebar */}
      <aside
        className={`fixed left-0 top-14 bottom-0 bg-white dark:bg-youtube-dark border-r border-gray-200 dark:border-youtube-darkBorder overflow-y-auto transition-all duration-300 z-40 ${
          isOpen ? 'w-60' : 'w-0 md:w-18'
        }`}
      >
        <nav className={`${isOpen ? 'p-3' : 'p-2'}`}>
          {/* Main Menu */}
          <div className="pb-2 border-b border-gray-200 dark:border-youtube-darkBorder mb-2">
            {mainMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center ${
                  isOpen ? 'space-x-6 px-3' : 'justify-center'
                } py-2.5 rounded-lg mb-1 ${
                  location.pathname === item.path
                    ? 'bg-gray-100 dark:bg-youtube-darkHover font-medium'
                    : 'hover:bg-gray-100 dark:hover:bg-youtube-darkHover'
                }`}
                title={!isOpen ? item.label : undefined}
              >
                <div className="dark:text-white">{renderIcon(item.icon)}</div>
                {isOpen && <span className="text-sm dark:text-white">{item.label}</span>}
              </Link>
            ))}
          </div>

          {/* Library Section */}
          {isOpen && (
            <>
              <div className="pb-2 border-b border-gray-200 dark:border-youtube-darkBorder mb-2">
                {libraryItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-6 px-3 py-2.5 rounded-lg mb-1 ${
                      location.pathname === item.path
                        ? 'bg-gray-100 dark:bg-youtube-darkHover font-medium'
                        : 'hover:bg-gray-100 dark:hover:bg-youtube-darkHover'
                    }`}
                  >
                    <div className="dark:text-white">{renderIcon(item.icon)}</div>
                    <span className="text-sm dark:text-white">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Subscriptions */}
              <div className="pb-2 border-b border-gray-200 dark:border-youtube-darkBorder mb-2">
                <h3 className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Subscriptions
                </h3>
                {subscriptionChannels.map((channel, index) => (
                  <Link
                    key={index}
                    to={`/channel/${channel.name.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center space-x-6 px-3 py-2 rounded-lg mb-1 hover:bg-gray-100 dark:hover:bg-youtube-darkHover"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {channel.avatar}
                    </div>
                    <span className="text-sm dark:text-white">{channel.name}</span>
                  </Link>
                ))}
                <button className="flex items-center space-x-6 px-3 py-2 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-youtube-darkHover">
                  <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-sm dark:text-white">Show more</span>
                </button>
              </div>

              {/* Explore */}
              <div className="pb-2 mb-2">
                <h3 className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Explore
                </h3>
                {exploreItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-6 px-3 py-2.5 rounded-lg mb-1 ${
                      location.pathname === item.path
                        ? 'bg-gray-100 dark:bg-youtube-darkHover font-medium'
                        : 'hover:bg-gray-100 dark:hover:bg-youtube-darkHover'
                    }`}
                  >
                    <div className="dark:text-white">{renderIcon(item.icon)}</div>
                    <span className="text-sm dark:text-white">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* More from YouTube */}
              <div className="pb-2 border-t border-gray-200 dark:border-youtube-darkBorder pt-2">
                <h3 className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  More from YouTube
                </h3>
                <Link
                  to="/premium"
                  className="flex items-center space-x-6 px-3 py-2 rounded-lg mb-1 hover:bg-gray-100 dark:hover:bg-youtube-darkHover"
                >
                  <svg className="w-6 h-6 text-youtube-red" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="text-sm dark:text-white">YouTube Premium</span>
                </Link>
                <Link
                  to="/studio"
                  className="flex items-center space-x-6 px-3 py-2 rounded-lg mb-1 hover:bg-gray-100 dark:hover:bg-youtube-darkHover"
                >
                  <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm dark:text-white">YouTube Studio</span>
                </Link>
              </div>

              {/* Footer */}
              <div className="px-3 py-4 text-xs text-gray-500 dark:text-gray-400 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">About</a>
                  <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Press</a>
                  <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Copyright</a>
                  <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Contact us</a>
                  <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Creators</a>
                  <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Advertise</a>
                  <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Developers</a>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Terms</a>
                  <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Privacy</a>
                  <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Policy & Safety</a>
                  <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Test new features</a>
                </div>
                <p className="text-gray-400 dark:text-gray-500">© 2025 Google LLC</p>
              </div>
            </>
          )}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => {}}
        />
      )}
    </>
  );
};

export default Sidebar;
