import React, { useEffect, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { Home } from 'lucide-react';

interface MapTilerViewProps {
  lat: number;
  lng: number;
  title: string;
}

const MapTilerView: React.FC<MapTilerViewProps> = ({ lat, lng, title }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    if (!apiKey) {
      console.warn('MapTiler API Key is missing. Please add VITE_MAPTILER_API_KEY to your secrets.');
    }
    
    maptilersdk.config.apiKey = apiKey || '';

    try {
      map.current = new maptilersdk.Map({
        container: mapContainer.current!,
        style: maptilersdk.MapStyle.STREETS,
        center: [lng, lat],
        zoom: 14,
        navigationControl: false,
        geolocateControl: false,
      });

      // Create a custom element for the house marker
      const el = document.createElement('div');
      el.className = 'house-marker';
      el.innerHTML = `
        <div style="filter: drop-shadow(0 8px 12px rgba(0,0,0,0.25)); width: 52px; height: 52px; display: flex; align-items: center; justify-content: center;">
          <svg width="48" height="48" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37 0 0 5.37 0 12C0 21 12 28 12 28C12 28 24 21 24 12C24 5.37 18.63 0 12 0Z" fill="#17294F" stroke="white" stroke-width="1.5"/>
            <circle cx="12" cy="11" r="7" fill="white"/>
            <g transform="translate(8.2, 7.2) scale(0.32)">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#17294F" stroke="#17294F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </g>
          </svg>
        </div>
      `;

      new maptilersdk.Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(map.current);
    } catch (error) {
      console.error('Error initializing MapTiler map:', error);
    }

  }, [lat, lng, title]);

  const handleOpenGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
  };

  const handleZoomIn = () => map.current?.zoomIn();
  const handleZoomOut = () => map.current?.zoomOut();

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-md border border-neutral-200 bg-neutral-50">
      {/* Custom Map Controls - Bottom Right Container style */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
        {/* Zoom Stack */}
        <div className="flex flex-col bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden divide-y divide-neutral-100">
          <button 
            onClick={handleZoomIn}
            className="w-12 h-12 flex items-center justify-center hover:bg-neutral-50 transition-colors active:scale-95 text-neutral-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-12 h-12 flex items-center justify-center hover:bg-neutral-50 transition-colors active:scale-95 text-neutral-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
      {!import.meta.env.VITE_MAPTILER_API_KEY && (
        <>
          {/* Fallback Map Background (Visible if live map fails to load or no key) */}
          <div 
            className="absolute inset-0 z-0 opacity-40 grayscale-[0.5]"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Floating Badge */}
          <div className="absolute top-6 left-6 z-50">
            <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-[#17294F] uppercase tracking-widest leading-none mb-0.5">Preview Mode</span>
                <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider leading-none">Add API Key for live maps</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="absolute bottom-6 left-6 z-50">
            <button 
              onClick={handleOpenGoogleMaps}
              className="py-3 px-5 bg-[#17294F] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#2252D6] transition-all shadow-xl active:scale-95 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Open in Google Maps
            </button>
          </div>

          {/* Fallback Marker (Only visible when live map is not active) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] pointer-events-none z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-[#2252D6]/10 rounded-full animate-ping absolute top-0" />
            <div className="relative z-20">
              <svg width="48" height="48" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-lg">
                <path d="M12 0C5.37 0 0 5.37 0 12C0 21 12 28 12 28C12 28 24 21 24 12C24 5.37 18.63 0 12 0Z" fill="#17294F" stroke="white" strokeWidth="1.5"/>
                <circle cx="12" cy="11" r="7" fill="white"/>
                <path d="M9 13.5L12 11.5L15 13.5V10.5L12 8.5L9 10.5V13.5Z" fill="#17294F" transform="translate(0, -0.5)"/>
                <path d="M12 15V13" stroke="#17294F" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </>
      )}

      <div ref={mapContainer} className="w-full h-full relative z-0" />
    </div>
  );
};

export default MapTilerView;
