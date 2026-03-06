import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Clock, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import AgentLayout from "@/components/layout/AgentLayout";
import {
    calendarMatchesData,
    pastCalendarMatchesData,
    CalendarMatch,
} from "@/data/calendarMatches";
import { mockAssignedMatches } from "@/data/agentMockData";
import { cn } from "@/shared/utils/cn";

// Merge all calendar matches
const allMatches: CalendarMatch[] = [
    ...pastCalendarMatchesData,
    ...calendarMatchesData,
];

// Unique sorted date labels from the data
const allDates = [...new Set(allMatches.map((m) => m.date))];

// Status config using design system tokens
const statusConfig = {
    live: {
        label: "LIVE",
        className: "bg-green-500/15 text-green-600 dark:text-green-400",
        dot: "bg-green-500 animate-pulse",
    },
    scheduled: {
        label: "UPCOMING",
        className: "bg-accent/10 text-accent",
        dot: "bg-accent",
    },
    finished: {
        label: "FT",
        className: "bg-muted text-muted-foreground",
        dot: "bg-muted-foreground",
    },
};

const MatchRowSkeleton = () => (
    <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl">
        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2 min-w-0">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-6 w-14 rounded-full flex-shrink-0" />
    </div>
);

const AgentCalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState<string>(
        allDates[allDates.length - 1] ?? allDates[0]
    );
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<
        "all" | "live" | "scheduled" | "finished" | "assigned"
    >("all");

    // Set of assigned match IDs for highlighting
    const assignedMatchLabels = useMemo(
        () =>
            new Set(
                mockAssignedMatches.map(
                    (m) => `${m.homeTeam.toLowerCase()} vs ${m.awayTeam.toLowerCase()}`
                )
            ),
        []
    );

    useEffect(() => {
        setLoading(true);
        const t = setTimeout(() => setLoading(false), 700);
        return () => clearTimeout(t);
    }, [selectedDate]);

    const matchesForDate = useMemo(() => {
        const matches = allMatches.filter((m) => m.date === selectedDate);
        if (activeFilter === "all") return matches;
        if (activeFilter === "assigned")
            return matches.filter((m) =>
                assignedMatchLabels.has(
                    `${m.homeTeam.name.toLowerCase()} vs ${m.awayTeam.name.toLowerCase()}`
                )
            );
        return matches.filter((m) => m.status === activeFilter);
    }, [selectedDate, activeFilter, assignedMatchLabels]);

    const isAssigned = (match: CalendarMatch) =>
        assignedMatchLabels.has(
            `${match.homeTeam.name.toLowerCase()} vs ${match.awayTeam.name.toLowerCase()}`
        );

    const filters: Array<{
        key: typeof activeFilter;
        label: string;
    }> = [
            { key: "all", label: "All" },
            { key: "live", label: "Live" },
            { key: "scheduled", label: "Upcoming" },
            { key: "finished", label: "Finished" },
            { key: "assigned", label: "Assigned" },
        ];

    const currentDateIndex = allDates.indexOf(selectedDate);

    return (
        <AgentLayout>
            <div className="min-h-screen bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between"
                    >
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                                Match Calendar
                            </h1>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {matchesForDate.length} match
                                {matchesForDate.length !== 1 ? "es" : ""} on {selectedDate}
                            </p>
                        </div>
                        {/* Date Navigation Arrows */}
                        <div className="flex items-center gap-1">
                            <motion.button
                                whileTap={{ scale: 0.92 }}
                                disabled={currentDateIndex === 0}
                                onClick={() =>
                                    setSelectedDate(allDates[currentDateIndex - 1])
                                }
                                className={cn(
                                    "p-2 rounded-lg transition-colors",
                                    currentDateIndex === 0
                                        ? "text-muted-foreground/30 cursor-not-allowed"
                                        : "hover:bg-secondary text-foreground"
                                )}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.92 }}
                                disabled={currentDateIndex === allDates.length - 1}
                                onClick={() =>
                                    setSelectedDate(allDates[currentDateIndex + 1])
                                }
                                className={cn(
                                    "p-2 rounded-lg transition-colors",
                                    currentDateIndex === allDates.length - 1
                                        ? "text-muted-foreground/30 cursor-not-allowed"
                                        : "hover:bg-secondary text-foreground"
                                )}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Date Strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                    >
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {allDates.map((date) => {
                                const isSelected = date === selectedDate;
                                const parts = date.split(", ");
                                const shortDay = parts[0]?.slice(0, 3) ?? parts[0];
                                const dayNum = parts[1]?.split(" ")[0];
                                return (
                                    <motion.button
                                        key={date}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedDate(date)}
                                        className={cn(
                                            "flex-shrink-0 flex flex-col items-center px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors min-w-[52px] sm:min-w-[60px]",
                                            isSelected
                                                ? "bg-accent text-primary-foreground shadow-md"
                                                : "bg-secondary text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                                        )}
                                    >
                                        <span className="text-[10px] sm:text-xs uppercase tracking-wide">
                                            {shortDay}
                                        </span>
                                        <span className="text-base sm:text-lg font-bold mt-0.5">
                                            {dayNum}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Filter Pills */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
                    >
                        {filters.map((f) => (
                            <button
                                key={f.key}
                                onClick={() => setActiveFilter(f.key)}
                                className={cn(
                                    "flex-shrink-0 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors",
                                    activeFilter === f.key
                                        ? "bg-accent text-accent-foreground"
                                        : "bg-secondary text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {f.label}
                            </button>
                        ))}
                    </motion.div>

                    {/* Matches List */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedDate + activeFilter}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                        >
                            {loading ? (
                                <Card className="rounded-2xl overflow-hidden border border-border/60 divide-y divide-border/40">
                                    {[1, 2, 3].map((i) => (
                                        <MatchRowSkeleton key={i} />
                                    ))}
                                </Card>
                            ) : matchesForDate.length === 0 ? (
                                <Card className="rounded-2xl p-10 text-center border border-border/60">
                                    <p className="text-muted-foreground text-sm">
                                        No matches for this filter on {selectedDate}.
                                    </p>
                                </Card>
                            ) : (
                                <Card className="rounded-2xl overflow-hidden border border-border/60 divide-y divide-border/40">
                                    {matchesForDate.map((match, index) => {
                                        const cfg = statusConfig[match.status];
                                        const assigned = isAssigned(match);
                                        return (
                                            <motion.div
                                                key={match.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.04 }}
                                                className={cn(
                                                    "flex items-center gap-3 sm:gap-4 px-4 py-3 sm:py-4 hover:bg-secondary/40 transition-colors group cursor-pointer",
                                                    assigned && "bg-primary/5 hover:bg-primary/10"
                                                )}
                                            >
                                                {/* Time Column */}
                                                <div className="flex flex-col items-center min-w-[44px] sm:min-w-[52px]">
                                                    {match.status === "finished" ? (
                                                        <span className="text-xs font-bold text-muted-foreground">
                                                            FT
                                                        </span>
                                                    ) : match.status === "live" ? (
                                                        <>
                                                            <span className="text-xs font-bold text-green-600 dark:text-green-400">
                                                                LIVE
                                                            </span>
                                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mt-1" />
                                                        </>
                                                    ) : (
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                                            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                                                                {match.time}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Teams Column */}
                                                <div className="flex-1 min-w-0 space-y-1.5">
                                                    {/* Home Team */}
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={match.homeLogo}
                                                            alt={match.homeTeam.shortName}
                                                            className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
                                                        />
                                                        <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                                                            {match.homeTeam.responsiveName}
                                                        </span>
                                                    </div>
                                                    {/* Away Team */}
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={match.awayLogo}
                                                            alt={match.awayTeam.shortName}
                                                            className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
                                                        />
                                                        <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                                                            {match.awayTeam.responsiveName}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Score or Dash */}
                                                <div className="flex flex-col items-end gap-1.5 min-w-[24px]">
                                                    {match.status === "finished" ? (
                                                        <>
                                                            <span
                                                                className={cn(
                                                                    "text-sm sm:text-base font-bold tabular-nums",
                                                                    match.homeScore! > match.awayScore!
                                                                        ? "text-foreground"
                                                                        : "text-muted-foreground"
                                                                )}
                                                            >
                                                                {match.homeScore}
                                                            </span>
                                                            <span
                                                                className={cn(
                                                                    "text-sm sm:text-base font-bold tabular-nums",
                                                                    match.awayScore! > match.homeScore!
                                                                        ? "text-foreground"
                                                                        : "text-muted-foreground"
                                                                )}
                                                            >
                                                                {match.awayScore}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-muted-foreground/40 text-xs">
                                                                –
                                                            </span>
                                                            <span className="text-muted-foreground/40 text-xs">
                                                                –
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Right: Venue + Assigned badge */}
                                                <div className="hidden sm:flex flex-col items-end gap-1 min-w-[100px] max-w-[140px]">
                                                    <div className="flex items-center gap-1 text-muted-foreground">
                                                        <MapPin className="w-3 h-3 flex-shrink-0" />
                                                        <span className="text-[11px] truncate">
                                                            {match.venue}
                                                        </span>
                                                    </div>
                                                    {assigned && (
                                                        <span className="flex items-center gap-1 text-[10px] font-semibold text-primary">
                                                            <Star className="w-3 h-3 fill-primary" />
                                                            Assigned
                                                        </span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </Card>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </AgentLayout>
    );
};

export default AgentCalendarPage;
