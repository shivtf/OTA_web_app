// components/NewsletterBanner.jsx
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

/**
 * Full-width newsletter sign-up strip.
 *
 * Props:
 *   heading  – string (optional) main headline
 *   subtext  – string (optional) supporting line
 */
export default function NewsletterBanner({
  heading = "Get the best travel deals in your inbox",
  subtext = "Subscribe to our newsletter and never miss exclusive offers.",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-blue-600 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6"
    >
      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
        <Mail className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-lg font-bold text-white">{heading}</h3>
        <p className="text-sm text-blue-100 mt-1">{subtext}</p>
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <input
          type="email"
          placeholder="Enter your email address"
          className="flex-1 md:w-64 px-4 py-2.5 rounded-xl text-sm bg-white/90 placeholder-gray-400 outline-none focus:bg-white transition"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-white text-blue-600 font-semibold text-sm px-5 py-2.5 rounded-xl hover:shadow-lg transition shrink-0"
        >
          Subscribe
        </motion.button>
      </div>
    </motion.div>
  );
}
