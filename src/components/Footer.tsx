import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#17294F] text-white pt-20 pb-10 mt-20">
      <div className="max-w-[2520px] mx-auto xl:px-12 md:px-12 sm:px-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-20">
          {/* Brand & Mission */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">
              LUXE<span className="text-blue-500">STAY</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Curated luxury experiences in the heart of Iligan City. We bridge the gap between premium hospitality and cozy living.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-lg uppercase tracking-widest text-blue-500">Explore</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium text-white/70">
              <li><Link to="/" className="hover:text-white transition">All Listings</Link></li>
              <li><a href="#" className="hover:text-white transition">Featured Stays</a></li>
              <li><a href="#" className="hover:text-white transition">City Guide</a></li>
              <li><a href="#" className="hover:text-white transition">Travel Stories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-lg uppercase tracking-widest text-blue-500">Support</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium text-white/70">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Safety Information</a></li>
              <li><a href="#" className="hover:text-white transition">Cancellation Options</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-lg uppercase tracking-widest text-blue-500">Find Us</h3>
            <div className="flex flex-col gap-5 text-sm">
              <div className="flex items-start gap-4">
                <MapPin className="text-blue-500 shrink-0" size={20} />
                <span className="text-white/70 leading-relaxed">Pala-o, Iligan City, Lanao del Norte, Philippines</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-blue-500 shrink-0" size={20} />
                <span className="text-white/70">contact@luxestay.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-blue-500 shrink-0" size={20} />
                <span className="text-white/70">+63 912 345 6789</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 font-medium text-xs text-white/40 uppercase tracking-[0.2em]">
          <p>© {currentYear} LUXESTAY. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
