import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AppointmentItemProps {
  patientInitial: string;
  patientName: string;
  type: string;
  timeString: string;
  status: string;
  onClick?: () => void;
}

export function AppointmentItem({ 
  patientInitial, 
  patientName, 
  type, 
  timeString, 
  status,
  onClick 
}: AppointmentItemProps) {
  
  const isPending = status === 'PENDING' || status === 'Waiting';
  
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-4 border border-border rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        onClick && "hover:bg-muted cursor-pointer"
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
          {patientInitial}
        </div>
        <div>
          <p className="font-medium text-foreground">{patientName}</p>
          <p className="text-sm text-muted-foreground">{type}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-foreground">{timeString}</p>
        <span className={cn(
          "text-xs px-2 py-1 rounded-full font-medium",
          isPending 
            ? "bg-warning/10 text-warning" 
            : "bg-success/10 text-success"
        )}>
          {status}
        </span>
      </div>
    </motion.div>
  );
}
