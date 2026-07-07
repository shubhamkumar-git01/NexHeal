import { UserProfile } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function WelcomeSection({ user }: { user: UserProfile | null }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  const isPatient = user?.role?.toLowerCase() === 'patient';
  
  const quotes = isPatient ? [
    "Health is a state of body. Wellness is a state of being.",
    "Take care of your body. It's the only place you have to live.",
    "A healthy outside starts from the inside."
  ] : [
    "Wherever the art of Medicine is loved, there is also a love of Humanity. – Hippocrates",
    "Let food be thy medicine and medicine be thy food. – Hippocrates",
    "The good physician treats the disease; the great physician treats the patient who has the disease. – William Osler"
  ];
  const randomQuote = quotes[new Date().getDate() % quotes.length];

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white dark:bg-[#09090b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 ring-4 ring-slate-50 dark:ring-slate-900 shadow-sm">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstName || 'User'}`} />
          <AvatarFallback className="text-xl bg-primary text-primary-foreground">
            {user?.firstName?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {getGreeting()}, {isPatient ? '' : 'Dr. '}{user?.firstName || "User"} {user?.lastName || ""}! 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {user?.role || "Healthcare Provider"} • {today}
          </p>
        </div>
      </div>
      
      <div className="hidden lg:block max-w-sm text-right">
        <p className="text-sm italic text-slate-500 dark:text-slate-400 leading-relaxed border-l-2 border-primary/20 pl-4 py-1">
          &quot;{randomQuote}&quot;
        </p>
      </div>
    </div>
  );
}
