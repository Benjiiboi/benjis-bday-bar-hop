import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Clock, ArrowRight, ArrowLeft, X, Sparkles, Footprints, ChevronDown } from 'lucide-react';
import { venues } from '../data/venues';

export default function BenjiBdayBarHop() {
  const [activeVenueId, setActiveVenueId] = useState<string | null>(null);
  const [visitedVenues, setVisitedVenues] = useState<Set<string>>(new Set());
  const [showIntro, setShowIntro] = useState(true);
  const [currentStop, setCurrentStop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const activeVenue = venues.find(v => v.id === activeVenueId);
  const activeIndex = venues.findIndex(v => v.id === activeVenueId);

  // Map viewport follows scroll
  const mapX = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -20, -35, -45, -55, -65]);
  const mapY = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -10, -25, -40, -55, -70]);
  const mapScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2]);
  
  const smoothMapX = useSpring(mapX, { stiffness: 100, damping: 30 });
  const smoothMapY = useSpring(mapY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const stopIndex = Math.min(Math.floor(latest * 6), 5);
      setCurrentStop(stopIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleVenueClick = (id: string) => {
    setActiveVenueId(id);
    setVisitedVenues(prev => new Set([...prev, id]));
  };

  const scrollToStop = (index: number) => {
    const element = document.getElementById(`stop-${index}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 max-w-2xl"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-6 text-6xl"
          >
            🎉
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#2d3436] font-display leading-tight">
            Benji's<br/>
            <span className="text-[#ff6b9d]">B'day</span><br/>
            Bar Hop
          </h1>
          <p className="text-xl text-[#636e72] mb-8 font-medium">
            6 bars. 1 epic night.<br/>
            Carlton → Fitzroy
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowIntro(false)}
            className="px-10 py-5 bg-[#ff6b9d] text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-shadow flex items-center gap-3 mx-auto"
          >
            Start The Crawl
            <ChevronDown className="animate-bounce" />
          </motion.button>
        </motion.div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #ff6b9d 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ff9f43 0%, transparent 50%)'
          }} />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative bg-[#f5f0e8]">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-2 bg-white/50 backdrop-blur-sm">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#ff9f43] via-[#ff6b9d] to-[#6c5ce7]"
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        />
      </div>

      {/* Fixed Map Viewport */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute w-[150%] h-[150%] left-[-25%] top-[-25%]"
          style={{ x: smoothMapX, y: smoothMapY, scale: mapScale }}
        >
          {/* Illustrated Map Background */}
          <div className="relative w-full h-full">
            <img 
              src="/map-illustration.png" 
              alt="Bar Hop Map"
              className="w-full h-full object-contain opacity-90"
              onError={(e) => {
                // Fallback if image not found
                e.currentTarget.style.display = 'none';
              }}
            />
            
            {/* Fallback map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8e0d5] to-[#d4c8b8] -z-10">
              <svg className="w-full h-full opacity-30">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#b8a99a" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Route Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff9f43" />
                  <stop offset="50%" stopColor="#ff6b9d" />
                  <stop offset="100%" stopColor="#6c5ce7" />
                </linearGradient>
              </defs>
              {venues.map((venue, idx) => {
                if (idx === 0) return null;
                const prev = venues[idx - 1];
                const isActive = currentStop >= idx;
                return (
                  <motion.line
                    key={`route-${idx}`}
                    x1={`${prev.position.x}%`}
                    y1={`${prev.position.y}%`}
                    x2={`${venue.position.x}%`}
                    y2={`${venue.position.y}%`}
                    stroke="url(#routeGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="8 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0.3
                    }}
                    transition={{ duration: 1.5, delay: idx * 0.2 }}
                  />
                );
              })}
            </svg>

            {/* Venue Tokens on Map */}
            {venues.map((venue, idx) => {
              const isActive = currentStop === idx;
              const isVisited = currentStop > idx || visitedVenues.has(venue.id);
              
              return (
                <motion.button
                  key={venue.id}
                  className="absolute"
                  style={{ 
                    left: `${venue.position.x}%`, 
                    top: `${venue.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={isActive ? {
                    scale: [1, 1.2, 1],
                    y: [0, -10, 0]
                  } : {}}
                  transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                  onClick={() => handleVenueClick(venue.id)}
                >
                  <div className={`
                    w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 shadow-xl transition-all duration-300
                    ${isActive ? 'border-[#ff6b9d] scale-110 shadow-pink-500/50' : ''}
                    ${isVisited ? 'border-[#ff9f43]' : 'border-white'}
                  `}>
                    <img src={venue.images[0]} alt={venue.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`
                    absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold
                    ${isActive ? 'bg-[#ff6b9d] text-white' : 'bg-white/90 text-[#2d3436]'}
                  `}>
                    {venue.order}. {venue.name}
                  </div>
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 rounded-full border-4 border-[#ff6b9d]"
                      animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Scrollable Content Overlay */}
      <div className="relative z-10">
        {/* Spacer sections for each stop */}
        {venues.map((venue, index) => (
          <section 
            key={venue.id}
            id={`stop-${index}`}
            className="min-h-screen flex items-end justify-center pb-32 px-4"
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-6 max-w-md w-full shadow-2xl border border-white/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <span 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: venue.color }}
                >
                  {venue.order}
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-[#2d3436]">{venue.name}</h2>
                  <p className="text-sm text-[#636e72]">{venue.address}</p>
                </div>
              </div>
              
              <p className="text-[#2d3436] mb-4 leading-relaxed">{venue.whyHere}</p>
              
              <div className="flex items-center gap-2 text-sm text-[#636e72] mb-4">
                <Footprints size={16} />
                <span>{venue.walkingTimeToNext || 'Final stop!'}</span>
              </div>

              <button 
                onClick={() => handleVenueClick(venue.id)}
                className="w-full py-3 bg-[#2d3436] text-white rounded-xl font-semibold hover:bg-[#636e72] transition-colors flex items-center justify-center gap-2"
              >
                View Details
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </section>
        ))}

        {/* End section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">🎂</div>
            <h2 className="text-4xl font-bold text-[#2d3436] mb-4">Happy Birthday Benji!</h2>
            <p className="text-xl text-[#636e72]">Hope you survived the crawl 🍻</p>
          </motion.div>
        </section>
      </div>

      {/* Quick Nav Dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
        {venues.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToStop(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentStop === idx ? 'bg-[#ff6b9d] scale-150' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeVenue && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveVenueId(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img src={activeVenue.images[0]} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button 
                  onClick={() => setActiveVenueId(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="text-sm font-medium opacity-80">Stop {activeVenue.order}</span>
                  <h3 className="text-3xl font-bold">{activeVenue.name}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start gap-2 text-[#636e72]">
                  <MapPin size={20} className="mt-0.5 flex-shrink-0" style={{ color: activeVenue.color }} />
                  <span>{activeVenue.address}</span>
                </div>

                <div className="bg-[#f5f0e8] rounded-xl p-4">
                  <p className="font-semibold text-[#ff6b9d] mb-1">Why here?</p>
                  <p className="text-[#2d3436] text-sm">{activeVenue.whyHere}</p>
                </div>

                <p className="text-[#2d3436]">{activeVenue.description}</p>

                <div>
                  <p className="text-xs uppercase text-[#636e72] mb-2 tracking-wider">Vibe</p>
                  <p className="text-[#2d3436] italic">"{activeVenue.vibe}"</p>
                </div>

                <div>
                  <p className="text-xs uppercase text-[#636e72] mb-2 tracking-wider">Order These</p>
                  <div className="flex flex-wrap gap-2">
                    {activeVenue.signature.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-[#f5f0e8] rounded-full text-sm text-[#2d3436]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#636e72] pt-4 border-t">
                  <Clock size={16} />
                  {activeVenue.hours}
                </div>

                <div className="flex gap-3 pt-2">
                  {activeIndex > 0 && (
                    <button 
                      onClick={() => {
                        setActiveVenueId(venues[activeIndex - 1].id);
                        scrollToStop(activeIndex - 1);
                      }}
                      className="flex-1 py-3 border-2 border-[#2d3436] text-[#2d3436] rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={18} /> Previous
                    </button>
                  )}
                  {activeIndex < venues.length - 1 ? (
                    <button 
                      onClick={() => {
                        setActiveVenueId(venues[activeIndex + 1].id);
                        scrollToStop(activeIndex + 1);
                      }}
                      className="flex-1 py-3 bg-[#ff6b9d] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                      Next Stop <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => setActiveVenueId(null)}
                      className="flex-1 py-3 bg-gradient-to-r from-[#ff6b9d] to-[#6c5ce7] text-white rounded-xl font-semibold"
                    >
                      <Sparkles size={18} className="inline mr-2" />
                      Finish!
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
