import { Search, MapPin, Megaphone, Calendar as CalendarIcon, ChevronDown, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <div className="relative h-[22vh] sm:h-[45vh] min-h-[240px] sm:min-h-[350px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1600')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-[2520px] mx-auto h-full px-4 md:px-12">
        {/* Top bar with Search - Absolute to not affect centering of main content */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between py-4 md:py-6 px-4 md:px-12 gap-4 z-20">
          <button aria-label="Home" className="flex items-center justify-center overflow-hidden w-10 h-10 md:w-16 md:h-16 transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 rounded-xl">
            <img 
              src="/Khuno Logo.png" 
              alt="Khubo Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </button>

          <button aria-label="Announcements" className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 bg-transparent text-white transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full">
            <Megaphone size={20} md:size={30} />
          </button>
        </div>

        {/* Center Content - Perfectly symmetrical */}
        <div className="flex flex-col items-center justify-center text-center h-full pt-8 md:pt-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-row items-center justify-center gap-x-4 md:gap-x-6 text-white px-4"
          >
            <span className="font-noto-serif italic text-xl sm:text-2xl md:text-[35px] tracking-[0.2em] md:tracking-[0.3em] opacity-80 whitespace-nowrap">
              WELCOME TO
            </span>
            <span className="font-roboto font-bold text-2xl sm:text-3xl md:text-[35px] tracking-[0.1em]">
              KHUBO
            </span>
          </motion.h1>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.4 }}
             className="mt-5 md:mt-12 bg-white/10 backdrop-blur-md border border-white/20 p-1 md:p-2 rounded-full flex items-center text-white shadow-2xl w-[98%] md:w-[820px] max-w-[450px] md:max-w-none"
          >
            <div 
              role="button" 
              tabIndex={0} 
              aria-label="Location: Iligan City"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.preventDefault()}
              className="flex-1 min-w-0 flex items-center justify-start px-2 md:pl-6 md:pr-4 py-2 md:py-3.5 hover:bg-white/5 rounded-full transition cursor-pointer group focus-visible:outline-none focus-visible:bg-white/10"
            >
              <div className="flex items-center gap-1 md:gap-3 min-w-0">
                <MapPin className="text-[#2252D6] flex-shrink-0 w-3 h-3 md:w-[16px] md:h-[16px]" />
                <span className="text-[9px] md:text-base font-medium truncate">Iligan City</span>
                <ChevronDown className="flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity w-2 h-2 md:w-3 md:h-3" />
              </div>
            </div>

            <div className="w-[1px] h-4 md:h-8 bg-white/20" />

            <div 
              role="button" 
              tabIndex={0} 
              aria-label="Add dates"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.preventDefault()}
              className="flex-1 flex items-center justify-start px-2 md:pl-6 md:pr-4 py-2 md:py-3.5 hover:bg-white/5 rounded-full transition cursor-pointer group focus-visible:outline-none focus-visible:bg-white/10"
            >
              <div className="flex items-center gap-1 md:gap-3 min-w-0">
                <CalendarIcon className="text-[#2252D6] flex-shrink-0 w-3 h-3 md:w-[16px] md:h-[16px]" />
                <span className="text-[9px] md:text-base font-medium truncate">Dates</span>
                <ChevronDown className="flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity w-2 h-2 md:w-3 md:h-3" />
              </div>
            </div>

            <div className="w-[1px] h-4 md:h-8 bg-white/20" />

            <div 
              role="button" 
              tabIndex={0} 
              aria-label="Add budget"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.preventDefault()}
              className="flex-1 flex items-center justify-start px-2 md:pl-6 md:pr-4 py-2 md:py-3.5 hover:bg-white/5 rounded-full transition cursor-pointer group focus-visible:outline-none focus-visible:bg-white/10"
            >
              <div className="flex items-center gap-1 md:gap-3 min-w-0">
                <Wallet className="text-[#2252D6] flex-shrink-0 w-3 h-3 md:w-[16px] md:h-[16px]" />
                <span className="text-[9px] md:text-base font-medium truncate">Budget</span>
                <ChevronDown className="flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity w-2 h-2 md:w-3 md:h-3" />
              </div>
            </div>

            <button aria-label="Search" className="bg-[#17294F] p-1.5 md:p-4 rounded-full transition-all duration-200 shadow-lg ml-0.5 md:ml-1.5 hover:scale-105 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0">
              <Search size={14} className="text-white group-hover:stroke-[3px] transition-all md:hidden" />
              <Search size={22} className="text-white group-hover:stroke-[3px] transition-all hidden md:block" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
