import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../features/auth/authSlice';
import { searchForVideos, setSearchQuery, getVideos } from '../../features/videos/videosSlice';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAppsMenu, setShowAppsMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setSearchQuery(searchInput));
      dispatch(searchForVideos(searchInput));
      navigate('/search');
    }
  };

  const handleLogoClick = () => {
    // Clear search and reload trending videos
    setSearchInput('');
    dispatch(setSearchQuery(''));
    dispatch(getVideos());
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setShowUserMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-youtube-dark shadow-sm z-50 h-14 border-b border-gray-200 dark:border-youtube-darkBorder">
      <div className="flex items-center justify-between px-4 h-full">
        {/* Left Section - Menu + Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <button onClick={handleLogoClick} className="flex items-center space-x-1 cursor-pointer">
            <svg className="w-7 h-7 text-youtube-red" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="text-xl font-semibold dark:text-white hidden sm:block">YouTube</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 -ml-1 hidden sm:block">US</span>
          </button>
        </div>

        {/* Center Section - Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4 hidden md:flex">
          <div className="flex w-full">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-youtube-darkBorder dark:bg-youtube-darkSurface dark:text-white rounded-l-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gray-50 dark:bg-youtube-darkBorder border border-l-0 border-gray-300 dark:border-youtube-darkBorder rounded-r-full hover:bg-gray-100 dark:hover:bg-youtube-darkHover transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <button
            type="button"
            className="ml-2 p-2 bg-gray-50 dark:bg-youtube-darkBorder hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full transition-colors"
            aria-label="Voice search"
          >
            <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </form>

        {/* Mobile Search Icon */}
        <button className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full transition-colors">
          <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Right Section - Icons */}
        <div className="flex items-center space-x-1">
          {/* Create Button */}
          <button
            className="p-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full transition-colors hidden sm:block"
            aria-label="Create"
          >
            <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full transition-colors relative"
              aria-label="Notifications"
            >
              <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-youtube-red rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-youtube-darkSurface rounded-lg shadow-2xl border dark:border-youtube-darkBorder overflow-hidden">
                <div className="p-4 border-b dark:border-youtube-darkBorder">
                  <h3 className="font-semibold dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-gray-50 dark:hover:bg-youtube-darkHover cursor-pointer">
                    <div className="flex space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm dark:text-white">New video from <span className="font-semibold">Channel Name</span></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No more notifications
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Apps Menu */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowAppsMenu(!showAppsMenu)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full transition-colors"
              aria-label="Apps"
            >
              <svg className="w-6 h-6 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
              </svg>
            </button>

            {showAppsMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-youtube-darkSurface rounded-lg shadow-2xl border dark:border-youtube-darkBorder p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-lg cursor-pointer">
                    <svg className="w-8 h-8 text-youtube-red" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="text-xs mt-1 dark:text-white">YouTube TV</span>
                  </div>
                  <div className="flex flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-lg cursor-pointer">
                    <svg className="w-8 h-8 text-youtube-red" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs mt-1 dark:text-white">YouTube Music</span>
                  </div>
                  <div className="flex flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-lg cursor-pointer">
                    <svg className="w-8 h-8 text-youtube-red" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                    </svg>
                    <span className="text-xs mt-1 dark:text-white">YouTube Kids</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full transition-colors"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-youtube-darkSurface rounded-lg shadow-2xl border dark:border-youtube-darkBorder overflow-hidden">
                <div className="p-4 border-b dark:border-youtube-darkBorder">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{user?.username}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">@{user?.username}</p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <Link to="/channel" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover">
                    <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="dark:text-white">Your channel</span>
                  </Link>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover">
                    <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <span className="dark:text-white">Settings</span>
                  </button>
                </div>

                <div className="border-t dark:border-youtube-darkBorder py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-youtube-darkHover"
                  >
                    <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="dark:text-white">Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
