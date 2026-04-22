import { motion } from 'framer-motion';
import toolsImg from '../assets/marketing-tools.png';

const toolNames = [
  'ILLUSTRATOR', 'PHOTOSHOP', 'FRESCO', 'LIGHTROOM',
  'PREMIERE PRO', 'CAPCUT', 'PICSART', 'CANVA',
];

export default function MarketingTools() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-yellow-200/30 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-pink-300/30 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-yellow-300/20 rounded-full blur-[100px]" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/25 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-300/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/6 right-1/4 w-56 h-56 bg-indigo-300/25 rounded-full blur-[90px]" />
      </div>

      {/* Title — top right */}
      <motion.h2
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute top-6 right-4 lg:top-10 lg:right-10 text-xl sm:text-3xl lg:text-5xl font-black text-white tracking-tighter text-right z-10"
      >
        EDITING TECHNOLOGIES
      </motion.h2>

      {/* Image — centered */}
      <motion.img
        src={toolsImg}
        alt="Editing Technologies"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[80%] sm:w-[65%] lg:w-[55%] h-auto object-contain"
      />

      {/* Tool names — bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute bottom-6 right-4 lg:bottom-10 lg:right-10 text-right z-10"
      >
        {toolNames.map((name, index) => (
          <motion.p
            key={name}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.05, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white font-black text-[10px] sm:text-xs lg:text-sm tracking-tight leading-snug"
          >
            {name}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}
