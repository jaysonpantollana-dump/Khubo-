import { Home, MessageSquare, Users, Map, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function BottomNav() {
  const items = [
    { icon: Home, label: 'Home', active: true },
    { icon: MessageSquare, label: 'Messages', active: false },
    { icon: Users, label: 'Roommate', active: false },
    { icon: Map, label: 'Maps', active: false },
    { icon: User, label: 'Profile', active: false },
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[400px] sm:w-auto">
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2 sm:px-6 sm:py-3 flex items-center justify-between sm:justify-start gap-2 sm:gap-8 shadow-2xl shadow-black/30"
      >
        {items.map((item, idx) => (
          <button 
            key={idx}
            className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-all duration-200 ${item.active ? 'text-[#17294F]' : 'text-white/70 hover:text-white'}`}
          >
            <item.icon className="w-4 h-4 sm:w-[22px] sm:h-[22px]" strokeWidth={item.active ? 2.5 : 2} />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </motion.nav>
    </div>
  );
}
