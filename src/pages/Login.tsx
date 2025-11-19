import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { login } from '../features/auth/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - any username/password works
    dispatch(login({ username, password }));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-youtube-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <svg className="w-16 h-16 text-youtube-red" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">YouTube</h1>
          <h2 className="text-xl text-gray-700 dark:text-gray-300 mb-1">Sign in</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">to continue to YouTube</p>
        </div>

        <div className="bg-white dark:bg-youtube-darkSurface rounded-lg border border-gray-200 dark:border-youtube-darkBorder p-8 shadow-sm">
          {/* Quick Info Banner */}
          <div className="mb-6 p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-xs text-yellow-800 dark:text-yellow-300 text-center">
              <strong>Quick Demo Access:</strong> Enter any username and password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 dark:border-youtube-darkBorder bg-white dark:bg-youtube-dark text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                placeholder="Email or username (e.g., john)"
                required
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 dark:border-youtube-darkBorder bg-white dark:bg-youtube-dark text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                placeholder="Password (e.g., test123)"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-youtube-darkBorder">
            <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-2">
                    Demo Application - Mock Authentication
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed mb-2">
                    This is a demonstration YouTube clone. <strong>No real authentication is required.</strong>
                  </p>
                  <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1.5 list-disc list-inside">
                    <li><strong>Any username</strong> and <strong>any password</strong> will work</li>
                    <li>Example: Username: "john", Password: "test123"</li>
                    <li>Your session is stored locally in your browser</li>
                    <li>No data is sent to any server</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              For testing purposes only • No real accounts needed
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="flex justify-center space-x-6 text-xs text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white">Help</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
