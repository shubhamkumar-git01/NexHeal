import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2, Eye } from "lucide-react";

interface RecordCardProps {
  id: string;
  type: string;
  date: string;
  size: string;
  uploadedBy: string;
  idx: number;
  canDelete?: boolean;
  onDelete?: (id: string) => void;
}

export function RecordCard({ id, type, date, size, idx, canDelete, onDelete }: RecordCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
    >
      <Card className="shadow-sm hover:shadow-md transition-all group">
        <CardContent className="p-5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground leading-tight">{type}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{date} • {size}</p>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Download className="w-4 h-4" />
            </Button>
            {canDelete && (
              <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => onDelete?.(id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
