import { motion } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { TeamStanding } from "@/data/standings";

interface MatchStandingsTableProps {
    homeTeamStanding: TeamStanding;
    awayTeamStanding: TeamStanding;
}

const PositionIndicator = ({ position }: { position: number }) => {
    if (position <= 4) {
        return <div className="w-1 h-full rounded-full bg-success absolute left-0" />;
    }
    if (position >= 18) {
        return <div className="w-1 h-full rounded-full bg-destructive absolute left-0" />;
    }
    return null;
};

export const MatchStandingsTable = ({
    homeTeamStanding,
    awayTeamStanding,
}: MatchStandingsTableProps) => {
    const standings = [homeTeamStanding, awayTeamStanding];

    return (
        <div className="space-y-2 overflow-x-auto">
            {/* Column Headers */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-[28px_minmax(90px,0.8fr)_40px_40px_40px_40px_40px_40px_48px_48px] gap-2 px-4 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider min-w-[600px]"
            >
                <span className="pl-2">#</span>
                <span>Team</span>
                <span className="text-center">P</span>
                <span className="text-center">W</span>
                <span className="text-center">D</span>
                <span className="text-center">L</span>
                <span className="text-center">GF</span>
                <span className="text-center">GA</span>
                <span className="text-center">GD</span>
                <span className="text-right">PTS</span>
            </motion.div>

            {/* Standings Rows */}
            <div className="space-y-2">
                {standings.map((entry, index) => (
                    <motion.div
                        key={entry.position}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 100,
                        }}
                        className="relative grid grid-cols-[28px_minmax(90px,0.8fr)_40px_40px_40px_40px_40px_40px_48px_48px] gap-2 items-center px-4 py-4 bg-card rounded-xl min-w-[600px]"
                    >
                        <PositionIndicator position={entry.position} />

                        {/* Position */}
                        <span
                            className={cn(
                                "text-sm font-bold pl-2",
                                entry.position <= 4 && "text-success",
                                entry.position >= 18 && "text-destructive"
                            )}
                        >
                            {entry.position}
                        </span>

                        {/* Team */}
                        <div className="flex items-center gap-1">
                            <img
                                src={entry.team.badgeUrl}
                                alt={entry.team.shortName}
                                className="w-8 h-8 object-contain flex-shrink-0"
                            />
                            <span className="text-sm font-semibold truncate">
                                {entry.team.responsiveName}
                            </span>
                        </div>

                        {/* P */}
                        <span className="text-sm text-center font-medium">
                            {entry.played}
                        </span>

                        {/* W */}
                        <span className="text-sm text-center text-success font-medium">
                            {entry.win}
                        </span>

                        {/* D */}
                        <span className="text-sm text-center text-muted-foreground font-medium">
                            {entry.draw}
                        </span>

                        {/* L */}
                        <span className="text-sm text-center text-destructive font-medium">
                            {entry.loss}
                        </span>

                        {/* GF (Goals For) */}
                        <span className="text-sm text-center font-medium text-success/80">
                            {entry.gf}
                        </span>

                        {/* GA (Goals Against) */}
                        <span className="text-sm text-center font-medium text-destructive/80">
                            {entry.ga}
                        </span>

                        {/* GD (Goal Difference) */}
                        <span
                            className={cn(
                                "text-sm text-center font-bold",
                                entry.gd > 0 && "text-success",
                                entry.gd < 0 && "text-destructive",
                                entry.gd === 0 && "text-muted-foreground"
                            )}
                        >
                            {entry.gd > 0 ? "+" : ""}
                            {entry.gd}
                        </span>

                        {/* Points */}
                        <div className="text-right">
                            <span className="text-lg font-bold text-primary">
                                {entry.points}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
