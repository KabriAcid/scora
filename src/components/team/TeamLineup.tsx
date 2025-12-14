interface Player {
  name: string;
  number: number;
  position: { x: number; y: number };
}

interface TeamLineupProps {
  players: Player[];
  color: "blue" | "red";
}

export const TeamLineup = ({ players, color }: TeamLineupProps) => {
  return (
    <div className="relative w-full h-64 bg-success/5 rounded-xl border-2 border-success/20 overflow-hidden">
      {/* Field lines */}
      <div className="absolute inset-x-0 top-1/2 h-0.5 bg-success/20" />
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-success/20" />
      
      {/* Players */}
      {players.map((player, index) => (
        <div
          key={index}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${player.position.x}%`,
            top: `${player.position.y}%`,
          }}
        >
          <div className="flex flex-col items-center gap-1">
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg",
                color === "blue" ? "bg-blue-600 text-white" : "bg-red-600 text-white"
              )}
            >
              {player.number}
            </div>
            <span className="text-[10px] font-medium text-foreground/70 whitespace-nowrap">
              {player.name.split(' ').pop()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
