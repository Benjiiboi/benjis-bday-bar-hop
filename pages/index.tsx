import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, X, Sparkles } from 'lucide-react';
import { venues } from '../data/venues';

export default function BenjiBdayBarHop() {
  const [activeVenueId, setActiveVenueId] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  const activeVenue = venues.find(v => v.id === activeVenueId);
  const activeIndex = venues.findIndex(v => v.id === activeVenueId);

  if (showIntro) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex flex-col items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-5xl font-bold mb-4 text-[#2d3436]">Benji's B'day<br/><span className="text-[#ff6b9d]">Bar Hop</span></h1>
          <p className="text-xl text-[#636e72] mb-8">6 bars. 1 epic night.</p>
          <button onClick={() => setShowIntro(false)} className="px-8 py-4 bg-[#ff6b9d] text-white rounded-full font-bold text-lg">
            Start The Crawl
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] pb-32">
      <div className="sticky top-0 h-[60vh] bg-[#e8e0d5] overflow-hidden">
        <div className="relative w-full h-full">
          {venues.map((venue) => (
            <button
              key={venue.id}
              onClick={() => setActiveVenueId(venue.id)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: venue.position.x + '%', top: venue.position.y + '%' }}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={venue.images[0]} className="w-full h-full object-cover" />
              </div>
              <div className="mt-2 px-3 py-1 bg-white rounded-full text-xs font-bold whitespace-nowrap">
                {venue.order}. {venue.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-8 space-y-6">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: venue.color }}>
                {venue.order}
              </span>
              <div>
                <h2 className="text-xl font-bold">{venue.name}</h2>
                <p className="text-sm text-gray-600">{venue.address}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{venue.whyHere}</p>
            <button 
              onClick={() => setActiveVenueId(venue.id)}
              className="w-full py-3 bg-[#2d3436] text-white rounded-xl font-semibold"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeVenue && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setActiveVenueId(null)}
          >
            <motion.div 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto relative"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setActiveVenueId(null)} className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><X size={18} /></button>
              <img src={activeVenue.images[0]} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h2 className="text-2xl font-bold mb-2">{activeVenue.name}</h2>
              <p className="text-gray-600 mb-4">{activeVenue.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {activeVenue.signature.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{item}</span>
                ))}
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Clock size={16} /> {activeVenue.hours}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
