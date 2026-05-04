import Hero from '../components/Hero';
import Categories from '../components/Categories';
import ListingCard from '../components/ListingCard';
import BottomNav from '../components/BottomNav';
import Filters, { FilterState } from '../components/Filters';
import Footer from '../components/Footer';
import { LISTINGS } from '../data/listings';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const recommendedRef = useRef<HTMLDivElement>(null);
  const topListingsRef = useRef<HTMLDivElement>(null);
  const msuIitRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 50000,
    minRating: 0,
    sortBy: 'relevance'
  });
  const navigate = useNavigate();

  const filteredListings = useMemo(() => {
    let result = [...LISTINGS];

    // Filter by Category
    if (selectedCategory !== 'ALL') {
      result = result.filter(listing => listing.category === selectedCategory);
    }

    // Filter by Price
    result = result.filter(listing => listing.price >= filters.minPrice && listing.price <= filters.maxPrice);

    // Filter by Rating
    result = result.filter(listing => listing.rating >= filters.minRating);

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Relevance - keep original order
        break;
    }

    return result;
  }, [selectedCategory, filters]);

  const handleListingClick = (id: string) => {
    navigate(`/listing/${id}`);
  };

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      <Hero />
      
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-0 flex items-center justify-between">
            <div className="flex-1 min-w-0 overflow-hidden relative group/cat pl-2 sm:pl-0">
              <Categories selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
            </div>
          <div className="pl-1 sm:pl-4 pr-2 sm:pr-0">
            <Filters currentFilters={filters} onFilterChange={setFilters} />
          </div>
        </div>
      </div>
      
      <main className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4 pt-10">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-5 md:gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/category/recommended')}>
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-black">Recommended</h2>
                <div className="flex items-center gap-1 px-3 py-1 bg-[#17294F] text-white rounded-full ml-1 sm:ml-2">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">See more</span>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-3">
                <button 
                  onClick={() => scroll(recommendedRef, 'left')}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-black hover:bg-neutral-50 transition-all active:scale-90"
                  aria-label="Previous Recommended"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => scroll(recommendedRef, 'right')}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-black hover:bg-neutral-50 transition-all active:scale-90"
                  aria-label="Next Recommended"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div 
              ref={recommendedRef}
              className="flex gap-3 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              <AnimatePresence mode="popLayout">
                {filteredListings.slice(0, 21).map((listing) => (
                  <div key={listing.id} className="min-w-[165px] sm:min-w-[330px] md:min-w-[360px] lg:min-w-[380px] xl:min-w-[calc((100%-40px)/6)] snap-start">
                    <ListingCard 
                      listing={listing} 
                      onClick={() => handleListingClick(listing.id)}
                    />
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {filteredListings.length > 0 && (
            <div className="flex flex-col gap-5 md:gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/category/top-listing')}>
                  <h2 className="font-display font-extrabold text-2xl md:text-3xl text-black">Top Listing</h2>
                  <div className="flex items-center gap-1 px-3 py-1 bg-[#17294F] text-white rounded-full ml-1 sm:ml-2">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">See more</span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <button 
                    onClick={() => scroll(topListingsRef, 'left')}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-black hover:bg-neutral-50 transition-all active:scale-90"
                    aria-label="Previous Top Listings"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => scroll(topListingsRef, 'right')}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-black hover:bg-neutral-50 transition-all active:scale-90"
                    aria-label="Next Top Listings"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div 
                ref={topListingsRef}
                className="flex gap-3 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
                style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredListings.slice(7, 28).map((listing) => (
                    <div key={listing.id} className="min-w-[165px] sm:min-w-[330px] md:min-w-[360px] lg:min-w-[380px] xl:min-w-[calc((100%-40px)/6)] snap-start">
                      <ListingCard 
                        listing={listing} 
                        onClick={() => handleListingClick(listing.id)}
                      />
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {filteredListings.length > 0 && (
            <div className="flex flex-col gap-5 md:gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/category/near-msu-iit')}>
                  <h2 className="font-display font-extrabold text-2xl md:text-3xl text-black">Near MSU-IIT</h2>
                  <div className="flex items-center gap-1 px-3 py-1 bg-[#17294F] text-white rounded-full ml-1 sm:ml-2">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">See more</span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <button 
                    onClick={() => scroll(msuIitRef, 'left')}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-black hover:bg-neutral-50 transition-all active:scale-90"
                    aria-label="Previous MSU-IIT Listings"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => scroll(msuIitRef, 'right')}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-black hover:bg-neutral-50 transition-all active:scale-90"
                    aria-label="Next MSU-IIT Listings"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div 
                ref={msuIitRef}
                className="flex gap-3 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
                style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredListings.slice(14, 35).map((listing) => (
                    <div key={listing.id} className="min-w-[165px] sm:min-w-[330px] md:min-w-[360px] lg:min-w-[380px] xl:min-w-[calc((100%-40px)/6)] snap-start">
                      <ListingCard 
                        listing={listing} 
                        onClick={() => handleListingClick(listing.id)}
                      />
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

        </div>

        {filteredListings.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center p-10 bg-white rounded-3xl mt-8">
            <h2 className="text-2xl font-bold font-display">No listings yet</h2>
            <p className="text-neutral-500 mt-2">Try choosing another category.</p>
            <button 
              onClick={() => setSelectedCategory('ALL')}
              className="mt-6 px-8 py-3 bg-black text-white rounded-full font-bold transition hover:bg-neutral-800"
            >
              Show all
            </button>
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
