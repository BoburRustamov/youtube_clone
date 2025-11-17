# YouTube Clone

A fully functional YouTube clone built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

> **⚠️ IMPORTANT:** This application requires a YouTube Data API v3 key. You must create your own API key from Google Cloud Console to run this project. See the [Getting Your YouTube API Key](#getting-your-youtube-api-key) section below.

## Features

- **Mock Login System**: Log in with any username and password
- **Video Grid**: Browse trending videos in a responsive grid layout
- **Video Hover Preview**: Videos auto-play on hover (YouTube-like behavior)
- **Shorts Page**: Vertical scrolling short videos
- **Video Player**: Full video playback with details and related videos
- **Search Functionality**: Search for videos using the YouTube API
- **Redux State Management**: Centralized state management with Redux Toolkit
- **Responsive Design**: Works on desktop, tablet, and mobile

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- YouTube Data API v3 Key

### Getting Your YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key
5. (Optional) Restrict your API key for security:
   - Click on your API key
   - Under "API restrictions", select "Restrict key"
   - Select "YouTube Data API v3"
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

3. **Create your `.env` file:**

   Create a new file named `.env` in the root directory and add your YouTube API key:

```bash
# Create .env file
touch .env
```

   Then add this line to the `.env` file:
```
VITE_YOUTUBE_API_KEY=your_actual_api_key_here
```

   **Important:** Replace `your_actual_api_key_here` with your actual YouTube Data API v3 key (see "Getting Your YouTube API Key" section above)

4. **Start the development server:**
```bash
npm run dev
```

5. **Open your browser:**

   Navigate to `http://localhost:5173`

## Usage

### Login
- Enter any username and password on the login screen
- Click "Sign In" to access the application

### Home Page
- Browse trending videos in a grid layout
- Hover over any video to see a preview (auto-plays after 500ms)
- Click on a video to watch it in full

### Shorts
- Click "Shorts" in the sidebar
- Scroll vertically to browse short videos
- Videos auto-play as you scroll

### Search
- Use the search bar in the header to find videos
- Results will display in the home page grid

### Logout
- Click the "Logout" button in the header to sign out

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **API**: YouTube Data API v3
- **HTTP Client**: Axios

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   │   ├── VideoCard.tsx
│   │   └── ProtectedRoute.tsx
│   └── layout/          # Layout components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Layout.tsx
├── features/            # Redux slices
│   ├── auth/
│   │   └── authSlice.ts
│   ├── videos/
│   │   └── videosSlice.ts
│   └── shorts/
│       └── shortsSlice.ts
├── pages/               # Page components
│   ├── Login.tsx
│   ├── Home.tsx
│   ├── Shorts.tsx
│   └── Watch.tsx
├── services/            # API services
│   └── youtubeApi.ts
├── store/               # Redux store
│   ├── index.ts
│   └── hooks.ts
├── types/               # TypeScript types
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Video Hover Autoplay
Videos automatically start playing when you hover over them for more than 500ms. This mimics YouTube's behavior and provides a quick preview of the content.

### Mock Authentication
The authentication system accepts any username and password combination. User data is stored in localStorage, so you'll remain logged in even after refreshing the page.

### Redux State Management
The application uses Redux Toolkit for state management with three main slices:
- **Auth**: Manages user authentication state
- **Videos**: Handles video fetching, searching, and current video state
- **Shorts**: Manages shorts data and current playback index

## API Rate Limits

The YouTube Data API has quota limits. The default quota is 10,000 units per day. Common operations cost:
- Video list: ~3-5 units
- Search: ~100 units
- Video details: ~1 unit

If you exceed your quota, you'll see errors. Consider implementing caching or requesting a quota increase from Google.
