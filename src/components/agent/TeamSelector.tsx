import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TeamSelectorProps {
    homeTeam: string;
    awayTeam: string;
    activeTeam: string | null;
    onSelectTeam: (team: string) => void;
    homeTeamLogo: string;
    awayTeamLogo: string;
}

const TeamSelector = ({
    homeTeam,
    awayTeam,
    activeTeam,
    onSelectTeam,
    homeTeamLogo,
    awayTeamLogo,
}: TeamSelectorProps) => {
    return (
        <Card className="p-4 md:p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">SELECT TEAM</h3>
            <div className="grid grid-cols-2 gap-4">
                {/* Home Team */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectTeam(homeTeam)}
                    className={`p-4 rounded-lg border-2 transition-all ${activeTeam === homeTeam
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                >
                    <img
                        src={homeTeamLogo}
                        alt={homeTeam}
                        className="w-12 h-12 md:w-16 md:h-16 object-contain mx-auto mb-2"
                    />
                    <p className="text-sm font-semibold">{homeTeam}</p>
                    {activeTeam === homeTeam && (
                        <Badge className="mt-2 w-full justify-center">Active</Badge>
                    )}
                </motion.button>

                {/* Away Team */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectTeam(awayTeam)}
                    className={`p-4 rounded-lg border-2 transition-all ${activeTeam === awayTeam
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-accent/50"
                        }`}
                >
                    <img
                        src={awayTeamLogo}
                        alt={awayTeam}
                        className="w-12 h-12 md:w-16 md:h-16 object-contain mx-auto mb-2"
                    />
                    <p className="text-sm font-semibold">{awayTeam}</p>
                    {activeTeam === awayTeam && (
                        <Badge variant="secondary" className="mt-2 w-full justify-center">Active</Badge>
                    )}
                </motion.button>
            </div>
        </Card>
    );
};

export default TeamSelector;
