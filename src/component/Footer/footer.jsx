// components/Footer.jsx
import { Plane } from "lucide-react";
import {
  IconFacebook,
  IconInstagram,
  IconTwitterX,
  IconYoutube,
} from "../Commons/SocialIcons";

const socialIcons = [
  { Icon: IconFacebook, label: "Facebook" },
  { Icon: IconInstagram, label: "Instagram" },
  { Icon: IconTwitterX, label: "X (Twitter)" },
  { Icon: IconYoutube, label: "YouTube" },
];

const footerLinks = [
  { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "FAQs", "Terms of Service"],
  },
  {
    title: "Explore",
    links: ["Flights", "Hotels", "Packages", "Destinations"],
  },
  {
    title: "Policies",
    links: [
      "Privacy Policy",
      "Cookie Policy",
      "Refund Policy",
      "Accessibility",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          {/* Brand + social */}
          <div className="col-span-2">
            <div className="flex items-center gap-1.5 font-bold text-xl text-blue-600 mb-3">
              <Plane className="w-5 h-5" /> Travel4Pennies
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Your trusted travel partner for flights, hotels and unforgettable
              experiences.
            </p>
            <div className="flex gap-3 mt-4">
              {socialIcons.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-gray-500 transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <p className="font-semibold text-sm mb-3">{title}</p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-blue-600 transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © 2025 Travel4Pennies. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 mr-1">Secure Payments</span>
            {["VISA", "MC", "AMEX", "PP"].map((card) => (
              <div
                key={card}
                className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600"
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
