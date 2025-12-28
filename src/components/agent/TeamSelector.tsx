import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

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
                        <motion.div
                            className="w-2.5 h-2.5 rounded-full bg-green-500 mx-auto mt-2"
                            animate={{ opacity: [1, 0.6, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    )}
                </motion.button>

                {/* Away Team */}
                <motion.button
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
                        <motion.div
                            className="w-2.5 h-2.5 rounded-full bg-green-500 mx-auto mt-2"
                            animate={{ opacity: [1, 0.6, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    )}
                </motion.button>
            </div>
        </Card>
    );
};

export default TeamSelector;
