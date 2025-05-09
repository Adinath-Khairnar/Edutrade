/* eslint-disable react/prop-types */
"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function MotionWrapper({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
