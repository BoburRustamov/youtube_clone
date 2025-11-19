# YouTube Clone - Professional Edition

A pixel-perfect, fully functional YouTube clone built with React, TypeScript, Redux Toolkit, and Tailwind CSS. This application replicates the core features and UI/UX of the original YouTube platform.

> **⚠️ IMPORTANT:** This application requires a YouTube Data API v3 key. You must create your own API key from Google Cloud Console to run this project. See the [Getting Your YouTube API Key](#getting-your-youtube-api-key) section below.

## ✨ Features

### 🎨 UI/UX Features
- **🌓 Dark Mode**: Complete dark/light theme toggle with system preference support
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **🎯 Pixel-Perfect Design**: Matches YouTube's Material Design 3 interface
- **⚡ Smooth Animations**: Transitions, hover effects, and loading states
- **🎨 Modern Styling**: Roboto font, custom scrollbars, and YouTube color scheme

### 🔐 Authentication
- **Mock Login System**: Sign in with any username/password
- **Persistent Sessions**: Stay logged in with localStorage
- **Protected Routes**: Secure pages requiring authentication
- **User Profile**: Avatar, dropdown menu, and account management

### 🏠 Home Page
- **Video Grid Layout**: Responsive 1-4 column grid
- **Filter Chips**: Scrollable category filters (All, Music, Gaming, etc.)
- **Video Hover Autoplay**: Preview videos on hover (500ms delay)
- **Video Cards**: Complete with thumbnails, duration badges, channel avatars
- **Three-dot Menus**: Add to queue, save, share, and more options
- **Verified Badges**: Channel verification indicators

### 📺 Video Player Page
- **Full Video Player**: Embedded YouTube player with controls
- **Interactive Buttons**: Like/Dislike, Share, Download, Save
- **Subscribe Button**: Animated subscribe/unsubscribe toggle
- **Expandable Description**: Show more/less functionality
- **Comments Section**: View and add comments with replies
- **Related Videos Sidebar**: Recommended content
- **View Count & Date**: Formatted statistics
- **Channel Info**: Avatar, name, subscriber count

### 🎬 Additional Pages
- **Trending**: Ranked list of trending videos
- **Subscriptions**: Channel avatars and latest videos
- **Library**: History, Watch Later, Liked videos, and playlists
- **Channel Pages**: Complete channel view with tabs (Home, Videos, Shorts, Playlists, About)
- **Shorts**: Vertical scrolling short-form videos

### 🔍 Search & Navigation
- **Global Search**: Search bar with voice search button
- **Category Filters**: Horizontal scrolling chip navigation
- **Comprehensive Sidebar**: All YouTube sections (Home, Trending, Subscriptions, Library, Explore)
- **Collapsible Sidebar**: Toggle between full and mini modes
- **Active Route Highlighting**: Visual feedback for current page

### 🎛️ Header Features
- **Hamburger Menu**: Toggle sidebar visibility
- **YouTube Logo**: Clickable home link
- **Search Bar**: Full-width search with submit and voice buttons
- **Create Button**: Upload/create content
- **Notifications**: Bell icon with notification dot
- **Apps Menu**: YouTube TV, Music, Kids
- **Theme Toggle**: Switch between light/dark modes
- **User Menu**: Profile dropdown with settings and logout

### 📋 Advanced Features
- **Skeleton Loaders**: Smooth loading placeholders
- **Error Handling**: User-friendly error messages
- **Infinite Scroll Ready**: Prepared for pagination
- **Video Duration Overlays**: Time stamps on thumbnails
- **View Formatting**: Readable view counts (1.2M, 543K)
- **Time Ago**: Relative timestamps (2 hours ago, 3 days ago)

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library and component architecture |
| **TypeScript 5.9** | Type-safe development |
| **Redux Toolkit 2.10** | State management |
| **React Router v6** | Client-side routing |
| **Tailwind CSS 3.4** | Utility-first styling |
| **Vite 5.4** | Build tool and dev server |
| **Axios 1.13** | HTTP client |
| **YouTube Data API v3** | Video data source |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- YouTube Data API v3 Key

### Getting Your YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key
5. (Optional) Restrict your API key:
   - Click on your API key
   - Under "API restrictions", select "Restrict key"
   - Choose "YouTube Data API v3"
   - Save

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/youtube-clone.git
cd youtube-clone
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory:

```bash
VITE_YOUTUBE_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with your YouTube Data API v3 key.

4. **Start the development server:**
```bash
npm run dev
```

5. **Open your browser:**

Navigate to `http://localhost:5173`

## 📖 Usage Guide

### Login
1. Enter any username (e.g., "john")
2. Enter any password (e.g., "password")
3. Click "Sign in"
4. You'll be redirected to the home page

### Browsing Videos
- **Home**: View trending videos in a grid
- **Hover**: Videos auto-play after 500ms hover
- **Click**: Open full video player
- **Filter**: Use category chips to filter content

### Watching Videos
- **Player**: Full YouTube embed with controls
- **Like/Dislike**: Toggle engagement buttons
- **Subscribe**: Follow channels
- **Comments**: Read and interact with comments
- **Related**: Browse recommended videos in sidebar

### Dark Mode
- Click the moon/sun icon in the header
- Preference is saved to localStorage
- Applies across all pages

### Navigation
- **Sidebar**: Access all major sections
- **Search**: Find videos globally
- **Menu**: Toggle sidebar with hamburger icon

## 📁 Project Structure

```
youtube-clone/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   │   ├── VideoCard.tsx
│   │   │   ├── FilterChips.tsx
│   │   │   ├── Comments.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   └── layout/           # Layout components
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── Layout.tsx
│   ├── contexts/             # React contexts
│   │   └── ThemeContext.tsx
│   ├── features/             # Redux slices
│   │   ├── auth/
│   │   │   └── authSlice.ts
│   │   ├── videos/
│   │   │   └── videosSlice.ts
│   │   └── shorts/
│   │       └── shortsSlice.ts
│   ├── pages/                # Page components
│   │   ├── Login.tsx
│   │   ├── Home.tsx
│   │   ├── Watch.tsx
│   │   ├── Shorts.tsx
│   │   ├── Trending.tsx
│   │   ├── Subscriptions.tsx
│   │   ├── Library.tsx
│   │   └── Channel.tsx
│   ├── services/             # API services
│   │   └── youtubeApi.ts
│   ├── store/                # Redux configuration
│   │   ├── index.ts
│   │   └── hooks.ts
│   ├── types/                # TypeScript definitions
│   │   └── index.ts
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── .env.example              # Environment template
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

## 🎯 Available Scripts

```bash
npm run dev      # Start development server (Vite)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔑 Key Features Explained

### Video Hover Autoplay
Videos automatically play when hovered for 500ms, providing quick previews without requiring a click. This improves user experience and matches YouTube's behavior.

### Dark Mode Implementation
Uses React Context API to manage theme state globally. Theme preference is persisted in localStorage and applies Tailwind's dark mode classes automatically.

### Redux State Architecture
Three main slices manage application state:
- **Auth Slice**: User authentication, login/logout
- **Videos Slice**: Video fetching, search, current video
- **Shorts Slice**: Shorts data, navigation, playback

### Protected Routes
HOC (Higher-Order Component) wraps routes requiring authentication, automatically redirecting unauthenticated users to the login page.

### Responsive Design
Mobile-first approach with Tailwind's responsive utilities:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large (1280px+)

## ⚠️ API Rate Limits

The YouTube Data API has quota limits:

| Operation | Cost (units) |
|-----------|-------------|
| Video list | 3-5 units |
| Search | 100 units |
| Video details | 1 unit |

**Daily quota:** 10,000 units (default)

**Tips:**
- Implement caching to reduce API calls
- Request quota increase from Google if needed
- Consider using mock data for development

## 🐛 Troubleshooting

### API Key Issues
- Ensure `.env` file exists with correct key format
- Verify API is enabled in Google Cloud Console
- Check API key restrictions aren't blocking requests

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port Already in Use
Vite will automatically try the next available port (5174, 5175, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is for educational purposes only. YouTube is a trademark of Google LLC.

## 🙏 Acknowledgments

- YouTube for inspiration
- Google for YouTube Data API
- React team for excellent documentation
- Tailwind CSS for utility-first styling

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
