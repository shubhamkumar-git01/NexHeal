import { ElementType } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  title: string;
  description: string;
  icon: ElementType;
  type: "destructive" | "warning" | "info";
  onClick?: () => void;
}

export function AlertCard({ title, description, icon: Icon, type, onClick }: AlertCardProps) {
  const styles = {
    destructive: "bg-destructive/10 border-destructive/20 text-destructive",
    warning: "bg-warning/10 border-warning/20 text-warning",
    info: "bg-info/10 border-info/20 text-info"
  };

  const textStyles = {
    destructive: "text-destructive font-semibold",
    warning: "text-warning font-semibold",
    info: "text-info font-semibold"
  };

  const descStyles = {
    destructive: "text-destructive/80",
    warning: "text-warning/80",
    info: "text-info/80"
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }} 
      onClick={onClick}
      className={cn(
        "flex p-4 rounded-xl border cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        styles[type],
        onClick && "hover:bg-opacity-80"
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <Icon className={cn("w-5 h-5 mt-0.5 mr-3 flex-shrink-0", styles[type])} />
      <div>
        <h4 className={textStyles[type]}>{title}</h4>
        <p className={cn("text-sm mt-1", descStyles[type])}>{description}</p>
      </div>
    </motion.div>
  );
}
