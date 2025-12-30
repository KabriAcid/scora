import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TeamLineup, Player } from "@/data/matchDetails";

// Formation position mappings (x: 0-100%, y: 0-100%)
// Home team uses left side (0-48%), Away team mirrors to right side (52-100%)
// Positions are calculated to center players accurately on the pitch
const FORMATION_POSITIONS: Record<string, Array<{ x: number; y: number }>> = {
  "4-3-3": [
    { x: 8, y: 50 }, // GK
    { x: 20, y: 18 }, // LB
    { x: 20, y: 40 }, // CB
    { x: 20, y: 60 }, // CB
    { x: 20, y: 82 }, // RB
    { x: 32, y: 32 }, // CM
    { x: 32, y: 50 }, // CM
    { x: 32, y: 68 }, // CM
    { x: 44, y: 22 }, // LW
    { x: 44, y: 50 }, // ST
    { x: 44, y: 78 }, // RW
  ],
  "4-2-3-1": [
    { x: 8, y: 50 }, // GK
    { x: 20, y: 18 }, // LB
    { x: 20, y: 40 }, // CB
    { x: 20, y: 60 }, // CB
    { x: 20, y: 82 }, // RB
    { x: 30, y: 37 }, // CDM
    { x: 30, y: 63 }, // CDM
    { x: 40, y: 22 }, // LM
    { x: 40, y: 50 }, // CAM
    { x: 40, y: 78 }, // RM
    { x: 47, y: 50 }, // ST
  ],
  "4-4-2": [
    { x: 8, y: 50 }, // GK
    { x: 20, y: 18 }, // LB
    { x: 20, y: 40 }, // CB
    { x: 20, y: 60 }, // CB
    { x: 20, y: 82 }, // RB
    { x: 34, y: 18 }, // LM
    { x: 34, y: 40 }, // CM
    { x: 34, y: 60 }, // CM
    { x: 34, y: 82 }, // RM
    { x: 45, y: 40 }, // ST
    { x: 45, y: 60 }, // ST
  ],
  "4-1-4-1": [
    { x: 8, y: 50 }, // GK
    { x: 20, y: 18 }, // LB
    { x: 20, y: 40 }, // CB
    { x: 20, y: 60 }, // CB
    { x: 20, y: 82 }, // RB
    { x: 30, y: 50 }, // CDM
    { x: 38, y: 18 }, // LM
    { x: 38, y: 40 }, // CM
    { x: 38, y: 60 }, // CM
    { x: 38, y: 82 }, // RM
    { x: 47, y: 50 }, // ST
  ],
};

interface FormationVisualizationProps {
  homeFormation: string;
  awayFormation: string;
  homeLineup: Player[];
  awayLineup: Player[];
}

const FormationVisualization = ({
  homeFormation,
  awayFormation,
  homeLineup,
  awayLineup,
}: FormationVisualizationProps) => {
  const homePositions =
    FORMATION_POSITIONS[homeFormation] || FORMATION_POSITIONS["4-3-3"];
  const awayPositions =
    FORMATION_POSITIONS[awayFormation] || FORMATION_POSITIONS["4-3-3"];

  return (
    <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden bg-white">
      {/* Pitch Lines */}
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />

      {/* Center Circle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-gray-200" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300" />

      {/* Penalty Areas */}
      {/* Left Penalty Area */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[15%] h-[60%] border-2 border-l-0 border-gray-200" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[8%] h-[35%] border-2 border-l-0 border-gray-200" />

      {/* Right Penalty Area */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[15%] h-[60%] border-2 border-r-0 border-gray-200" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[8%] h-[35%] border-2 border-r-0 border-gray-200" />

      {/* Home Team Players (Left Side) */}
      {homeLineup.slice(0, 11).map((player, index) => {
        const position = homePositions[index] || { x: 25, y: 50 };
        return (
          <motion.div
            key={player.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
            className="absolute"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-7 h-7 rounded-full bg-primary border border-white flex items-center justify-center shadow-lg">
              <span className="text-[9px] font-bold text-primary-foreground">
                {player.number}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* Away Team Players (Right Side - Mirrored) */}
      {awayLineup.slice(0, 11).map((player, index) => {
        const position = awayPositions[index] || { x: 25, y: 50 };
        const mirroredX = 100 - position.x; // Mirror horizontally
        return (
          <motion.div
            key={player.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
            className="absolute"
            style={{
              left: `${mirroredX}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-7 h-7 rounded-full bg-accent border border-white flex items-center justify-center shadow-lg">
              <span className="text-[9px] font-bold text-accent-foreground">
                {player.number}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

interface MatchLineupsProps {
  homeTeam: TeamLineup;
  awayTeam: TeamLineup;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
}

export const MatchLineups = ({
  homeTeam,
  awayTeam,
  homeTeamName,
  awayTeamName,
  homeTeamLogo,
  awayTeamLogo,
}: MatchLineupsProps) => {
  if (!homeTeam || !awayTeam) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Lineup information not available</p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Team Headers with Formations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start justify-between px-2">
          {/* Home Team */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {homeTeamLogo && (
                <img
                  src={homeTeamLogo}
                  alt={homeTeamName}
                  className="w-6 h-6 object-contain"
                />
              )}
              <span className="text-sm font-semibold">{homeTeamName}</span>
            </div>
            <span className="text-xs text-muted-foreground ml-8">
              {homeTeam.formation}
            </span>
          </div>

          {/* Away Team */}
          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{awayTeamName}</span>
              {awayTeamLogo && (
                <img
                  src={awayTeamLogo}
                  alt={awayTeamName}
                  className="w-6 h-6 object-contain"
                />
              )}
            </div>
            <span className="text-xs text-muted-foreground mr-8">
              {awayTeam.formation}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Formation Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <FormationVisualization
          homeFormation={homeTeam.formation}
          awayFormation={awayTeam.formation}
          homeLineup={homeTeam.lineup}
          awayLineup={awayTeam.lineup}
        />
      </motion.div>

      {/* Managers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="font-semibold mb-3 text-center text-sm">Manager</h3>
        <Card className="p-4 border-none">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{homeTeam.manager}</span>
            <span className="text-sm font-medium">{awayTeam.manager}</span>
          </div>
        </Card>
      </motion.div>

      {/* Lineups List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h3 className="font-semibold mb-3 text-sm">Lineups</h3>
        <Card className="p-4 border-none">
          <div className="grid grid-cols-2 gap-x-4">
            {/* Home Team */}
            <div className="space-y-2">
              {homeTeam.lineup.map((player, index) => (
                <motion.div
                  key={player.id}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <span className="text-xs text-muted-foreground w-5">
                    {player.number}
                  </span>
                  <span className="text-xs font-medium truncate">
                    {player.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Away Team */}
            <div className="space-y-2">
              {awayTeam.lineup.map((player, index) => (
                <motion.div
                  key={player.id}
                  className="flex items-center gap-2 justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <span className="text-xs font-medium truncate text-right">
                    {player.name}
                  </span>
                  <span className="text-xs text-muted-foreground w-5 text-right">
                    {player.number}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Substitutes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h3 className="font-semibold mb-3 text-sm">Substitutes</h3>
        <Card className="p-4 border-none">
          <div className="grid grid-cols-2 gap-x-4">
            {/* Home Team Subs */}
            <div className="space-y-2">
              {homeTeam.substitutes.map((player, index) => (
                <motion.div
                  key={player.id}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <span className="text-xs text-muted-foreground w-5">
                    {player.number}
                  </span>
                  <span className="text-xs truncate">{player.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Away Team Subs */}
            <div className="space-y-2">
              {awayTeam.substitutes.map((player, index) => (
                <motion.div
                  key={player.id}
                  className="flex items-center gap-2 justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <span className="text-xs truncate text-right">
                    {player.name}
                  </span>
                  <span className="text-xs text-muted-foreground w-5 text-right">
                    {player.number}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
