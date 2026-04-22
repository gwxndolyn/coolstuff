import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DomeGallery from './DomeGallery';
import Masonry from './Masonry';
import MarketingTools from './MarketingTools';
import logo from '../assets/gwn-logo.png';
import gwenImg from '../assets/gwen.png';
import connect from '../assets/marketing/connect.png';

// Marketing posters
import design from '../assets/marketing/posters/design.jpeg';
import heymax1 from '../assets/marketing/posters/heymax1.png';
import heymax2 from '../assets/marketing/posters/heymax2.png';
import heymax3 from '../assets/marketing/posters/heymax3.png';
import heymax4 from '../assets/marketing/posters/heymax4.png';
import pme from '../assets/marketing/posters/pme.webp';
import studyBraek from '../assets/marketing/posters/study-braek.png';
import microsoft from '../assets/marketing/posters/microsoft.png';
import toskaFriendzzzz from '../assets/marketing/posters/toska-friendzzzz.png';
import stereoExco from '../assets/marketing/posters/stereo-exco.png';
import pmCoffeeChat from '../assets/marketing/posters/pm-coffee-chat.png';
import djLineup from '../assets/marketing/posters/dj-lineup.png';
import marketingTeam from '../assets/marketing/posters/marketing-team.png';
import excoGroup from '../assets/marketing/posters/exco-group.png';

export default function Marketing() {
  const containerRef = useRef(null);
  const masonryRef = useRef(null);
  const [postersFixed, setPostersFixed] = useState(false);
  const [postersAtBottom, setPostersAtBottom] = useState(false);
  const [loadedProjects, setLoadedProjects] = useState([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!masonryRef.current) return;

      const rect = masonryRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const viewportHeight = window.innerHeight;

      // Three states for the Posters text:
      // 1. Relative: scrolling in (sectionTop > 0)
      // 2. Fixed: sticky in middle (sectionTop <= 0 && sectionBottom > viewportHeight)
      // 3. Absolute at bottom: scrolling out (sectionBottom <= viewportHeight)
      if (sectionTop <= 0 && sectionBottom > viewportHeight) {
        setPostersFixed(true);
        setPostersAtBottom(false);
      } else if (sectionBottom <= viewportHeight) {
        setPostersFixed(false);
        setPostersAtBottom(true);
      } else {
        setPostersFixed(false);
        setPostersAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const blurValue = useTransform(scrollYProgress, [0, 0.27, 0.45], [8, 8, 0]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.09], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 0.09], [1, 0.8]);
  // once faded (0.09→0.1) jump name + dark overlay off-screen so they don't ghost over dome/masonry
  const nameY = useTransform(scrollYProgress, [0, 0.09, 0.1], ['0vh', '0vh', '-300vh']);
  const aboutOpacity = useTransform(scrollYProgress, [0.09, 0.15, 0.21, 0.27], [0, 1, 1, 0]);
  const aboutY = useTransform(scrollYProgress, [0.09, 0.15], ['20vh', '0vh']);
  const domeY = useTransform(scrollYProgress, [0.6, 1], ['0vh', '-100vh']);
  const dragPromptOpacity = useTransform(scrollYProgress, [0.38, 0.45, 0.58, 0.62], [0, 1, 1, 0]);

  // Marketing projects for Masonry
  const postersList = [

    { id: "stereo-exco", img: stereoExco, url: stereoExco },
    { id: "toska-friendzzzz", img: toskaFriendzzzz, url: toskaFriendzzzz },
    { id: "marketing-team", img: marketingTeam, url: marketingTeam },
    { id: "pm-coffee-chat", img: pmCoffeeChat, url: pmCoffeeChat },
    { id: "heymax1", img: heymax1, url: heymax1 },
    { id: "study-braek", img: studyBraek, url: studyBraek },
    { id: "dj-lineup", img: djLineup, url: djLineup },
    { id: "microsoft", img: microsoft, url: microsoft },
    { id: "pme", img: pme, url: pme },
    { id: "exco-group", img: excoGroup, url: excoGroup },
    { id: "design", img: design, url: design },
    { id: "heymax3", img: heymax3, url: heymax3 },
    { id: "heymax4", img: heymax4, url: heymax4 },

  ];

  // Load images and calculate exact aspect ratios
  useEffect(() => {
    const loadImages = async () => {
      const loaded = await Promise.all(
        postersList.map(poster => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              // Calculate exact aspect ratio: height/width
              const aspectRatio = img.naturalHeight / img.naturalWidth;
              resolve({
                ...poster,
                height: aspectRatio * 1000
              });
            };
            img.onerror = () => {
              resolve({
                ...poster,
                height: 2000 // 1:1 fallback
              });
            };
            img.src = poster.img;
          });
        })
      );
      setLoadedProjects(loaded);
    };
    loadImages();
  }, []);

  const marketingProjects = loadedProjects;

  return (
    <div className="relative w-full">
      {/* Logo - always visible */}
      <motion.a
        href="/"
        className="fixed top-4 left-4 lg:top-8 lg:left-8 pointer-events-auto z-[100]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img src={logo} alt="Logo" className="w-auto h-10 lg:h-20" />
      </motion.a>

      {/* DomeGallery + Name Section - sticky background */}
      <div ref={containerRef} className="relative w-full" style={{ height: '500vh' }}>
        {/* Fixed DomeGallery with dynamic blur - scrolls out of view */}
        <motion.div
          className="fixed inset-0 w-full h-screen z-[1]"
          style={{
            filter: useTransform(blurValue, (v) => `blur(${v}px)`),
            y: domeY
          }}
        >
          <DomeGallery />

          {/* Swipe/Drag Prompt */}
          <motion.div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-none z-20"
            style={{ opacity: dragPromptOpacity }}
          >
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <svg
                className="w-4 h-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              <span className="text-xs lg:text-sm text-gray-300 font-light tracking-wide">
                Drag to explore
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Dark overlay - fades away with scroll */}
        <motion.div
          className="fixed inset-0 w-full h-screen bg-black/50 pointer-events-none z-10"
          style={{
            opacity: nameOpacity,
            y: nameY,
          }}
        />

        {/* Name Overlay that scrolls away - Holographic Style */}
        <motion.div
          className="fixed inset-0 w-full h-screen flex items-center justify-center pointer-events-none z-50 overflow-hidden"
          style={{
            opacity: nameOpacity,
            scale: nameScale,
            y: nameY,
          }}
        >
          {/* Warm gradient glow on left side */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1/3"
            style={{
              background: 'radial-gradient(ellipse at left center, rgba(255, 150, 50, 0.4) 0%, rgba(255, 100, 100, 0.2) 30%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />

          <div className="relative w-full max-w-7xl px-8">
            <div className="relative z-10 flex flex-col items-center">
              <h1 className="text-[12vw] lg:text-[14vw] font-black tracking-tighter flex justify-center items-center">
                <span className="text-gray-200">GWE</span>
                <span
                  className="relative"
                  style={{
                    WebkitTextStroke: '2px #e5e7eb',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent'
                  }}
                >
                  NDO
                </span>
                <span className="text-gray-200">LYN</span>
              </h1>

              <motion.div
                className="mt-6 lg:mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="border border-gray-200 rounded-full px-5 py-2">
                  <p className="text-gray-200 text-sm lg:text-base font-light tracking-widest uppercase">
                    Marketing Portfolio
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-12 flex flex-col items-center gap-2 w-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm text-gray-400 font-light tracking-wider">Scroll to explore</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Darker overlay for About section */}
        <motion.div
          className="fixed inset-0 w-full h-screen bg-black/50 pointer-events-none z-55"
          style={{
            opacity: aboutOpacity,
          }}
        />

        {/* About Section - appears after name fades, before DomeGallery reveals */}
        <motion.div
          className="fixed inset-0 w-full h-screen flex items-center justify-center pointer-events-none z-60 px-4 lg:px-0"
          style={{
            opacity: aboutOpacity,
            y: aboutY
          }}
        >
          <div className="w-full flex flex-col lg:flex-row items-center gap-2 lg:gap-0">
            {/* Left side - Gwen Image */}
            <motion.div
              className="w-full lg:w-1/2 flex-shrink-0 flex justify-center lg:justify-start"
              style={{ opacity: aboutOpacity }}
            >
              <img
                src={gwenImg}
                alt="Gwen"
                className="w-auto h-auto object-contain rounded-3xl"
                style={{
                  height: 'clamp(20vh, 40vh, 80vh)',
                  width: 'auto',
                  maxWidth: '100%',
                  filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))'
                }}
              />
            </motion.div>

            {/* Right side - Text content */}
            <div className="w-full lg:w-1/2 px-4 lg:px-1 flex flex-col justify-center space-y-2 lg:space-y-8">
              {/* Title with quotes */}
              <motion.h3
                className="text-3xl md:text-6xl lg:text-8xl font-black tracking-tight uppercase mb-2 lg:mb-8"
                style={{
                  opacity: aboutOpacity,
                  letterSpacing: '0.05em',
                  background: 'linear-gradient(135deg, #ffc4e1 0%, #ffb8d5 25%, #ff9dc9 50%, #ffb8d5 75%, #ffc4e1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 5px 15px rgba(255, 157, 201, 0.4)) drop-shadow(0 0 40px rgba(255, 184, 213, 0.3))',
                  textShadow: '0 3px 8px rgba(255, 157, 201, 0.4)',
                }}
              >
                <span style={{
                  position: 'relative',
                  display: 'inline-block',
                  filter: 'drop-shadow(1px 1px 2px rgba(255, 255, 255, 0.4)) drop-shadow(-1px -1px 2px rgba(0, 0, 0, 0.2))'
                }}>
                  " ABOUT
                </span>
              </motion.h3>

              {/* Roles */}
              <motion.div
                className="space-y-0.5 lg:space-y-2 mb-2 lg:mb-10"
                style={{ opacity: aboutOpacity }}
              >
                <p className="text-sm md:text-base lg:text-xl font-bold text-white uppercase tracking-wide">
                  PRODUCT CLUB - MARKETING DIRECTOR
                </p>
                <p className="text-sm md:text-base lg:text-xl font-bold text-white uppercase tracking-wide">
                  STEREOMETA - MARKETING EXECUTIVE
                </p>
                <p className="text-sm md:text-base lg:text-xl font-bold text-white uppercase tracking-wide">
                  FINTECH - MARKETING DIRECTOR
                </p>
              </motion.div>

              {/* Passion section */}
              <motion.div
                className="space-y-2 lg:space-y-4"
                style={{ opacity: aboutOpacity }}
              >
                <p className="text-base md:text-lg lg:text-xl font-bold text-white uppercase tracking-wide mb-2 lg:mb-4">
                  PASSION FOR
                </p>
                <ul className="space-y-1 lg:space-y-2 ml-6 lg:ml-8">
                  <li className="text-sm md:text-base lg:text-xl text-white uppercase tracking-wide list-disc">
                    DESIGN & BRANDING
                  </li>
                  <li className="text-sm md:text-base lg:text-xl text-white uppercase tracking-wide list-disc">
                    PHOTOGRAPHY
                  </li>
                  <li className="text-sm md:text-base lg:text-xl text-white uppercase tracking-wide list-disc">
                    DJing
                  </li>
                </ul>
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* Spacer to enable scrolling */}
        <div className="h-[500vh]" />
      </div>

      {/* Masonry Section - appears after DomeGallery scrolls away */}
      <div ref={masonryRef} className="relative w-full bg-neutral-950">
        {/* Mobile Posters header */}
        <div className="block lg:hidden pt-10 pb-4 px-4">
          <h2
            className="font-black tracking-tight select-none"
            style={{
              fontSize: 'clamp(4rem, 22vw, 8rem)',
              background: 'linear-gradient(135deg, #ffd4c4 0%, #ffb8a8 25%, #ff9d8f 50%, #ffb8a8 75%, #ffd4c4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 10px 30px rgba(255, 157, 143, 0.4)) drop-shadow(0 0 80px rgba(255, 184, 168, 0.3))',
              textShadow: '0 5px 15px rgba(255, 157, 143, 0.5)',
              letterSpacing: '-0.02em',
              transform: 'translateZ(0)',
            }}
          >
            <span style={{
              position: 'relative',
              display: 'inline-block',
              filter: 'drop-shadow(2px 2px 4px rgba(255, 255, 255, 0.5)) drop-shadow(-2px -2px 4px rgba(0, 0, 0, 0.3))'
            }}>
              Posters
            </span>
          </h2>
        </div>
        <div className="flex flex-row">
          {/* Left side - Masonry images */}
          <div className="w-full lg:w-1/2 py-4 lg:py-20 px-4 lg:pl-12">
            <Masonry
              items={marketingProjects}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={false}
            />
          </div>

          {/* Right side - Posters text column */}
          <div className="hidden lg:block w-1/2 relative">
            {/* Spacer when fixed to maintain layout */}
            {postersFixed && <div className="h-screen" />}

            {/* Posters text - three states: relative (scrolling in), fixed (sticky), absolute (scrolling out) */}
            <div
              className={`flex items-center justify-center h-screen py-20 ${
                postersFixed
                  ? 'fixed top-1/2 -translate-y-1/2 right-0 w-1/2'
                  : postersAtBottom
                    ? 'absolute bottom-0 right-0 w-full'
                    : 'relative'
              }`}
              style={{
                willChange: postersFixed ? 'transform' : 'auto',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              <h2
                className="font-black tracking-tight select-none"
                style={{
                  fontSize: 'clamp(4rem, 15vw, 12rem)',
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  background: 'linear-gradient(135deg, #ffd4c4 0%, #ffb8a8 25%, #ff9d8f 50%, #ffb8a8 75%, #ffd4c4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 10px 30px rgba(255, 157, 143, 0.4)) drop-shadow(0 0 80px rgba(255, 184, 168, 0.3))',
                  textShadow: '0 5px 15px rgba(255, 157, 143, 0.5)',
                  letterSpacing: '-0.02em',
                  transform: 'translateZ(0)',
                }}
              >
                <span style={{
                  position: 'relative',
                  display: 'inline-block',
                  filter: 'drop-shadow(2px 2px 4px rgba(255, 255, 255, 0.5)) drop-shadow(-2px -2px 4px rgba(0, 0, 0, 0.3))'
                }}>
                  Posters
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <MarketingTools />

      {/* Let's Connect Section */}
      <div className="relative w-full bg-gradient-to-b from-black via-black to-neutral-950 flex items-center justify-center overflow-hidden py-12 lg:py-20">
        {/* Gradient blurred orbs background - continuing from previous section */}
        <div className="absolute inset-0">

          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-400/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-orange-300/15 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
          {/* Left side - Connect Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="w-full lg:w-auto"
          >
            <img
              src={connect}
              alt="Let's Connect"
              className="w-full max-w-md lg:max-w-2xl h-auto object-contain mx-auto lg:mx-0"
            />
          </motion.div>

          {/* Right side - Social Media Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="flex flex-col space-y-6 lg:space-y-8 pr-10"
          >
            <a
              href="https://instagram.com/gwenxdolyn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl lg:text-2xl font-bold uppercase tracking-wide hover:text-pink-400 transition-colors duration-300 text-center lg:text-right"
            >
              // Instagram
            </a>
            <a
              href="https://linkedin.com/gwndolyn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl lg:text-2xl font-bold uppercase tracking-wide hover:text-blue-400 transition-colors duration-300 text-center lg:text-right"
            >
              // LinkedIn
            </a>
            <a
              href="https://gwndolyn.live"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl lg:text-2xl font-bold uppercase tracking-wide hover:text-purple-400 transition-colors duration-300 text-center lg:text-right"
            >
              // Portfolio
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
