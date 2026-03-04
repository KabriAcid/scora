import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Play, Pause, Clock, Flag, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type MatchPhase =
  | "idle"
  | "first_half"
  | "paused_1st"
  | "half_time"
  | "second_half"
  | "paused_2nd"
  | "full_time";

interface MatchControlPanelProps {
  matchPhase: MatchPhase;
  onKickOff: () => void;
  onPause: () => void;
  onResume: () => void;
  onHalfTime: () => void;
  onSecondHalf: () => void;
  onFullTime: () => void;
}

const MatchControlPanel = ({
  matchPhase,
  onKickOff,
  onPause,
  onResume,
  onHalfTime,
  onSecondHalf,
  onFullTime,
}: MatchControlPanelProps) => {
  const isFirstHalfActive =
    matchPhase === "first_half" || matchPhase === "paused_1st";
  const isSecondHalfActive =
    matchPhase === "second_half" || matchPhase === "paused_2nd";
  const isPaused = matchPhase === "paused_1st" || matchPhase === "paused_2nd";
  const isRunning = matchPhase === "first_half" || matchPhase === "second_half";

  return (
    <Card className="px-4 py-3 border border-border shadow-sm">
      <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
        {/* Kick Off — idle only */}
        {matchPhase === "idle" && (
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button
              onClick={onKickOff}
              size="sm"
              className="gap-1.5 text-xs md:text-sm"
            >
              <Play className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
              Kick Off
            </Button>
          </motion.div>
        )}

        {/* Pause — while a half is running */}
        {isRunning && (
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button
              onClick={onPause}
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs md:text-sm"
            >
              <Pause className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Pause
            </Button>
          </motion.div>
        )}

        {/* Resume — while paused */}
        {isPaused && (
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button
              onClick={onResume}
              size="sm"
              className="gap-1.5 text-xs md:text-sm"
            >
              <Play className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
              Resume
            </Button>
          </motion.div>
        )}

        {/* Half Time — during 1st half (running or paused) */}
        {isFirstHalfActive && (
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button
              onClick={onHalfTime}
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs md:text-sm border-amber-400 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
            >
              <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Half Time
            </Button>
          </motion.div>
        )}

        {/* 2nd Half — during half time break */}
        {matchPhase === "half_time" && (
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button
              onClick={onSecondHalf}
              size="sm"
              className="gap-1.5 text-xs md:text-sm"
            >
              <Play className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
              2nd Half
            </Button>
          </motion.div>
        )}

        {/* Full Time — during 2nd half (running or paused) */}
        {isSecondHalfActive && (
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button
              onClick={onFullTime}
              size="sm"
              variant="destructive"
              className="gap-1.5 text-xs md:text-sm"
            >
              <Flag className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Full Time
            </Button>
          </motion.div>
        )}

        {/* Match Ended — final state */}
        {matchPhase === "full_time" && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-muted-foreground text-xs md:text-sm font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Match Ended
          </div>
        )}
      </div>
    </Card>
  );
};

export default MatchControlPanel;
