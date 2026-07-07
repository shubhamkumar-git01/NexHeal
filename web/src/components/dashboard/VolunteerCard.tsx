import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, MapPin, Phone, Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

interface VolunteerCardProps {
  id: number;
  name: string;
  type: string;
  location: string;
  phone: string;
  available: boolean;
  idx: number;
}

export function VolunteerCard({ name, type, location, phone, available, idx }: VolunteerCardProps) {
  const isBlood = type.includes("Blood");

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.1 }}
    >
      <Card className="shadow-sm hover:border-destructive/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
              {isBlood ? <Droplet className="w-6 h-6 fill-current" /> : <HeartHandshake className="w-6 h-6" />}
            </div>
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              available ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
            )}>
              {available ? 'Available Now' : 'Busy'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-foreground">{name}</h3>
          <p className="text-sm font-medium text-destructive mt-1">{type}</p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" /> {location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="w-4 h-4 mr-2" /> {phone}
            </div>
          </div>
          
          <Button 
            variant={available ? "default" : "outline"} 
            className="w-full mt-6"
            disabled={!available}
          >
            Contact Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
