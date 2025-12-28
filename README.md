# Scora

**Live Football Scores for Nigerian Local Leagues**

## 🎯 Project Overview

Scora is a Nigerian local live-score web application designed to bring real-time match updates to grassroots and semi-professional football leagues that operate without traditional live coverage. By connecting fans directly with on-field action through live agents, Scora bridges the gap between local football and digital engagement.

## 🚀 The Problem

Many grassroots and semi-professional football leagues in Nigeria lack real-time match coverage, leaving fans without reliable access to match events as they happen. Unlike professional leagues with automated tracking systems, these local leagues have no infrastructure for live updates, making it difficult for supporters to follow their teams.

## 💡 The Solution

Scora provides a web-based live-score platform powered by **on-field live agents** who are physically present at match venues. These agents record and submit live match events directly from the pitch, including:

- ⚽ Goals
- 🟨 Yellow Cards
- 🟥 Red Cards
- ⚠️ Fouls
- 🚩 Corner Kicks
- 🔄 Substitutions
- 📊 Other key football actions

## 👥 User Roles

### 1. Regular Users

- **Objective**: View live matches, fixtures, results, and match statistics in real time
- **Access**: Clean and intuitive dashboard for following local football matches
- **Features**: Live scores, match details, team lineups, standings, and fixtures

### 2. Live Agents

- **Objective**: Record and submit match events as they occur on the field
- **Access**: Dedicated dashboard with event logging tools
- **Assignment**: Assigned to specific matches by administrators

### 3. Administrators

- **Objective**: Manage the overall system infrastructure
- **Capabilities**:
  - Create and manage leagues
  - Add stadiums, teams, and players
  - Generate fixtures
  - Assign agents to matches

## 📌 Current Development Stage

The project is currently focused on designing and implementing the **Regular User Dashboard**, ensuring a smooth, engaging, and reliable experience for fans following local football matches.

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

```

## 🎯 Key Features (Regular User Dashboard)

### 1. Home Page
- Featured match display with live scores
- Today's matches list
- Date selector for viewing matches by date
- Loading skeletons for better UX

### 2. Match Details
- Live match scores and team information
- **Lineups Tab**: Starting XI and substitutes with formations
- **Stats Tab**: Possession, shots, corners, fouls comparisons
- **Summary Tab**: Match events timeline (goals, cards, substitutions)
- **H2H Tab**: Head-to-head statistics between teams

### 3. Fixtures Calendar
- Matchweek navigation (1-38)
- Matches grouped by date
- Status indicators (scheduled, live, finished)
- Score display with team logos

### 4. League Standings
- Complete league table
- Statistics: Wins, Draws, Losses, Goals For/Against, Points
- Form indicators (last 5 matches)
- Position highlights (promotion, relegation zones)

## 🗺️ Roadmap

- [x] Regular User Dashboard (Current Focus)
  - [x] Home page with live matches
  - [x] Match details with tabs
  - [x] Fixtures calendar
  - [x] League standings
- [ ] API Integration
  - [ ] Replace mock data with real backend
  - [ ] WebSocket for live updates
- [ ] Live Agent Dashboard
  - [ ] Event logging interface
  - [ ] Match assignment view
- [ ] Administrator Dashboard
  - [ ] League management
  - [ ] Team and player management
  - [ ] Fixture generation
  - [ ] Agent assignment
- [ ] User Authentication
- [ ] Real-time notifications
- [ ] Mobile application (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**KabriAcid**
- GitHub: [@KabriAcid](https://github.com/KabriAcid)

---

Built with ❤️ for Nigerian Football 🇳🇬⚽
```
