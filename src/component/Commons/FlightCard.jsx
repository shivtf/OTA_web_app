// components/FlightCard.jsx
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

/**
 * Single flight deal card.
 *
 * Props match the shape used in Dashboard's flightDeals array:
 *   airline, color, from, to, dep, arr, dur, stops, price, orig, stopColor
 */

function AirlineLogo({ airline, color }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <Plane className="w-3 h-3 text-white" />
      </div>
      <span className="text-sm font-medium text-gray-800">{airline}</span>
    </div>
  );
}

export default function FlightCard({
  airline,
  color,
  from,
  to,
  dep,
  arr,
  dur,
  stops,
  price,
  orig,
  stopColor,
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.10)" }}
      className="bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <AirlineLogo airline={airline} color={color} />
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stopColor}`}
        >
          {stops}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg font-bold">{from}</span>
        <div className="flex-1 flex items-center gap-1">
          <div className="flex-1 border-t border-dashed border-gray-300" />
          <Plane className="w-3.5 h-3.5 text-gray-400" />
          <div className="flex-1 border-t border-dashed border-gray-300" />
        </div>
        <span className="text-lg font-bold">{to}</span>
      </div>

      <div className="flex justify-between text-xs text-gray-500 mb-3">
        <span>{dep}</span>
        <span className="text-gray-400">{dur}</span>
        <span>{arr}</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-xl font-extrabold text-blue-600">${price}</span>
          <span className="text-sm text-gray-400 line-through ml-1">
            ${orig}
          </span>
        </div>
        <button className="text-xs font-semibold text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition">
          View deal
        </button>
      </div>
    </motion.div>
  );
}
