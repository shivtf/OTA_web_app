// components/HotelCard.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, CheckCircle } from "lucide-react";

/**
 * Single hotel card with like toggle.
 *
 * Props:
 *   name, location, rating, price, amenities, img
 *   liked        – boolean (controlled)
 *   onLikeToggle – () => void
 *   index        – stagger index
 */
export default function HotelCard({
  name,
  location,
  rating,
  price,
  amenities = [],
  img,
  liked = false,
  onLikeToggle,
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold">{rating}</span>
        </div>
        <button
          onClick={onLikeToggle}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition"
        >
          <Heart
            className={`w-3.5 h-3.5 ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="font-bold text-sm">{name}</p>
        <p className="text-xs text-gray-500 mb-2">{location}</p>
        <div className="flex gap-3 mb-3">
          {amenities.map((a) => (
            <span key={a} className="text-xs text-gray-500 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-blue-400" /> {a}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-extrabold text-blue-600">
            ${price}
            <span className="text-xs font-normal text-gray-400"> /night</span>
          </span>
          <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition">
            Book now
          </button>
        </div>
      </div>
    </motion.div>
  );
}