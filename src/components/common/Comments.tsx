import { useState } from 'react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  replies: number;
  timeAgo: string;
}

const Comments = ({ videoId: _videoId }: { videoId: string }) => {
  const [sortBy, setSortBy] = useState<'top' | 'newest'>('top');
  const [showReplies, setShowReplies] = useState<string | null>(null);

  // Mock comments data
  const mockComments: Comment[] = [
    {
      id: '1',
      author: 'Tech Enthusiast',
      avatar: 'T',
      text: 'This is an amazing video! Really helpful content. I learned so much from watching this.',
      likes: 1200,
      replies: 15,
      timeAgo: '2 days ago',
    },
    {
      id: '2',
      author: 'John Doe',
      avatar: 'J',
      text: 'Great explanation! Can you make more videos like this?',
      likes: 542,
      replies: 8,
      timeAgo: '5 days ago',
    },
    {
      id: '3',
      author: 'Sarah Wilson',
      avatar: 'S',
      text: 'This helped me understand the concept so much better. Thank you for creating this!',
      likes: 324,
      replies: 3,
      timeAgo: '1 week ago',
    },
    {
      id: '4',
      author: 'Mike Johnson',
      avatar: 'M',
      text: 'Excellent video quality and content. Keep up the great work!',
      likes: 189,
      replies: 5,
      timeAgo: '2 weeks ago',
    },
  ];

  const formatLikes = (likes: number) => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}K`;
    }
    return likes.toString();
  };

  return (
    <div className="mt-6">
      {/* Comments Header */}
      <div className="flex items-center space-x-8 mb-6">
        <h2 className="text-xl font-semibold dark:text-white">
          {mockComments.length} Comments
        </h2>
        <button
          onClick={() => setSortBy(sortBy === 'top' ? 'newest' : 'top')}
          className="flex items-center space-x-2 text-sm font-medium dark:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <span>{sortBy === 'top' ? 'Top comments' : 'Newest first'}</span>
        </button>
      </div>

      {/* Add Comment */}
      <div className="flex space-x-4 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
          U
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full pb-2 bg-transparent border-b border-gray-300 dark:border-youtube-darkBorder focus:border-gray-900 dark:focus:border-white outline-none text-sm dark:text-white dark:placeholder-gray-400"
          />
          <div className="flex items-center justify-end space-x-2 mt-3">
            <button className="px-4 py-2 text-sm font-medium rounded-full hover:bg-gray-100 dark:hover:bg-youtube-darkHover dark:text-white">
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {mockComments.map((comment) => (
          <div key={comment.id}>
            <div className="flex space-x-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {comment.avatar}
                </div>
              </div>

              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm dark:text-white">
                    {comment.author}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {comment.timeAgo}
                  </span>
                </div>

                <p className="text-sm dark:text-white mb-2">{comment.text}</p>

                {/* Comment Actions */}
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full">
                    <svg className="w-4 h-4 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span className="text-xs font-medium dark:text-white">
                      {formatLikes(comment.likes)}
                    </span>
                  </button>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-youtube-darkHover rounded-full">
                    <svg className="w-4 h-4 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowReplies(showReplies === comment.id ? null : comment.id)}
                    className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 dark:hover:bg-opacity-20 rounded-full"
                  >
                    Reply
                  </button>
                </div>

                {/* Replies Toggle */}
                {comment.replies > 0 && (
                  <button
                    onClick={() => setShowReplies(showReplies === comment.id ? null : comment.id)}
                    className="flex items-center space-x-2 mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 dark:hover:bg-opacity-20 rounded-full px-3 py-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span>{comment.replies} replies</span>
                  </button>
                )}

                {/* Replies Section */}
                {showReplies === comment.id && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-youtube-darkBorder space-y-4">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        R
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm dark:text-white">
                            Reply Author
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            1 day ago
                          </span>
                        </div>
                        <p className="text-sm dark:text-white">
                          This is a reply to the comment. Great point!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
