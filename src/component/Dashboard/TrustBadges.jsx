// components/TrustBadges.jsx
import { motion } from "framer-motion";
import { Shield, Tag, Zap, Headphones, CalendarCheck } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Payments",
    desc: "Your payment is 100% secure and protected.",
  },
  {
    icon: Tag,
    title: "Best Price Guarantee",
    desc: "We compare prices to get you the best deal.",
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    desc: "Get booking confirmation instantly via email.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Our team is here to help you anytime.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Booking",
    desc: "Easy changes and cancellation options.",
  },
];

/**
 * Row of 5 trust-signal badges.
 * Can override the `items` prop to use custom badges on other pages.
 */
export default function TrustBadges({ items = features }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {items.map(({ icon: Icon, title, desc }, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
          className="flex gap-3 items-start"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Icon className="text-blue-600" size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{title}</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-snug">{desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
