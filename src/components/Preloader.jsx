import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── top-level assets ──────────────────────────────────────────────────────────
import logo from '../assets/gwn-logo.png';
import gwenImg from '../assets/gwen.png';
import connect from '../assets/marketing/connect.png';
import toolsImg from '../assets/marketing-tools.png';

// ── posters ───────────────────────────────────────────────────────────────────
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

// ── dome gallery photos ───────────────────────────────────────────────────────
import photo1 from '../assets/marketing/photos/IMG_0480.JPG';
import photo2 from '../assets/marketing/photos/IMG_0518.JPG';
import photo3 from '../assets/marketing/photos/IMG_0842.JPG';
import photo4 from '../assets/marketing/photos/IMG_1189.JPG';
import photo5 from '../assets/marketing/photos/IMG_1241.JPG';
import photo6 from '../assets/marketing/photos/IMG_1610.JPG';
import photo7 from '../assets/marketing/photos/IMG_1787.JPG';
import photo8 from '../assets/marketing/photos/IMG_1882.JPG';
import photo9 from '../assets/marketing/photos/IMG_2027.JPG';
import photo10 from '../assets/marketing/photos/IMG_2136.JPG';
import photo11 from '../assets/marketing/photos/IMG_5149.JPG';
import photo12 from '../assets/marketing/photos/IMG_5221.JPG';
import photo13 from '../assets/marketing/photos/IMG_5644.JPG';
import photo14 from '../assets/marketing/photos/IMG_5939.JPG';
import photo15 from '../assets/marketing/photos/IMG_6074.JPG';
import photo16 from '../assets/marketing/photos/IMG_6096.JPG';
import photo17 from '../assets/marketing/photos/IMG_9337.JPG';
import photo18 from '../assets/marketing/photos/IMG_9529.JPG';
import photo19 from '../assets/marketing/photos/150F3D6C-2F6D-45A5-B6FB-EC4B2221394A_1_105_c.jpeg';
import photo20 from '../assets/marketing/photos/28879950-0D00-4736-BB76-F062AEEC69BC_1_105_c.jpeg';
import photo21 from '../assets/marketing/photos/49145E54-A2B8-460A-8124-B5EB978B3CA7_1_105_c.jpeg';
import photo22 from '../assets/marketing/photos/70ED665D-A8B4-4528-A37A-FAA2F67899A7_1_105_c.jpeg';
import photo23 from '../assets/marketing/photos/C0E1AC35-0505-4203-B9B0-44754617AB2F_1_105_c.jpeg';
import photo24 from '../assets/marketing/photos/C3505EBD-A1AA-4814-ACE8-C7A6918F332D_1_105_c.jpeg';
import photo25 from '../assets/marketing/photos/D6C3B2CB-3A63-48E7-B929-E02580DC05F4_1_105_c.jpeg';
import photo26 from '../assets/marketing/photos/ECA88387-5C77-4977-88FD-80CAF1DABFF0_1_105_c.jpeg';
import photo27 from '../assets/marketing/photos/F4EF5B09-6350-4529-B362-C555604D3307_1_105_c.jpeg';

const ALL_IMAGES = [
  logo, gwenImg, connect, toolsImg,
  design, heymax1, heymax2, heymax3, heymax4, pme, studyBraek,
  microsoft, toskaFriendzzzz, stereoExco, pmCoffeeChat, djLineup,
  marketingTeam, excoGroup,
  photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9,
  photo10, photo11, photo12, photo13, photo14, photo15, photo16, photo17,
  photo18, photo19, photo20, photo21, photo22, photo23, photo24, photo25,
  photo26, photo27,
];

export default function Preloader({ children }) {
  const [loaded, setLoaded] = useState(0);
  const [visible, setVisible] = useState(true);
  const total = ALL_IMAGES.length;
  const pct = Math.round((loaded / total) * 100);

  useEffect(() => {
    let count = 0;
    ALL_IMAGES.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => {
        count += 1;
        setLoaded(count);
        if (count === total) setTimeout(() => setVisible(false), 500);
      };
      img.src = src;
    });
  }, []);

  return (
    <>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Logo */}
            <motion.img
              src={logo}
              alt="Logo"
              className="w-24 lg:w-36 mb-10 opacity-90"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.6 }}
            />

            {/* Progress bar track */}
            <div className="w-48 lg:w-64 h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${pct}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>

            {/* Label + percentage */}
            <p className="mt-4 text-white/30 text-xs font-light tracking-[0.3em]">
              LOADING IMAGES {pct}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
