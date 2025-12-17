import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface AssignedMatch {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeTeamLogo: string;
    awayTeamLogo: string;
    status: "scheduled" | "live" | "completed";
    startTime: Date;
    venue: string;
    league: string;
    homeScore?: number;
    awayScore?: number;
}

interface LiveMatchHeaderProps {
    match: AssignedMatch;
    homeScore: number;
    awayScore: number;
}

const LiveMatchHeader = ({ match, homeScore, awayScore }: LiveMatchHeaderProps) => {
    return (
        <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-2">
            <div className="flex items-center justify-between gap-4 md:gap-8">
                {/* Home Team */}
                <div className="flex flex-col items-center gap-3">
                    <img
                        src={match.homeTeamLogo}
                        alt={match.homeTeam}
                        className="w-16 h-16 md:w-24 md:h-24 object-contain"
                    />
                    <div className="text-center">
                        <h3 className="text-lg md:text-2xl font-bold">{match.homeTeam}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">{match.venue}</p>
                    </div>
                </div>

                {/* Score & League */}
                <div className="flex flex-col items-center gap-2">
                    <div className="text-3xl md:text-5xl font-bold">
                        {homeScore} - {awayScore}
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground font-semibold">{match.league}</p>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center gap-3">
                    <img
                        src={match.awayTeamLogo}
                        alt={match.awayTeam}
                        className="w-16 h-16 md:w-24 md:h-24 object-contain"
                    />
                    <div className="text-center">
                        <h3 className="text-lg md:text-2xl font-bold">{match.awayTeam}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">{match.venue}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default LiveMatchHeader;
