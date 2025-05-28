# 🎬 CineSnap

Hey there, movie lover! Welcome to **CineSnap** – my passion project that I built to make discovering movies as exciting as watching them.

You know that feeling when you spend 30 minutes scrolling through Netflix trying to find something to watch? Yeah, I built this to solve that exact problem. CineSnap is your personal movie discovery companion that actually gets you.

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

🌐 **[Try it live here](https://cinesnap.kethanvr.me)** | 💬 **[Got ideas? Let me know!](https://github.com/Kethanvr/CineSnap/issues)**

---

## 🤔 What's This All About?

So here's the thing – I'm a movie enthusiast who also happens to love coding. I was tired of jumping between different sites just to find basic info about movies, read reviews, watch trailers, and figure out where to stream them.

CineSnap brings everything together in one clean, fast, and beautiful interface. It's built with the latest React tech stack and gets its movie data from TMDB (The Movie Database), so you know the info is legit.

---

## ✨ What You Can Do Right Now

I've packed in quite a bit of functionality already. Here's what you can explore:

### 🎭 **Browse Movies Like a Pro**

- **Popular Movies** – See what everyone's talking about
- **Latest Releases** – Stay up-to-date with fresh content
- **Top Rated** – Discover the movies that actually deserve your time
- **Upcoming Movies** – Get excited about what's coming soon
- **Smart Search** – Find any movie in seconds (the search is surprisingly good!)
- **Genre Deep-Dives** – Whether you're into horror, comedy, or those weird art films

### 📱 **Rich Movie Details**

- **Everything You Need** – Plot, ratings, runtime, release dates
- **Cast & Crew** – See who's in it and who made it happen
- **Beautiful Imagery** – High-quality posters and backdrops (because aesthetics matter)
- **Trailers** – Watch before you commit your evening to it
- **Real Reviews** – Read what actual people think
- **Production Info** – Which studio made it, budget details, all that nerdy stuff

### 🎨 **Experience That Doesn't Suck**

- **Actually Responsive** – Works great on your phone, tablet, or massive desktop monitor
- **Clean Design** – I spent way too much time making this look good
- **Fast as Hell** – Thanks to some smart caching with React Query
- **Smooth Navigation** – Breadcrumbs and intuitive routing
- **Pretty Animations** – Subtle transitions that make everything feel polished

---

## 🚀 Cool Stuff I'm Planning

I'm not done yet! Here's what's cooking in my development pipeline:

### 🤖 **AI Magic (The Fun Part)**

- **Smart Recommendations** – AI that actually understands your taste (not just "because you watched Avengers")
- **Mood-Based Discovery** – Feeling nostalgic? Want something mindless? I got you covered
- **Viewing Patterns** – Track what you like and get better suggestions over time
- **Auto-Tagging** – Let AI categorize movies in ways humans never thought of

### 👤 **Your Personal Movie Hub**

- **Your Profile** – Make it yours, show off your taste
- **Watchlist & Favorites** – Stop losing track of movies you want to see
- **Rate & Review** – Share your hot takes with the world
- **Social Features** – Share recommendations with friends (when they finally implement this)
- **Smart Alerts** – Get notified when your favorite actor drops a new movie

### 🎬 **More Content (Because Why Stop at Movies?)**

- **TV Shows** – The obvious next step
- **Celebrity Deep-Dives** – Full actor/director profiles with career timelines
- **Awards Coverage** – Track Oscar winners, festival darlings, all that prestige stuff
- **Movie News** – Latest industry drama and announcements

### 🔧 **Quality of Life Improvements**

- **Dark Mode** – For those late-night movie browsing sessions
- **Multiple Languages** – Because cinema is universal
- **Offline Mode** – Save your favorites for airplane browsing
- **Better Authentication** – Secure accounts that actually work properly

---

## 🛠️ The Tech Stack (For Fellow Nerds)

I built this with some really solid tech. Here's what powers CineSnap:

**The Frontend Heroes:**

- **React 19** – The latest and greatest, with all those concurrent features
- **TypeScript 5.7** – Because I like my code to actually work
- **Vite 6.2** – Ridiculously fast builds and hot reloading
- **Material-UI 6.4** – Google's design system, but I made it not look like every other Material app
- **Framer Motion 12** – Those smooth animations that make everything feel premium

**Data & State Wizardry:**

- **TanStack Query 5** – Server state management that actually makes sense
- **Axios** – Reliable HTTP requests (no fetch() headaches here)
- **React Router 7** – Clean, modern routing

**Developer Experience:**

- **ESLint 9** – Keeps my code clean and consistent
- **Strict TypeScript** – Maximum type safety, minimal runtime surprises
- **Modern ES Modules** – Because it's 2025, not 2015

---

## 🚀 Want to Run This Locally?

Cool! Here's how to get CineSnap running on your machine:

**What you'll need:**

- Node.js 18 or newer
- npm or yarn (I use npm)
- A free TMDB API key ([grab one here](https://www.themoviedb.org/documentation/api))

**Let's do this:**

```bash
# 1. Grab the code
git clone https://github.com/Kethanvr/CineSnap.git
cd CineSnap

# 2. Install the dependencies (grab a coffee, this might take a minute)
npm install

# 3. Set up your environment
cp .env.example .env
```

Now open that `.env` file and add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_shiny_new_api_key_here
```

```bash
# 4. Fire it up!
npm run dev
```

Open `http://localhost:5173` in your browser and boom! You've got CineSnap running locally. Pretty neat, right?

---

## 📁 How It's Organized

If you're curious about the code structure (or want to contribute), here's how I've organized everything:

```
CineSnap/
├── 🎨 public/              # Static stuff (icons, images, etc.)
├── 🏗️ src/
│   ├── 🧩 components/      # All the reusable UI pieces
│   │   ├── 🧩 common/      # Shared components everyone uses
│   │   ├── Footer.tsx      # Bottom of the page stuff
│   │   ├── HeroSection.tsx # That nice landing area
│   │   ├── MovieCard.tsx   # Individual movie cards
│   │   ├── Navbar.tsx      # Top navigation
│   │   └── SearchBar.tsx   # Search functionality
│   ├── 📄 pages/           # Different routes/screens
│   │   ├── Home.tsx        # Landing page
│   │   ├── MovieDetails.tsx # Individual movie pages
│   │   ├── SearchResults.tsx # Search results
│   │   └── ...more pages as I build them
│   ├── 🌐 services/        # API calls and data fetching
│   │   └── movieApi.ts     # All the TMDB integration
│   ├── 📄 types/           # TypeScript type definitions
│   ├── 🔧 utils/           # Helper functions
│   ├── 🎨 styles/          # Global styles and theming
│   └── 🎣 hooks/           # Custom React hooks
├── ⚙️ config files         # All the boring setup stuff
└── 📄 docs/               # Documentation (like this!)
```

It's pretty straightforward – I believe in keeping things organized but not over-engineered.

---

## 🎯 Development Scripts

Here are the commands you'll actually use:

| What you want to do      | Command           |
| ------------------------ | ----------------- |
| Start development server | `npm run dev`     |
| Build for production     | `npm run build`   |
| Preview production build | `npm run preview` |
| Check for code issues    | `npm run lint`    |

The development server has hot reloading, so your changes show up instantly. It's pretty satisfying.

---

## 🤝 Want to Contribute?

Honestly? I'd love the help! Whether you spot a bug, have an idea for a cool feature, or just want to make the code better, I'm all ears.

**Easy ways to help out:**

1. 🍴 Fork this repo
2. 🌱 Create a branch for your changes (`git checkout -b cool-new-feature`)
3. 💻 Make your magic happen
4. 📝 Commit your changes (`git commit -m 'Add this awesome thing'`)
5. 📤 Push it up (`git push origin cool-new-feature`)
6. 🔄 Open a Pull Request

Don't worry about making it perfect – I'm happy to work with you to get it right!

**Some areas where I could use help:**

- UI/UX improvements (I'm a backend guy at heart)
- Performance optimizations
- More comprehensive testing
- Accessibility improvements
- Feature ideas and feedback

---

## 🙏 Props & Thanks

Big thanks to:

- **TMDB** for their amazing movie database API (seriously, these folks are heroes)
- **The React team** for building such an incredible framework
- **Material-UI** for making my app not look like garbage
- **Everyone in the open source community** who built the tools that made this possible

---

## 📞 Let's Connect!

I'm Kethan, and I love building stuff that people actually want to use. If you're into movies, tech, or just want to chat about building cool things, hit me up!

| Where to find me   | Link                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| 💻 **GitHub**      | [github.com/Kethanvr](https://github.com/Kethanvr)                                      |
| 💼 **LinkedIn**    | [linkedin.com/in/kethan-vr-433ab532b](https://www.linkedin.com/in/kethan-vr-433ab532b/) |
| 🐦 **X (Twitter)** | [x.com/VrKethan](https://x.com/VrKethan)                                                |
| 📺 **YouTube**     | [youtube.com/@kethanvr](https://www.youtube.com/@kethanvr)                              |
| 🧵 **Threads**     | [threads.net/@kethan_vr\_](https://www.threads.net/@kethan_vr_)                         |
| 💬 **Discord**     | [discord.gg/PcbfmP6j](https://discord.gg/PcbfmP6j)                                      |

---

## 📄 License

This project is MIT licensed – basically, do whatever you want with it. Just don't blame me if something breaks! 😄

---

**⭐ If you like what you see, give it a star! It really means a lot.**

Built with way too much coffee and a genuine love for movies by [Kethan VR](https://github.com/Kethanvr) 🎬✨

_Now go discover your next favorite movie!_

## Features

- 🎬 Discover popular and latest movies
- 🔍 Advanced search capabilities
- 📱 Responsive design for all devices
- 🎨 Modern Material-UI interface
- 🔐 User authentication with Clerk
- 👤 Personalized user experience

## Authentication

This app uses [Clerk](https://clerk.com/) for user authentication. Users can sign up, sign in, and access personalized features.

### Clerk Setup

1. Create a Clerk account at [https://clerk.com/](https://clerk.com/)
2. Create a new application in your Clerk Dashboard
3. Copy your Publishable Key from the dashboard
4. Create a `.env.local` file in the project root:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

5. Restart your development server

**Important:** The `VITE_` prefix is required for Vite to expose environment variables to the client-side code.

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables (see Clerk Setup above)
4. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- ⚛️ React 19
- ⚡ Vite
- 🎨 Material-UI (MUI)
- 🔗 React Router
- ⚡ TanStack Query (React Query)
- 🔐 Clerk Authentication
- 📱 Responsive Design

## API Integration

This app uses The Movie Database (TMDB) API for movie data. You may need to configure API keys in your environment variables.

## Development

The project uses modern React patterns including:

- Functional components with hooks
- Lazy loading for optimal performance
- React Query for data fetching
- Material-UI for consistent styling
- Clerk for authentication and user management

## Authentication Features

- 🔐 Sign in/Sign up with email
- 👤 User profile management
- 🛡️ Protected routes and content
- 📱 Responsive authentication UI
- 🎭 User avatar and profile display

Built with ❤️ by Kethan VR
