import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingDown, TrendingUp } from "lucide-react";

export function HealthInsights() {
  const insights = [
    {
      title: "Patient Volume Increase",
      desc: "You've seen 15% more patients this week compared to last week.",
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
    },
    {
      title: "AI Prescription Usage",
      desc: "AI assisted in 45% of your diagnoses today, saving ~2 hours.",
      icon: Lightbulb,
      color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
    },
    {
      title: "Reduced Wait Times",
      desc: "Average patient wait time decreased by 12 minutes.",
      icon: TrendingDown,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
    }
  ];

  return (
    <Card className="shadow-sm border-slate-200 dark:border-slate-800 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-amber-500" />
          Health Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
