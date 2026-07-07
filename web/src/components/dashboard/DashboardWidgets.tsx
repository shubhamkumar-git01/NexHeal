import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Wind, Heart } from "lucide-react";

export function DashboardWidgets() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Weather Widget */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">Weather</p>
            <h3 className="text-2xl font-bold">28°C</h3>
            <p className="text-sm text-blue-100 mt-1">Partly Cloudy</p>
          </div>
          <Cloud className="w-10 h-10 text-blue-200 opacity-80" />
        </CardContent>
      </Card>

      {/* AQI Widget */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-xs font-medium uppercase tracking-wider mb-1">Air Quality</p>
            <h3 className="text-2xl font-bold">45 AQI</h3>
            <p className="text-sm text-emerald-100 mt-1">Good (Safe)</p>
          </div>
          <Wind className="w-10 h-10 text-emerald-200 opacity-80" />
        </CardContent>
      </Card>

      {/* Health Score Widget */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-xs font-medium uppercase tracking-wider mb-1">System Status</p>
            <h3 className="text-2xl font-bold">99.9%</h3>
            <p className="text-sm text-purple-100 mt-1">All Systems Operational</p>
          </div>
          <Heart className="w-10 h-10 text-purple-200 opacity-80" />
        </CardContent>
      </Card>
    </div>
  );
}
