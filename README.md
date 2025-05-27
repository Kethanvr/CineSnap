<div align="center">

# 🎬 CineSnap
### *Your AI-Powered Movie Discovery Companion*

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Material-UI](https://img.shields.io/badge/MUI-6.4.7-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)

*Discover movies like never before with CineSnap – where AI meets cinema magic ✨*

[🚀 Live Demo](https://cinesnap.kethanvr.me) • [📖 Documentation](#-getting-started) • [🐛 Report Bug](https://github.com/Kethanvr/CineSnap/issues) • [💡 Request Feature](https://github.com/Kethanvr/CineSnap/issues)

</div>

---

## 🌟 What is CineSnap?

CineSnap is a modern, AI-powered movie discovery platform that transforms how you explore cinema. Built with cutting-edge React technology and powered by TMDB API, it offers an intuitive and engaging experience for movie enthusiasts worldwide.

---

## ✨ Current Features

### 🎭 **Core Movie Features**
- 🔥 **Popular Movies** - Trending films updated in real-time
- 🆕 **Latest Releases** - Fresh content from theaters
- ⭐ **Top Rated** - Critically acclaimed masterpieces
- 🎬 **Upcoming Movies** - Sneak peeks at future releases
- 🔍 **Advanced Search** - Find any movie instantly
- 🎯 **Genre Exploration** - Browse by your favorite categories

### 📱 **Movie Details & Media**
- 📋 **Comprehensive Info** - Plot, ratings, runtime, and more
- 🎭 **Cast & Crew** - Complete filmography details
- 🖼️ **High-Quality Images** - Posters, backdrops, and stills
- 🎥 **Trailers & Videos** - Watch before you decide
- 💬 **User Reviews** - Community insights and opinions
- 🏢 **Production Companies** - Studio information and portfolios

### 🎨 **User Experience**
- 📱 **Fully Responsive** - Perfect on all devices
- 🌙 **Modern UI/UX** - Clean, intuitive Material Design
- ⚡ **Lightning Fast** - Optimized performance with React Query
- 🧭 **Smart Navigation** - Breadcrumbs and seamless routing
- 🔄 **Smooth Animations** - Framer Motion powered transitions
- 📊 **Loading States** - Professional loading indicators

---

## 🚀 Planned Features (Coming Soon!)

### 🤖 **AI-Powered Enhancements**
- 🎯 **Smart Recommendations** - AI-driven movie suggestions
- 🔮 **Mood-Based Discovery** - Find movies based on your current vibe
- 📊 **Viewing History Analytics** - Track and analyze your preferences
- 🏷️ **Auto-Tagging** - AI-generated tags for better categorization

### 👤 **User Experience Upgrades**
- 👤 **User Profiles** - Create and customize your movie profile
- ❤️ **Watchlist & Favorites** - Save movies for later
- ⭐ **Personal Ratings** - Rate and review movies
- 👥 **Social Features** - Share recommendations with friends
- 🔔 **Smart Notifications** - Get alerted about new releases

### 🎬 **Content Expansion**
- 📺 **TV Shows Integration** - Complete series database
- 🎭 **Celebrity Profiles** - In-depth actor/director pages
- 🏆 **Awards & Festivals** - Track Oscar winners and film festival selections
- 📰 **Movie News** - Latest industry updates and announcements

### 🔧 **Technical Improvements**
- 🌙 **Dark/Light Mode** - Theme customization
- 🌍 **Multi-language Support** - Global accessibility
- 📱 **PWA Features** - Offline functionality and app-like experience
- 🔐 **Advanced Authentication** - Secure user accounts

---

## 🛠️ Tech Stack

### **Frontend Powerhouse**
- ⚛️ **React 19** - Latest React with concurrent features
- 📘 **TypeScript 5.7** - Type-safe development
- ⚡ **Vite 6.2** - Lightning-fast build tool
- 🎨 **Material-UI 6.4** - Google's Material Design system
- 🎭 **Framer Motion 12** - Smooth animations and transitions

### **State & API Management**
- 🔄 **TanStack Query 5** - Powerful server state management
- 🌐 **Axios** - HTTP client for API requests
- 🧭 **React Router 7** - Modern routing solution

### **Development Tools**
- 🔍 **ESLint 9** - Code quality and consistency
- 📦 **Modern Module System** - ES modules throughout
- 🎯 **Strict TypeScript** - Maximum type safety

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/documentation/api))

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kethanvr/CineSnap.git
   cd CineSnap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   Add your TMDB API key to `.env`:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` and start exploring! 🎉

---

## 📁 Project Architecture

```
CineSnap/
├── 📁 public/              # Static assets
├── 📁 src/
│   ├── 📁 components/      # Reusable UI components
│   │   ├── 📁 common/      # Shared components
│   │   ├── Footer.tsx      # App footer
│   │   ├── HeroSection.tsx # Landing hero
│   │   ├── MovieCard.tsx   # Movie display cards
│   │   ├── Navbar.tsx      # Navigation bar
│   │   └── SearchBar.tsx   # Search functionality
│   ├── 📁 pages/           # Route components
│   │   ├── Home.tsx        # Landing page
│   │   ├── MovieDetails.tsx # Movie information
│   │   ├── SearchResults.tsx # Search results
│   │   └── ...more pages
│   ├── 📁 services/        # API layer
│   │   └── movieApi.ts     # TMDB API integration
│   ├── 📁 types/           # TypeScript definitions
│   ├── 📁 utils/           # Helper functions
│   ├── 📁 styles/          # Global styles & theme
│   └── 📁 hooks/           # Custom React hooks
├── 📄 package.json         # Dependencies & scripts
├── 📄 vite.config.ts       # Vite configuration
└── 📄 tsconfig.json        # TypeScript config
```

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🔥 Start development server |
| `npm run build` | 📦 Build for production |
| `npm run preview` | 👀 Preview production build |
| `npm run lint` | 🔍 Run ESLint checks |

---

## 🤝 Contributing

Contributions are welcome! Whether it's bug fixes, feature additions, or improvements to documentation, every contribution makes CineSnap better.

1. 🍴 Fork the repository
2. 🌱 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💻 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- 🎬 **TMDB** - For providing the comprehensive movie database API
- ⚛️ **React Team** - For the amazing React framework
- 🎨 **Material-UI** - For the beautiful design system
- 🌟 **Open Source Community** - For the incredible tools and libraries

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Made with ❤️ by [Kethan VR](https://github.com/Kethanvr)**

*Happy movie discovering! 🎬✨*

</div>
