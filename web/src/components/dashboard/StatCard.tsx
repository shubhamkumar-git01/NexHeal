import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ElementType } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ElementType;
  description: string;
  highlightText?: string;
  highlightColor?: "success" | "warning" | "destructive" | "primary";
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  highlightText,
  highlightColor = "success"
}: StatCardProps) {
  
  const colorMap = {
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
    primary: "text-primary"
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {highlightText && (
            <span className={`${colorMap[highlightColor]} font-medium mr-1`}>
              {highlightText}
            </span>
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
