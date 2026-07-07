export const ChartColors = {
  primary: "#6366f1", // indigo-500
  secondary: "#14b8a6", // teal-500
  tertiary: "#f59e0b", // amber-500
  quaternary: "#ec4899", // pink-500
  success: "#10b981", // emerald-500
  warning: "#f59e0b", // amber-500
  danger: "#ef4444", // red-500
  info: "#3b82f6", // blue-500
  gray: "#94a3b8", // slate-400
  
  // Array for multi-series charts like Pie
  palette: [
    "#6366f1", "#14b8a6", "#f59e0b", "#ec4899", 
    "#3b82f6", "#8b5cf6", "#10b981", "#ef4444"
  ]
};

export const ChartConfig = {
  fontFamily: "inherit",
  tooltipStyle: {
    backgroundColor: "rgba(15, 23, 42, 0.9)", // slate-900
    color: "#f8fafc", // slate-50
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    fontSize: "12px",
    padding: "8px 12px"
  },
  axisStyle: {
    stroke: "#94a3b8", // slate-400
    fontSize: 12,
  },
  gridStyle: {
    stroke: "#e2e8f0", // slate-200
    strokeDasharray: "3 3",
  }
};
