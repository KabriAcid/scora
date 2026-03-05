import { motion } from "framer-motion";
import { Target } from "lucide-react";
import AgentLayout from "@/components/layout/AgentLayout";

const AssignedMatchesPage = () => {
    return (
        <AgentLayout>
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
                        <Target className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h1 className="text-xl font-bold text-foreground">Assigned Matches</h1>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        Your assigned matches will be listed here. Coming soon.
                    </p>
                </motion.div>
            </div>
        </AgentLayout>
    );
};

export default AssignedMatchesPage;

