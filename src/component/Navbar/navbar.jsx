import {
  Plane,
  Globe,
  ChevronDown,
  ChevronRight,
  UserCircle,
  LogOut,
  User,
  Pencil,
  Settings,
  Lock,
  Ticket,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Flights", href: "/flights" },
  { label: "Hotels", href: "/hotels" },
  { label: "Cars", href: "/cars" },
  { label: "Contact us", href: "/contact" },
];

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- Scroll visibility state ---
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const hideTimer = useRef(null);

  useEffect(() => {
    const SCROLL_THRESHOLD = window.innerHeight * 0.1; // 10% of screen height

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If near the top, always show the navbar
      if (currentScrollY < SCROLL_THRESHOLD) {
        setVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        // Scrolling DOWN → hide immediately
        setVisible(false);
        if (hideTimer.current) clearTimeout(hideTimer.current);
      } else {
        // Scrolling UP → show, then hide after 3.5s
        setVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => {
          setVisible(false);
        }, 3500);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);
  // --- End scroll logic ---

  const token = localStorage.getItem("auth_token");
  const isLoggedIn = !!token;

  let username = "User";
  if (isLoggedIn) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const firstName = user?.first_name || "";
      const lastName = user?.last_name || "";
      username = `${firstName} ${lastName}`.trim() || "User";
    } catch {
      username = "User";
    }
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch {
      // proceed with local logout even if API fails
    }
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setDropdownOpen(false);
    navigate("/login");
  };

  const menuItems = [
    { label: "My Profile", path: "/profile", icon: User },
    { label: "Update Profile", path: "/profile/update", icon: Pencil },
    { label: "Change Password", path: "/profile/change-password", icon: Lock },
    { label: "My Bookings", path: "/bookings", icon: Briefcase },
  ];

  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-emerald-500 to-teal-500",
    "from-indigo-500 to-purple-500",
    "from-pink-500 to-rose-500",
    "from-sky-500 to-blue-600",
  ];

  const gradientIndex =
    username.split("").reduce((a, c) => a + c.charCodeAt(0), 0) %
    gradients.length;

  const avatarGradient = gradients[gradientIndex];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold text-xl text-blue-600">
          <Plane className="w-5 h-5" />
          <span>Travel4Pennies</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden md:flex items-center gap-1 text-sm text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition">
            <Globe className="w-4 h-4" /> USD{" "}
            <ChevronDown className="w-3 h-3" />
          </button>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              {/* Trigger */}
              <div
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 text-sm text-gray-700 px-3 py-1.5 rounded-lg border transition select-none"
              >
                <UserCircle className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{username}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  {/* User Header */}
                  <div className="px-5 py-4 flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarGradient}
                      flex items-center justify-center text-white text-xl font-bold shadow-lg`}
                    >
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 text-base truncate">
                        {username}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {JSON.parse(localStorage.getItem("user"))?.email}
                      </p>
                      <span className="inline-block mt-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                        Traveler
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Menu Items */}
                  <div className="py-1">
                    {menuItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          navigate(item.path);
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-5 py-3 text-sm text-gray-800 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-blue-600" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </button>
                    ))}
                  </div>

                  {/* Upcoming Trips Banner */}
                  <div className="mx-3 mb-3">
                    <button
                      onClick={() => {
                        navigate("/bookings");
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <Plane className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs text-gray-500">
                            Upcoming Trips
                          </p>
                          <p className="text-sm font-semibold text-blue-600">
                            My Bookings
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-blue-400" />
                    </button>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Sign Out */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-sm px-4 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/register")}
                className="text-sm px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
