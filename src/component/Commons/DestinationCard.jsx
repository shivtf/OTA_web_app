// components/DestinationCard.jsx
import { motion } from "framer-motion";

/**
 * Square destination card with overlay text.
 *
 * Props:
 *   city, country, price, img
 *   index – stagger index
 */
export default function DestinationCard({
  city,
  country,
  price,
  img,
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[3/4]"
    >
      <img
        src={img}
        alt={city}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <p className="font-bold text-sm leading-tight">{city}</p>
        <p className="text-xs text-white/70">{country}</p>
        <p className="text-xs mt-1 text-white/90">
          From <span className="font-bold">${price}</span>
        </p>
      </div>
    </motion.div>
  );
}
