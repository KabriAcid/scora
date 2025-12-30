# Scora

**Live Football Scores for Nigerian Local Leagues**

## 🎯 Project Overview

Scora is a Nigerian local live-score web application designed to bring real-time match updates to grassroots and semi-professional football leagues that operate without traditional live coverage. By connecting fans directly with on-field action through live agents, Scora bridges the gap between local football and digital engagement.

## 🚀 The Problem

Many grassroots and semi-professional football leagues in Nigeria lack real-time match coverage, leaving fans without reliable access to match events as they happen. Unlike professional leagues with automated tracking systems, these local leagues have no infrastructure for live updates, making it difficult for supporters to follow their teams.

## 💡 The Solution

Scora provides a web-based live-score platform powered by **on-field live agents** who are physically present at match venues. These agents record and submit live match events directly from the pitch, including:

- ⚽ Goals & Penalties
- 🟨 Yellow Cards
- 🟥 Red Cards
- ⚠️ Fouls
- 🚩 Corner Kicks
- ⚪ Offside
- 🔄 Substitutions
- 🚑 Injuries
- 📊 Real-time match statistics

## 👥 User Roles & Portals

### 1. Guest/Regular Users Portal

**Objective**: View live matches, fixtures, results, and match statistics in real time

**Features**:

- 🏠 **Home Dashboard**
  - Featured live match display
  - Today's matches with live status indicators
  - Date selector for browsing matches
  - Smooth loading skeletons for better UX
- 📊 **Match Details Page**
  - Live match header with scores and team logos
  - **Lineups Tab**: Visual formation display (4-3-3, 4-4-2, 4-2-3-1, 4-1-4-1) with player positions
  - **Stats Tab**: Match statistics comparison (possession, shots, corners, fouls, etc.)
  - **Summary Tab**: Timeline view of match events with centered timeline and team-based positioning
  - **Table Tab**: League standings with team positions
  - **H2H Tab**: Head-to-head history between teams
- 📅 **Fixtures Calendar**
  - Matchweek navigation (1-38 weeks)
  - Matches grouped by date
  - Status indicators (scheduled, live, finished)
  - Quick score viewing with team logos
- 🏆 **League Standings**
  - Complete league table with rankings
  - Detailed statistics: Played, Won, Draw, Lost, GF, GA, GD, Points
  - Last 5 matches form indicator
  - Highlighted zones (promotion, relegation)

**Access**: Public access, no authentication required

### 2. Live Agents Portal

**Objective**: Record and submit match events in real-time from the field

**Features**:

- 🎯 **Agent Dashboard**
  - Assigned matches overview
  - Quick access to live matches
  - Match assignment status
- ⚽ **Live Match Control Panel**
  - Match timer with start/pause/end controls
  - Real-time score tracking
  - Live status badge
- 📝 **Event Logging Interface**
  - Team selector (Home/Away)
  - Visual event type buttons (Goal, Yellow Card, Red Card, Substitution, Foul, Corner, Offside, Injury)
  - Dynamic event logging form with player selection
  - Event descriptions and timestamps
  - Instant event submission with feedback
- 📋 **Match Timeline**
  - Chronological event history
  - Visual event icons
  - Event details (player, team, minute)
  - Real-time updates
- 📊 **Match Statistics Sidebar**
  - Current score display
  - Total events logged
  - Match duration
  - Quick actions panel

**Access**: Authenticated agents assigned to specific matches

### 3. Administrator Portal

**Objective**: Manage the entire system infrastructure and operations

**Features**:

- 🏢 **Admin Dashboard**
  - System overview statistics
  - Quick access to all management sections
  - Recent activity monitoring
- 🏆 **League Management**
  - Create and edit leagues
  - League configuration settings
  - Season management
- ⚽ **Team Management**
  - Add/edit/delete teams
  - Team roster management
  - Team statistics
  - Player assignments
- 👥 **Player Management**
  - Player database
  - Player profiles (name, number, position)
  - Transfer management
  - Statistics tracking
- 🏟️ **Stadium Management**
  - Venue database
  - Stadium details (name, location, capacity)
  - Match assignments
- 📅 **Fixture Generation**
  - Automated fixture scheduling
  - Manual fixture adjustments
  - Matchweek organization
  - Stadium and time assignments
- 🎭 **Agent Management**
  - Agent registration and profiles
  - Match assignments
  - Performance monitoring
  - Access control
- ⚙️ **System Settings**
  - Platform configuration
  - User permissions
  - Notification settings

**Access**: Authenticated administrators with elevated privileges

## 📌 Current Development Stage

All three portals have been designed and implemented:

- ✅ **Guest Portal**: Fully functional with live match viewing, statistics, and fixtures
- ✅ **Agent Portal**: Complete event logging system with real-time match control
- ✅ **Admin Portal**: Full management capabilities for leagues, teams, players, stadiums, and agents

**Next Phase**: Backend API integration and real-time WebSocket connections for live data synchronization.

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Animation**: Framer Motion
- **Routing**: React Router
- **Icons**: Lucide React
- **State Management**: TanStack Query

### Development Tools

- **Package Manager**: Npm
- **Linting**: ESLint
- **Type Checking**: TypeScript

## 🏗️ Project Architecture

### Frontend Structure

```
src/
├── components/          # Reusable UI components
│   ├── agent/          # Agent-specific components
│   ├── layout/         # Layout components (headers, sidebars)
│   ├── match/          # Match-related components
│   ├── team/           # Team-related components
│   └── ui/             # Base UI components (buttons, cards, etc.)
├── features/           # Feature-based modules
│   ├── admin/          # Admin portal
│   │   ├── pages/      # Admin pages
│   │   └── components/ # Admin-specific components
│   ├── agent/          # Agent portal
│   │   ├── pages/      # Agent pages
│   │   └── components/ # Agent-specific components
│   └── guest/          # Guest/User portal
│       ├── pages/      # Guest pages
│       └── components/ # Guest-specific components
├── data/               # Mock data (temporary)
├── routes/             # Route configurations
├── shared/             # Shared utilities
│   ├── api/            # API clients
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom hooks
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
└── assets/             # Static assets (images, fonts, icons)
```

### Key Utilities

- **Event Icons System**: Centralized configuration for all match event icons (`src/shared/utils/eventIcons.ts`)
  - Unified icon paths
  - Consistent event types
  - Color scheme definitions
  - Helper functions for icon retrieval

### Routing Structure

- `/` - Guest home page
- `/match/:id` - Match details
- `/fixtures` - Fixtures calendar
- `/standings` - League standings
- `/agent/login` - Agent authentication
- `/agent/dashboard` - Agent dashboard
- `/agent/match/:id` - Live match control
- `/admin/*` - Admin portal (protected routes)

## 🎨 Design System

### Color Palette

#### Light Mode

```css
Background:       hsl(240 20% 98%)
Foreground:       hsl(280 50% 15%)
Primary:          hsl(280 50% 25%)    /* Deep Purple */
Secondary:        hsl(240 15% 95%)
Accent:           hsl(330 100% 55%)   /* Vibrant Pink */
Success:          hsl(140 60% 50%)    /* Green */
Destructive:      hsl(0 84.2% 60.2%)  /* Red */
Border:           hsl(240 15% 90%)
```

#### Dark Mode

```css
Background:       hsl(280 50% 5%)
Foreground:       hsl(0 0% 98%)
Primary:          hsl(280 50% 60%)    /* Light Purple */
Secondary:        hsl(280 30% 15%)
Accent:           hsl(330 100% 55%)   /* Vibrant Pink */
Success:          hsl(140 60% 50%)    /* Green */
Destructive:      hsl(0 62.8% 50%)    /* Red */
Border:           hsl(280 30% 20%)
```

### Typography

- **Font Family**: Ginto (Custom)
- **Fallback**: Sans-serif

### Spacing & Borders

- **Border Radius**: 1rem (16px)
- **Responsive**: Mobile-first approach

### Gradients

```css
Primary Gradient: linear-gradient(135deg, hsl(280 50% 20%), hsl(280 60% 30%))
Card Gradient:    linear-gradient(135deg, hsl(280 50% 25%), hsl(280 45% 20%))
```

````

## 🎯 Key Features by Portal

### Guest Portal Features

#### Match Viewing
- **Live Match Display**: Real-time score updates with live status indicators
- **Match Cards**: Team logos, scores, stadium info, and match status
- **Date Navigation**: Browse matches by specific dates
- **Responsive Design**: Optimized for mobile and desktop viewing

#### Match Details
- **Formation Visualization**: Interactive pitch display showing player positions in various formations
- **Timeline View**: Centered timeline with events positioned by team (home left, away right)
- **Statistics Comparison**: Side-by-side team statistics with visual progress bars
- **Event Icons**: SVG-based event icons with consistent styling

#### Data Display
- **Smart Loading States**: Skeleton loaders for better perceived performance
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Animation**: Smooth transitions using Framer Motion

### Agent Portal Features

#### Match Control
- **Live Timer**: Real-time match clock with minute display
- **Score Management**: Automatic score updates on goal events
- **Match States**: Start, pause, and end match controls
- **Status Indicators**: Visual badges for match status

#### Event Logging
- **Team Selection**: Toggle between home and away teams
- **Event Types**: Visual buttons for 8 different event types
- **Dynamic Forms**: Context-aware forms based on event type
- **Player Selection**: Dropdown with team rosters
- **Instant Feedback**: Toast notifications on successful event logging
- **Event Validation**: Form validation before submission

#### Real-time Updates
- **Event Timeline**: Live chronological display of logged events
- **Match Stats**: Real-time statistics sidebar
- **Undo/Edit**: Future capability for event corrections

### Admin Portal Features

#### Content Management
- **CRUD Operations**: Full create, read, update, delete for all entities
- **Bulk Actions**: Multiple entity management
- **Data Tables**: Sortable, filterable data displays
- **Form Validation**: Comprehensive input validation

#### System Administration
- **User Management**: Agent accounts and permissions
- **Fixture Automation**: Automated round-robin fixture generation
- **Assignment System**: Agent-to-match assignment workflow
- **Analytics Dashboard**: System statistics and monitoring

## 🗺️ Roadmap

### Phase 1: Frontend Development ✅ COMPLETED
- [x] **Guest Portal**
  - [x] Home page with live matches
  - [x] Match details with tabbed interface
  - [x] Formation visualization
  - [x] Fixtures calendar with matchweek navigation
  - [x] League standings table
  - [x] Responsive design implementation

- [x] **Agent Portal**
  - [x] Agent dashboard
  - [x] Live match control panel
  - [x] Event logging system with 8 event types
  - [x] Team and player selection
  - [x] Real-time match timeline
  - [x] Match statistics display

- [x] **Admin Portal**
  - [x] Admin dashboard with statistics
  - [x] League management system
  - [x] Team and player CRUD operations
  - [x] Stadium management
  - [x] Fixture generation and management
  - [x] Agent assignment system
  - [x] Settings and configuration

- [x] **Design System & UI**
  - [x] Custom color scheme (light/dark modes)
  - [x] Reusable component library
  - [x] Animation and transitions
  - [x] Event icons utility system
  - [x] Loading states and skeletons

### Phase 2: Backend Integration 🚧 IN PROGRESS
- [ ] **API Development**
  - [ ] RESTful API for data operations
  - [ ] WebSocket for real-time updates
  - [ ] Authentication and authorization
  - [ ] Database schema design

- [ ] **Data Integration**
  - [ ] Replace mock data with API calls
  - [ ] Real-time event synchronization
  - [ ] Image upload and storage
  - [ ] Data validation and sanitization

### Phase 3: Authentication & Security 📋 PLANNED
- [ ] User Authentication System
  - [ ] JWT-based authentication
  - [ ] Role-based access control (RBAC)
  - [ ] Password reset functionality
  - [ ] Session management

- [ ] Security Features
  - [ ] API rate limiting
  - [ ] Input sanitization
  - [ ] CORS configuration
  - [ ] Secure data transmission

### Phase 4: Advanced Features 🔮 FUTURE
- [ ] **Notifications**
  - [ ] Real-time push notifications
  - [ ] Email notifications
  - [ ] Match reminders

- [ ] **Analytics**
  - [ ] Player performance tracking
  - [ ] Team statistics dashboard
  - [ ] Match reports generation

- [ ] **Mobile App**
  - [ ] React Native application
  - [ ] Offline support
  - [ ] Push notifications

- [ ] **Social Features**
  - [ ] User comments on matches
  - [ ] Social media sharing
  - [ ] Fan predictions and polls

### Phase 5: Optimization & Scaling 🚀 FUTURE
- [ ] Performance optimization
- [ ] CDN integration for assets
- [ ] Caching strategies
- [ ] Load balancing
- [ ] Multi-league support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KabriAcid/scora.git
   cd scora
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Accessing Different Portals

- **Guest Portal**: `http://localhost:5173/`
- **Agent Portal**: `http://localhost:5173/agent/login`
- **Admin Portal**: `http://localhost:5173/admin/login`

## 🎨 Design Philosophy

### User Experience Principles

1. **Clarity**: Clear visual hierarchy and intuitive navigation
2. **Performance**: Fast loading with optimistic UI updates
3. **Responsiveness**: Seamless experience across all devices
4. **Accessibility**: WCAG compliant with keyboard navigation support
5. **Consistency**: Unified design language across all portals

### Component Design

- **Atomic Design**: Building from atoms to organisms
- **Composition**: Highly reusable and composable components
- **Separation of Concerns**: Logic separated from presentation
- **Type Safety**: Full TypeScript coverage for reliability

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile-First Approach

- Touch-optimized interfaces
- Simplified navigation patterns
- Performance-optimized for slower connections

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. **Code Style**: Follow the existing code style and conventions
2. **TypeScript**: Use proper types, avoid `any`
3. **Components**: Create reusable, well-documented components
4. **Commits**: Write clear, descriptive commit messages
5. **Testing**: Add tests for new features (when testing is implemented)

### Contribution Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**KabriAcid**

- GitHub: [@KabriAcid](https://github.com/KabriAcid)
- Project Repository: [Scora](https://github.com/KabriAcid/scora)

## 🙏 Acknowledgments

- Thanks to all contributors and supporters of grassroots Nigerian football
- Built with modern web technologies and best practices
- Inspired by the passion of local football communities

## 📞 Support

For support, questions, or feedback:

- Open an issue on GitHub
- Contact: [Your Email/Contact Info]

---

Built with ❤️ for Nigerian Football 🇳🇬⚽

```

```
