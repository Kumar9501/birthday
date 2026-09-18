import { AnimatePresence, motion } from "framer-motion";
import birthdayConfig from "../config/birthdayConfig";

export default function LoadingScreen({ visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-wine-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute h-64 w-64 rounded-full bg-wine-700/30 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="font-script relative text-4xl text-blush-200 sm:text-5xl">
            {birthdayConfig.loadingText}
          </p>
          <p className="relative mt-5 text-[0.7rem] tracking-[0.32em] text-gold-400 uppercase">
            {birthdayConfig.name} · {birthdayConfig.yourName}
          </p>
          <motion.span
            className="relative mt-8 text-2xl text-gold-400"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.92, 1.05, 0.92] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            ♥
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
