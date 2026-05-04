import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Key, 
  MessageSquare, 
  Map as MapIcon, 
  Tag,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';

interface ReviewBreakdownProps {
  rating: number;
  totalReviews: number;
  breakdown: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
}

const ReviewBreakdown: React.FC<ReviewBreakdownProps> = ({ 
  rating, 
  totalReviews,
  breakdown 
}) => {
  const categories = [
    { label: 'Cleanliness', score: breakdown.cleanliness, icon: Sparkles },
    { label: 'Accuracy', score: breakdown.accuracy, icon: CheckCircle2 },
    { label: 'Check-in', score: breakdown.checkIn, icon: Key },
    { label: 'Communication', score: breakdown.communication, icon: MessageSquare },
    { label: 'Location', score: breakdown.location, icon: MapIcon },
    { label: 'Value', score: breakdown.value, icon: Tag },
  ];

  const ratingBars = [
    { label: '5', percentage: 92 },
    { label: '4', percentage: 5 },
    { label: '3', percentage: 2 },
    { label: '2', percentage: 1 },
    { label: '1', percentage: 0 },
  ];

  return (
    <div className="py-12 border-t border-neutral-100">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left: Overall Rating & Bars */}
        <div className="flex-shrink-0 w-full lg:w-48">
          <div className="mb-6">
            <h3 className="text-lg font-black text-[#17294F] tracking-tight uppercase whitespace-nowrap">
              Overall <span className="text-blue-600">rating</span>
            </h3>
          </div>
          
          <div className="space-y-2">
            {ratingBars.map((bar) => (
              <div key={bar.label} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-neutral-400 w-2">{bar.label}</span>
                <div className="flex-1 h-1 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="h-full bg-black rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Metrics Grid */}
        <div className="flex-1 border-l border-neutral-100 pl-0 lg:pl-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 lg:gap-y-0">
            {categories.map((cat, idx) => (
              <motion.div 
                key={cat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col gap-5 px-4 lg:px-6 relative group ${idx === 0 ? 'pl-0' : ''}`}
              >
                {/* Visual Separator for Desktop */}
                {idx > 0 && (
                  <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-neutral-100" />
                )}
                
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-neutral-800 leading-none">
                    {cat.label}
                  </p>
                  <p className="text-xl font-black text-[#17294F] leading-none">
                    {cat.score.toFixed(1)}
                  </p>
                </div>

                <div className="text-black group-hover:text-blue-600 transition-colors duration-300">
                  <cat.icon size={32} strokeWidth={1} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBreakdown;
