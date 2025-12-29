# Match Lineup UI Component

A professional, reusable football/soccer match lineup component built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ Horizontal pitch layout with teams facing each other
- ✅ Gray pitch lines on dark background
- ✅ Multiple formation support (4-4-2, 4-3-3, 4-2-3-1, 3-5-2, etc.)
- ✅ Interactive player badges with hover tooltips
- ✅ Staggered fade-in animations
- ✅ Fully typed props for easy integration
- ✅ Responsive design

---

## Quick Start

### Basic Usage

```tsx
import MatchLineup from "@/components/lineup/MatchLineup";
import { TeamLineup } from "@/types/lineup";

const homeTeam: TeamLineup = {
  name: "Chelsea",
  formation: "4-3-3",
  players: [
    { number: 1, name: "Goalkeeper", position: "GK" },
    { number: 2, name: "Right Back", position: "RB" },
    // ... 11 players total
  ],
};

const awayTeam: TeamLineup = {
  name: "Liverpool",
  formation: "4-3-3",
  players: [
    { number: 1, name: "Goalkeeper", position: "GK" },
    // ... 11 players total
  ],
};

<MatchLineup
  homeTeam={homeTeam}
  awayTeam={awayTeam}
  matchInfo={{
    competition: "Premier League",
    venue: "Stamford Bridge",
    date: "December 29, 2025",
  }}
/>
```

---

## Props Reference

### `MatchLineupProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `homeTeam` | `TeamLineup` | ✅ | Left side team data |
| `awayTeam` | `TeamLineup` | ✅ | Right side team data |
| `matchInfo` | `object` | ❌ | Optional match details |

### `TeamLineup`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | ✅ | Team name |
| `formation` | `string` | ✅ | Formation pattern (e.g., "4-3-3") |
| `players` | `Player[]` | ✅ | Array of 11 players |
| `color` | `string` | ❌ | Custom team color (optional) |

### `Player`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `number` | `number` | ✅ | Jersey number |
| `name` | `string` | ✅ | Player name |
| `position` | `string` | ❌ | Position abbreviation (GK, CB, etc.) |

### `matchInfo`

| Property | Type | Description |
|----------|------|-------------|
| `competition` | `string` | League/cup name |
| `venue` | `string` | Stadium name |
| `date` | `string` | Match date |

---

## Supported Formations

The component supports these formations out of the box:

| Formation | Description |
|-----------|-------------|
| `4-4-2` | Classic 4 defenders, 4 midfielders, 2 strikers |
| `4-3-3` | 4 defenders, 3 midfielders, 3 forwards |
| `4-2-3-1` | 4 defenders, 2 CDMs, 3 attacking mids, 1 striker |
| `3-5-2` | 3 CBs, 5 midfielders with wingbacks, 2 strikers |
| `3-4-3` | 3 defenders, 4 midfielders, 3 forwards |
| `5-3-2` | 5 defenders (3 CBs + wingbacks), 3 mids, 2 strikers |
| `4-1-4-1` | 4 defenders, 1 CDM, 4 midfielders, 1 striker |

### Adding Custom Formations

Edit `src/utils/formations.ts`:

```ts
export const HOME_FORMATIONS: FormationPositions = {
  // Add your custom formation
  "4-1-2-1-2": [
    { x: 5, y: 50 },   // GK
    { x: 18, y: 15 },  // LB
    { x: 18, y: 38 },  // CB
    { x: 18, y: 62 },  // CB
    { x: 18, y: 85 },  // RB
    { x: 28, y: 50 },  // CDM
    { x: 36, y: 30 },  // CM
    { x: 36, y: 70 },  // CM
    { x: 42, y: 50 },  // CAM
    { x: 46, y: 35 },  // ST
    { x: 46, y: 65 },  // ST
  ],
};
```

**Position coordinates:**
- `x`: Horizontal position (0-100%), home team uses 0-48%, away team mirrors to 52-100%
- `y`: Vertical position (0-100%), 0% = top, 100% = bottom

---

## Component Architecture

```
src/
├── components/
│   └── lineup/
│       ├── MatchLineup.tsx    # Main wrapper component
│       ├── FootballPitch.tsx  # SVG pitch with lines
│       ├── PlayerBadge.tsx    # Individual player circles
│       └── TeamHeader.tsx     # Team name and formation display
├── types/
│   └── lineup.ts              # TypeScript interfaces
└── utils/
    └── formations.ts          # Formation position mappings
```

---

## Styling & Customization

### Design System Tokens

The component uses CSS custom properties defined in `src/index.css`:

```css
:root {
  /* Pitch colors */
  --pitch-bg: 220 18% 12%;
  --pitch-line: 220 10% 35%;

  /* Team colors */
  --team-home: 217 91% 55%;      /* Blue */
  --team-away: 0 72% 50%;        /* Red */
}
```

### Changing Team Colors

Override the CSS variables or pass custom colors:

```css
/* Custom team colors */
:root {
  --team-home: 142 76% 36%;  /* Green */
  --team-away: 48 96% 53%;   /* Yellow */
}
```

### Player Badge Styling

Badges use these utility classes in `index.css`:

```css
.player-badge {
  @apply relative flex items-center justify-center rounded-full font-bold;
  box-shadow: 0 4px 12px -2px hsla(var(--player-glow), 0.2);
}

.player-badge-home {
  @apply bg-primary text-primary-foreground;
}

.player-badge-away {
  @apply bg-accent text-accent-foreground;
}
```

---

## Player Order Convention

Players must be provided in this order for correct positioning:

### 4-3-3 Example

```
Index:  0    1    2    3    4    5    6    7    8    9    10
Pos:   GK   LB   CB   CB   RB   CM  CDM   CM   LW   ST   RW
```

### 4-4-2 Example

```
Index:  0    1    2    3    4    5    6    7    8    9    10
Pos:   GK   LB   CB   CB   RB   LM   CM   CM   RM   ST   ST
```

**General rule:** Goalkeeper first, then defenders (left to right), midfielders (left to right), forwards (left to right).

---

## Example: Full Implementation

```tsx
import MatchLineup from "@/components/lineup/MatchLineup";

const MyMatchPage = () => {
  const homeTeam = {
    name: "Manchester United",
    formation: "4-2-3-1",
    players: [
      { number: 1, name: "André Onana", position: "GK" },
      { number: 23, name: "Luke Shaw", position: "LB" },
      { number: 5, name: "Harry Maguire", position: "CB" },
      { number: 6, name: "Lisandro Martínez", position: "CB" },
      { number: 20, name: "Diogo Dalot", position: "RB" },
      { number: 18, name: "Casemiro", position: "CDM" },
      { number: 4, name: "Sofyan Amrabat", position: "CDM" },
      { number: 17, name: "Alejandro Garnacho", position: "LM" },
      { number: 8, name: "Bruno Fernandes", position: "CAM" },
      { number: 10, name: "Marcus Rashford", position: "RM" },
      { number: 9, name: "Rasmus Højlund", position: "ST" },
    ],
  };

  const awayTeam = {
    name: "Tottenham",
    formation: "4-3-3",
    players: [
      { number: 1, name: "Guglielmo Vicario", position: "GK" },
      { number: 33, name: "Ben Davies", position: "LB" },
      { number: 17, name: "Cristian Romero", position: "CB" },
      { number: 37, name: "Micky van de Ven", position: "CB" },
      { number: 23, name: "Pedro Porro", position: "RB" },
      { number: 29, name: "Pape Sarr", position: "CM" },
      { number: 5, name: "Pierre-Emile Højbjerg", position: "CDM" },
      { number: 8, name: "Yves Bissouma", position: "CM" },
      { number: 7, name: "Heung-Min Son", position: "LW" },
      { number: 10, name: "Richarlison", position: "ST" },
      { number: 21, name: "Dejan Kulusevski", position: "RW" },
    ],
  };

  return (
    <MatchLineup
      homeTeam={homeTeam}
      awayTeam={awayTeam}
      matchInfo={{
        competition: "FA Cup - Round of 16",
        venue: "Old Trafford, Manchester",
        date: "February 10, 2026",
      }}
    />
  );
};

export default MyMatchPage;
```

---

## Tips & Best Practices

1. **Always provide exactly 11 players** - Extra players are ignored, missing players will have undefined positions

2. **Use consistent formations** - Ensure formation string matches a key in `formations.ts`

3. **Player names for tooltips** - Full names work best; abbreviations may confuse users

4. **Responsive sizing** - The pitch uses `aspect-[2/1]` ratio; badges scale with `md:` breakpoints

5. **Dark backgrounds** - The component is designed for dark themes; adjust `--pitch-bg` for light mode if needed

---

## Troubleshooting

| Issue | Solution |a
|-------|----------|
| Players not showing | Check that `players` array has 11 items |
| Wrong positions | Verify formation string matches exactly (e.g., "4-3-3" not "433") |
| Tooltips not appearing | Ensure `TooltipProvider` wraps your app in `App.tsx` |
| Colors not matching | Check CSS variable overrides in `index.css` |
