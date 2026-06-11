// pages/FlightResults/FlightResults.jsx
import { useState, useMemo, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftRight,
  ChevronDown,
  ChevronUp,
  Search,
  Tag,
  Shield,
  Zap,
  Headphones,
  Clock,
  Luggage,
  Wifi,
  Plug,
  Leaf,
  AlertCircle,
  Check,
  X,
  SlidersHorizontal,
  MapPin,
  Loader2,
  Calendar,
  Users,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "../Navbar/navbar";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// ── Date helpers ────────────────────────────────────────────────────────────
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const DAYS_FULL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CLASSES = ["Economy", "Premium Economy", "Business", "First Class"];

function parseDate(str) {
  return str ? new Date(str + "T12:00:00") : null;
}
function toISO(d) {
  if (!d) return "";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function fmt(str) {
  const d = parseDate(str);
  return d
    ? `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`
    : "";
}
function fmtShort(str) {
  const d = parseDate(str);
  return d
    ? `${DAYS_FULL[d.getDay()]}, ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}`
    : "";
}

// ── Shared styles ───────────────────────────────────────────────────────────
const LABEL = {
  fontSize: 10,
  fontWeight: 700,
  color: "#9ca3af",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginBottom: 6,
};
const BOX = {
  border: "1px solid #d1d5db",
  borderRadius: 8,
  padding: "8px 10px",
  fontSize: 14,
  fontWeight: 600,
  color: "#111827",
  background: "#fff",
  boxSizing: "border-box",
  width: "100%",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.15s",
  cursor: "text",
};

// ── Place Autocomplete Input ─────────────────────────────────────────────────
function PlaceInput({
  label,
  value,
  onChange,
  placeholder = "City or airport",
}) {
  const [query, setQuery] = useState(value?.name || "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    setQuery(value?.name || "");
  }, [value?.name]);

  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  function handleChange(e) {
    const q = e.target.value;
    setQuery(q);
    onChange(null);
    clearTimeout(debounceRef.current);
    if (q.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/meta/places/search?q=${encodeURIComponent(q.trim())}`,
        );
        const json = await res.json();
        const places = Array.isArray(json.data)
          ? json.data
          : Array.isArray(json)
            ? json
            : [];
        setResults(places);
        setOpen(places.length > 0);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }

  function handleSelect(place) {
    setQuery(`${place.name} (${place.iataCode})`);
    onChange(place);
    setOpen(false);
    setResults([]);
  }

  const typeIcon = (type) =>
    type === "airport" ? "✈" : type === "city" ? "🏙" : "📍";

  return (
    <div
      ref={ref}
      style={{ flex: "1 1 0", minWidth: 130, position: "relative" }}
    >
      <div style={LABEL}>{label}</div>
      <div style={{ position: "relative" }}>
        <input
          style={{
            ...BOX,
            paddingRight: 32,
            borderColor: open ? "#2563eb" : "#d1d5db",
          }}
          value={query}
          onChange={handleChange}
          onFocus={() => {
            if (results.length) setOpen(true);
          }}
          placeholder={placeholder}
          autoComplete="off"
        />
        <div
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        >
          {loading ? (
            <Loader2
              style={{
                width: 14,
                height: 14,
                color: "#9ca3af",
                animation: "spin 1s linear infinite",
              }}
            />
          ) : (
            <MapPin style={{ width: 14, height: 14, color: "#9ca3af" }} />
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.13 }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              width: "max(100%, 280px)",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              boxShadow: "0 8px 30px rgba(0,0,0,0.13)",
              zIndex: 500,
              overflow: "hidden",
            }}
          >
            {results.map((place, i) => (
              <div
                key={place.id || i}
                onClick={() => handleSelect(place)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  cursor: "pointer",
                  borderBottom:
                    i < results.length - 1 ? "1px solid #f3f4f6" : "none",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f8faff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#fff")
                }
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    flexShrink: 0,
                  }}
                >
                  {typeIcon(place.type)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#111827",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {place.name}
                    {place.iataCode && (
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#2563eb",
                          background: "#eff6ff",
                          padding: "1px 6px",
                          borderRadius: 4,
                        }}
                      >
                        {place.iataCode}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 1 }}>
                    {[place.city, place.country].filter(Boolean).join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@keyframes spin { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Calendar Picker ─────────────────────────────────────────────────────────
function CalendarPicker({ label, value, onChange, minDate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = parseDate(value);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const [view, setView] = useState(() => {
    const d = selected || today;
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  function prevMonth() {
    setView((v) =>
      v.month === 0
        ? { year: v.year - 1, month: 11 }
        : { year: v.year, month: v.month - 1 },
    );
  }
  function nextMonth() {
    setView((v) =>
      v.month === 11
        ? { year: v.year + 1, month: 0 }
        : { year: v.year, month: v.month + 1 },
    );
  }

  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);
  while (cells.length % 7 !== 0) cells.push(null);

  const minD = minDate ? parseDate(minDate) : null;

  function pickDay(day) {
    if (!day) return;
    const picked = new Date(view.year, view.month, day, 12);
    if (minD && picked < minD) return;
    onChange(toISO(picked));
    setOpen(false);
  }
  const isSelected = (day) =>
    day &&
    selected &&
    selected.getFullYear() === view.year &&
    selected.getMonth() === view.month &&
    selected.getDate() === day;
  const isToday = (day) =>
    day &&
    today.getFullYear() === view.year &&
    today.getMonth() === view.month &&
    today.getDate() === day;
  const isDisabled = (day) => {
    if (!day || !minD) return false;
    return new Date(view.year, view.month, day, 12) < minD;
  };

  return (
    <div ref={ref} style={{ minWidth: 130, position: "relative" }}>
      <div style={LABEL}>{label}</div>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          ...BOX,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
          borderColor: open ? "#2563eb" : "#d1d5db",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.2,
          }}
        >
          {value ? fmt(value) : "Select date"}
        </div>
        <Calendar
          style={{
            width: 15,
            height: 15,
            flexShrink: 0,
            color: open ? "#2563eb" : "#9ca3af",
            transition: "color 0.15s",
          }}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              width: 300,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
              zIndex: 500,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "#2563eb",
                padding: "16px 20px 14px",
                color: "#fff",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  opacity: 0.75,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>
                {value ? fmt(value) : "Pick a date"}
              </div>
              {value && (
                <div style={{ fontSize: 13, opacity: 0.8, marginTop: 2 }}>
                  {fmtShort(value)}
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px 8px",
              }}
            >
              <button
                onClick={prevMonth}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  borderRadius: 6,
                  color: "#374151",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ChevronLeft style={{ width: 18, height: 18 }} />
              </button>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
                {MONTHS[view.month]} {view.year}
              </span>
              <button
                onClick={nextMonth}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  borderRadius: 6,
                  color: "#374151",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ChevronRight style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7,1fr)",
                padding: "0 12px",
                gap: 2,
              }}
            >
              {DAYS_SHORT.map((d) => (
                <div
                  key={d}
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#9ca3af",
                    padding: "4px 0",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7,1fr)",
                padding: "4px 12px 16px",
                gap: 2,
              }}
            >
              {cells.map((day, i) => {
                const sel = isSelected(day),
                  tod = isToday(day),
                  dis = isDisabled(day);
                return (
                  <div
                    key={i}
                    onClick={() => !dis && pickDay(day)}
                    style={{
                      textAlign: "center",
                      padding: "7px 0",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: sel ? 700 : 400,
                      cursor: day && !dis ? "pointer" : "default",
                      background: sel
                        ? "#2563eb"
                        : tod
                          ? "#eff6ff"
                          : "transparent",
                      color: sel
                        ? "#fff"
                        : dis
                          ? "#d1d5db"
                          : tod
                            ? "#2563eb"
                            : day
                              ? "#111827"
                              : "transparent",
                      border:
                        tod && !sel
                          ? "1.5px solid #bfdbfe"
                          : "1.5px solid transparent",
                      transition: "background 0.12s, color 0.12s",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      if (day && !dis && !sel)
                        e.currentTarget.style.background = "#f3f4f6";
                    }}
                    onMouseLeave={(e) => {
                      if (!sel)
                        e.currentTarget.style.background = tod
                          ? "#eff6ff"
                          : "transparent";
                    }}
                  >
                    {day || ""}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                borderTop: "1px solid #f3f4f6",
                padding: "10px 16px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 13,
                  color: "#6b7280",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Clear
              </button>
              <button
                onClick={() => {
                  onChange(toISO(today));
                  setOpen(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 13,
                  color: "#2563eb",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Today
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Travelers Dropdown ───────────────────────────────────────────────────────
function TravelersDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(value.adults);
  const [children, setChildren] = useState(value.children);
  const [infants, setInfants] = useState(value.infants);
  const [cabinClass, setCabinClass] = useState(value.cabinClass);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    onChange({ adults, children, infants, cabinClass });
  }, [adults, children, infants, cabinClass]);

  const total = adults + children + infants;
  const summary = `${total} Traveler${total !== 1 ? "s" : ""}, ${cabinClass}`;

  const Counter = ({ label, sub, value: val, onInc, onDec, min = 0 }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>
          {label}
        </div>
        {sub && (
          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 1 }}>
            {sub}
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={onDec}
          disabled={val <= min}
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            border: "1px solid #d1d5db",
            background: val <= min ? "#f9fafb" : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: val <= min ? "not-allowed" : "pointer",
            color: val <= min ? "#d1d5db" : "#374151",
          }}
        >
          <Minus style={{ width: 13, height: 13 }} />
        </button>
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#111827",
            minWidth: 16,
            textAlign: "center",
          }}
        >
          {val}
        </span>
        <button
          onClick={onInc}
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            border: "1px solid #2563eb",
            background: "#eff6ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#2563eb",
          }}
        >
          <Plus style={{ width: 13, height: 13 }} />
        </button>
      </div>
    </div>
  );

  return (
    <div ref={ref} style={{ minWidth: 190, position: "relative" }}>
      <div style={LABEL}>Travelers &amp; Class</div>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          ...BOX,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          borderColor: open ? "#2563eb" : "#d1d5db",
          userSelect: "none",
        }}
      >
        <Users
          style={{ width: 13, height: 13, color: "#9ca3af", flexShrink: 0 }}
        />
        <span
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: 600,
            color: "#111827",
            whiteSpace: "nowrap",
          }}
        >
          {summary}
        </span>
        <ChevronDown
          style={{
            width: 13,
            height: 13,
            color: "#9ca3af",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              width: 280,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              padding: "4px 16px 12px",
              zIndex: 500,
            }}
          >
            <Counter
              label="Adults"
              sub="Age 12+"
              value={adults}
              min={1}
              onInc={() => setAdults((a) => a + 1)}
              onDec={() => setAdults((a) => Math.max(1, a - 1))}
            />
            <Counter
              label="Children"
              sub="Age 2–11"
              value={children}
              min={0}
              onInc={() => setChildren((c) => c + 1)}
              onDec={() => setChildren((c) => Math.max(0, c - 1))}
            />
            <Counter
              label="Infants"
              sub="Under 2"
              value={infants}
              min={0}
              onInc={() => setInfants((i) => i + 1)}
              onDec={() => setInfants((i) => Math.max(0, i - 1))}
            />
            <div style={{ marginTop: 12 }}>
              <div style={{ ...LABEL, marginBottom: 8 }}>Cabin class</div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 6,
                }}
              >
                {CLASSES.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setCabinClass(cls)}
                    style={{
                      padding: "7px 10px",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: cabinClass === cls ? 600 : 400,
                      cursor: "pointer",
                      textAlign: "center",
                      border:
                        cabinClass === cls
                          ? "1.5px solid #2563eb"
                          : "1px solid #e5e7eb",
                      background: cabinClass === cls ? "#eff6ff" : "#fff",
                      color: cabinClass === cls ? "#2563eb" : "#374151",
                      transition: "all 0.15s",
                    }}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                marginTop: 14,
                width: "100%",
                padding: "9px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function parseDuration(iso) {
  if (!iso) return "";
  const h = iso.match(/(\d+)H/)?.[1];
  const m = iso.match(/(\d+)M/)?.[1];
  return [h && `${h}h`, m && `${m}m`].filter(Boolean).join(" ");
}

function fmtTime(isoStr) {
  if (!isoStr) return "";
  return new Date(isoStr).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function fmtDate(isoStr) {
  if (!isoStr) return "";
  return new Date(isoStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function overnightDays(dep, arr) {
  if (!dep || !arr) return 0;
  return Math.floor((new Date(arr) - new Date(dep)) / 86400000);
}

// ── Airline Logo ─────────────────────────────────────────────────────────────
function AirlineLogo({ airline }) {
  const [imgError, setImgError] = useState(false);
  const colors = {
    BA: "#075AAA",
    AA: "#0078D2",
    AI: "#D0001B",
    ZZ: "#5B3EF5",
    default: "#6366F1",
  };
  const bg = colors[airline?.iataCode] || colors.default;

  if (airline?.logoUrl && !imgError) {
    return (
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          border: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={airline.logoUrl}
          alt={airline.name}
          onError={() => setImgError(true)}
          style={{ width: 32, height: 32, objectFit: "contain" }}
        />
      </div>
    );
  }
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: 13,
        flexShrink: 0,
        letterSpacing: "0.02em",
      }}
    >
      {airline?.iataCode || "??"}
    </div>
  );
}

// ── Range Slider ─────────────────────────────────────────────────────────────
function RangeSlider({ min, max, value, onChange }) {
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        width: "100%",
        height: 4,
        borderRadius: 4,
        appearance: "none",
        cursor: "pointer",
        background: `linear-gradient(to right, #2563EB ${pct}%, #E5E7EB ${pct}%)`,
        outline: "none",
      }}
    />
  );
}

// ── Flight Card ───────────────────────────────────────────────────────────────
function FlightCard({ offer }) {
  const [expanded, setExpanded] = useState(false);
  const slice = offer.slices?.[0];
  const segment = slice?.segments?.[0];
  const airline = offer.owner;
  const pricing = offer.pricing;
  const conditions = offer.conditions;
  const passenger = segment?.passengers?.[0];
  const cabin = passenger?.cabin;
  const baggages = passenger?.baggages || [];
  const stops = slice?.stops ?? 0;
  const stopDetail =
    stops > 0 ? `${stops} stop${stops > 1 ? "s" : ""}` : "Non-stop";
  const depTime = fmtTime(slice?.departureAt);
  const arrTime = fmtTime(slice?.arrivalAt);
  const duration = parseDuration(slice?.duration);
  const nightDays = overnightDays(slice?.departureAt, slice?.arrivalAt);
  const originCode = slice?.origin?.iataCode;
  const destCode = slice?.destination?.iataCode;
  const fareLabel = slice?.fareBrandName;
  const checkedBag = baggages.find((b) => b.type === "checked");
  const carryOn = baggages.find((b) => b.type === "carry_on");
  const emissionsKg = pricing?.totalEmissionsKg;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        overflow: "hidden",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)")
      }
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "20px 24px",
        }}
      >
        {/* Airline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: 150,
            flexShrink: 0,
          }}
        >
          <AirlineLogo airline={airline} />
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#0F172A",
                lineHeight: 1.3,
              }}
            >
              {airline?.name}
            </div>
            <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>
              {airline?.iataCode} {segment?.marketingCarrierFlightNumber}
            </div>
            {fareLabel && (
              <div
                style={{
                  marginTop: 4,
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#6366F1",
                  background: "#EEF2FF",
                  padding: "1px 6px",
                  borderRadius: 4,
                  display: "inline-block",
                }}
              >
                {fareLabel}
              </div>
            )}
          </div>
        </div>

        {/* Depart */}
        <div style={{ textAlign: "center", minWidth: 60, flexShrink: 0 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#0F172A",
              lineHeight: 1,
            }}
          >
            {depTime}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#64748B",
              marginTop: 3,
            }}
          >
            {originCode}
          </div>
          <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 1 }}>
            {fmtDate(slice?.departureAt)}
          </div>
        </div>

        {/* Route line */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: "0 8px",
          }}
        >
          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>
            {stopDetail}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 4,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "2px solid #2563EB",
                background: "#fff",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                flex: 1,
                height: 1.5,
                background: "#CBD5E1",
                position: "relative",
              }}
            >
              {stops > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#94A3B8",
                  }}
                />
              )}
            </div>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#2563EB",
                flexShrink: 0,
              }}
            />
          </div>
          <div style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>
            {duration}
          </div>
        </div>

        {/* Arrive */}
        <div style={{ textAlign: "center", minWidth: 60, flexShrink: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1,
              }}
            >
              {arrTime}
            </div>
            {nightDays > 0 && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#F97316",
                  background: "#FFF7ED",
                  padding: "1px 5px",
                  borderRadius: 4,
                  marginTop: 2,
                }}
              >
                +{nightDays}d
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#64748B",
              marginTop: 3,
            }}
          >
            {destCode}
          </div>
          <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 1 }}>
            {fmtDate(slice?.arrivalAt)}
          </div>
        </div>

        {/* Amenity icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginLeft: 4,
            flexShrink: 0,
          }}
        >
          <div
            title={
              checkedBag
                ? `${checkedBag.quantity} checked bag`
                : "No checked bag"
            }
          >
            <Luggage
              style={{
                width: 17,
                height: 17,
                color: checkedBag ? "#2563EB" : "#CBD5E1",
              }}
            />
          </div>
          <div
            title={
              cabin?.amenities?.wifi?.available
                ? `WiFi (${cabin.amenities.wifi.cost})`
                : "No WiFi"
            }
          >
            <Wifi
              style={{
                width: 17,
                height: 17,
                color: cabin?.amenities?.wifi?.available
                  ? "#2563EB"
                  : "#CBD5E1",
              }}
            />
          </div>
          <div
            title={
              cabin?.amenities?.power?.available ? "Power outlet" : "No power"
            }
          >
            <Plug
              style={{
                width: 17,
                height: 17,
                color: cabin?.amenities?.power?.available
                  ? "#2563EB"
                  : "#CBD5E1",
              }}
            />
          </div>
          {emissionsKg && (
            <div
              title={`${emissionsKg} kg CO₂`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                fontSize: 11,
                color: parseInt(emissionsKg) < 100 ? "#16A34A" : "#64748B",
                fontWeight: 600,
              }}
            >
              <Leaf style={{ width: 14, height: 14 }} />
              {emissionsKg}kg
            </div>
          )}
        </div>

        {/* Price */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginLeft: "auto",
            flexShrink: 0,
            minWidth: 130,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#0F172A",
              lineHeight: 1,
            }}
          >
            ${parseFloat(pricing?.totalAmount).toFixed(0)}
          </div>
          <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>
            {pricing?.totalCurrency} · per person
          </div>
          <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 1 }}>
            Base ${parseFloat(pricing?.baseAmount).toFixed(2)} + Tax $
            {parseFloat(pricing?.taxAmount).toFixed(2)}
          </div>
          <button
            style={{
              marginTop: 10,
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "9px 20px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              width: "100%",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
          >
            Select
          </button>
        </div>
      </div>

      {/* Conditions */}
      <div
        style={{
          display: "flex",
          gap: 16,
          padding: "10px 24px 14px",
          borderTop: "1px solid #F1F5F9",
        }}
      >
        <ConditionBadge
          ok={conditions?.refundable}
          label={conditions?.refundable ? "Refundable" : "Non-refundable"}
        />
        <ConditionBadge
          ok={conditions?.changeable}
          label={
            conditions?.changeable
              ? `Changeable${conditions.changePenaltyAmount ? ` ($${conditions.changePenaltyAmount})` : ""}`
              : "Non-changeable"
          }
        />
        {carryOn && (
          <ConditionBadge ok label={`${carryOn.quantity} carry-on`} />
        )}
        {checkedBag && (
          <ConditionBadge ok label={`${checkedBag.quantity} checked bag`} />
        )}
      </div>

      {/* Expanded */}
      {expanded && (
        <div
          style={{
            borderTop: "1px solid #F1F5F9",
            background: "#F8FAFC",
            padding: "18px 24px",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#0F172A",
              marginBottom: 12,
            }}
          >
            Flight Details
          </div>
          {offer.slices?.map((sl, si) => (
            <div key={si}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 10,
                }}
              >
                {sl.origin?.cityName} → {sl.destination?.cityName} ·{" "}
                {parseDuration(sl.duration)}
              </div>
              {sl.segments?.map((seg, segi) => (
                <div
                  key={segi}
                  style={{
                    display: "flex",
                    gap: 16,
                    background: "#fff",
                    borderRadius: 12,
                    padding: "14px 16px",
                    border: "1px solid #E5E7EB",
                    marginBottom: 8,
                  }}
                >
                  <AirlineLogo airline={seg.marketingCarrier} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                      <div>
                        <div
                          style={{
                            fontSize: 18,
                            fontWeight: 800,
                            color: "#0F172A",
                          }}
                        >
                          {fmtTime(seg.departingAt)}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "#64748B",
                            marginTop: 2,
                          }}
                        >
                          {seg.origin?.iataCode} · {seg.origin?.name}
                        </div>
                        {seg.originTerminal && (
                          <div style={{ fontSize: 11, color: "#94A3B8" }}>
                            Terminal {seg.originTerminal}
                          </div>
                        )}
                        <div style={{ fontSize: 11, color: "#94A3B8" }}>
                          {fmtDate(seg.departingAt)}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#94A3B8",
                          fontSize: 11,
                          gap: 4,
                        }}
                      >
                        <Clock size={14} />
                        {parseDuration(seg.duration)}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 18,
                            fontWeight: 800,
                            color: "#0F172A",
                          }}
                        >
                          {fmtTime(seg.arrivingAt)}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "#64748B",
                            marginTop: 2,
                          }}
                        >
                          {seg.destination?.iataCode} · {seg.destination?.name}
                        </div>
                        {seg.destinationTerminal && (
                          <div style={{ fontSize: 11, color: "#94A3B8" }}>
                            Terminal {seg.destinationTerminal}
                          </div>
                        )}
                        <div style={{ fontSize: 11, color: "#94A3B8" }}>
                          {fmtDate(seg.arrivingAt)}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        marginTop: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      <InfoChip
                        label="Airline"
                        value={`${seg.marketingCarrier?.name} ${seg.marketingCarrierFlightNumber}`}
                      />
                      {seg.aircraft && (
                        <InfoChip label="Aircraft" value={seg.aircraft.name} />
                      )}
                      {seg.passengers?.[0]?.cabinClassMarketingName && (
                        <InfoChip
                          label="Cabin"
                          value={seg.passengers[0].cabinClassMarketingName}
                        />
                      )}
                      {seg.passengers?.[0]?.fareBasisCode && (
                        <InfoChip
                          label="Fare basis"
                          value={seg.passengers[0].fareBasisCode}
                        />
                      )}
                      {seg.passengers?.[0]?.cabin?.amenities?.seat?.pitch && (
                        <InfoChip
                          label="Seat pitch"
                          value={`${seg.passengers[0].cabin.amenities.seat.pitch}"`}
                        />
                      )}
                      {seg.distance && (
                        <InfoChip
                          label="Distance"
                          value={`${Math.round(parseFloat(seg.distance))} km`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ConditionBadge({ ok, label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontSize: 11,
        fontWeight: 500,
        color: ok ? "#16A34A" : "#9CA3AF",
      }}
    >
      {ok ? (
        <Check size={12} style={{ color: "#16A34A" }} />
      ) : (
        <X size={12} style={{ color: "#CBD5E1" }} />
      )}
      {label}
    </div>
  );
}

function InfoChip({ label, value }) {
  return (
    <div style={{ fontSize: 11, color: "#64748B" }}>
      <span style={{ color: "#94A3B8" }}>{label}: </span>
      <span style={{ fontWeight: 600, color: "#374151" }}>{value}</span>
    </div>
  );
}

// ── Normalize API response ──────────────────────────────────────────────────
function extractFlightData(result) {
  if (!result) return { offers: [], filters: {}, slices: [], totalOffers: 0 };
  let inner = null;
  if (Array.isArray(result?.data?.offers) && result.data.offers.length >= 0)
    inner = result.data;
  else if (Array.isArray(result?.offers)) inner = result;
  else if (result?.data && typeof result.data === "object") inner = result.data;
  else inner = result;
  const offers = Array.isArray(inner?.offers) ? inner.offers : [];
  return {
    offers,
    filters: inner?.filters || {},
    slices: inner?.slices || [],
    totalOffers: inner?.totalOffers || offers.length,
  };
}

// ── Filter Section ───────────────────────────────────────────────────────────
function FilterSection({ label, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: 4 }}>
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px 0 10px",
          fontSize: 13,
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        {label}
        {open ? (
          <ChevronUp size={14} style={{ color: "#94A3B8" }} />
        ) : (
          <ChevronDown size={14} style={{ color: "#94A3B8" }} />
        )}
      </button>
      {open && children}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function FlightResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    searchParams,
    from: initFrom,
    to: initTo,
    returnDate: initReturn,
    travelers: initTravelers,
    result: initResult,
  } = location.state || {};

  // ── Search box state (initialized from incoming route state) ──
  const todayISO = new Date().toISOString().split("T")[0];
  const returnDayISO = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  })();

  const [from, setFrom] = useState(initFrom || null);
  const [to, setTo] = useState(initTo || null);
  const [depart, setDepart] = useState(searchParams?.departureDate || todayISO);
  const [returnDate, setReturnDate] = useState(initReturn || returnDayISO);
  const [showReturn, setShowReturn] = useState(!!initReturn);
  const [travelers, setTravelers] = useState(
    initTravelers || {
      adults: 1,
      children: 0,
      infants: 0,
      cabinClass: "Economy",
    },
  );
  const [searching, setSearching] = useState(false);

  // ── Results state ──
  const [result, setResult] = useState(initResult || null);
  const { offers, filters, slices, totalOffers } = extractFlightData(result);

  const priceMin = Math.floor(parseFloat(filters.priceRange?.min ?? 0));
  const priceMax = Math.ceil(parseFloat(filters.priceRange?.max ?? 1000));

  const [activeSort, setActiveSort] = useState("cheapest");
  const [maxPrice, setMaxPrice] = useState(() => priceMax);
  const [stopsFilter, setStopsFilter] = useState({
    0: true,
    1: true,
    "2+": true,
  });
  const [airlineFilter, setAirlineFilter] = useState(() => {
    const init = {};
    (filters.availableAirlines || []).forEach((a) => (init[a] = true));
    return init;
  });
  const [refundableOnly, setRefundableOnly] = useState(false);
  const [changeableOnly, setChangeableOnly] = useState(false);

  const BATCH = 8;
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const sentinelRef = useRef(null);

  useEffect(() => {
    setVisibleCount(BATCH);
  }, [activeSort, maxPrice, stopsFilter, airlineFilter]);
  useEffect(() => {
    if (priceMax > 0) setMaxPrice(priceMax);
  }, [priceMax]);
  useEffect(() => {
    const init = {};
    (filters.availableAirlines || []).forEach((a) => (init[a] = true));
    setAirlineFilter(init);
  }, [filters.availableAirlines?.join(",")]);

  // ── Handle new search ──
  async function handleSearch() {
    if (!from?.iataCode || !to?.iataCode) {
      alert("Please select a valid origin and destination.");
      return;
    }
    if (!depart) {
      alert("Please select a departure date.");
      return;
    }
    setSearching(true);
    try {
      const payload = {
        origin: from.iataCode,
        destination: to.iataCode,
        departureDate: depart,
        adults: travelers.adults,
        children: travelers.children,
        infants: travelers.infants,
        cabinClass: travelers.cabinClass.toLowerCase().replace(/ /g, "_"),
      };
      const res = await fetch(`${BASE_URL}/flights/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      // Update results in-place without navigating away
      setResult(data);
      setVisibleCount(BATCH);
      // Also update the browser history state so a refresh works
      navigate("/flights/results", {
        state: {
          searchParams: payload,
          from,
          to,
          returnDate: showReturn ? returnDate : null,
          travelers,
          result: data,
        },
        replace: true,
      });
    } catch (err) {
      console.error("Flight search error:", err);
    } finally {
      setSearching(false);
    }
  }

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  const processed = useMemo(() => {
    let list = offers.filter((o) => {
      const price = parseFloat(o.pricing?.totalAmount);
      if (price > maxPrice) return false;
      const stops = o.slices?.[0]?.stops ?? 0;
      const stopsKey = stops >= 2 ? "2+" : stops;
      if (!stopsFilter[stopsKey]) return false;
      const airline = o.owner?.iataCode;
      if (airlineFilter[airline] === false) return false;
      if (refundableOnly && !o.conditions?.refundable) return false;
      if (changeableOnly && !o.conditions?.changeable) return false;
      return true;
    });
    if (activeSort === "cheapest")
      list = [...list].sort(
        (a, b) =>
          parseFloat(a.pricing?.totalAmount) -
          parseFloat(b.pricing?.totalAmount),
      );
    else if (activeSort === "fastest")
      list = [...list].sort((a, b) =>
        (a.slices?.[0]?.duration || "PT99H").localeCompare(
          b.slices?.[0]?.duration || "PT99H",
        ),
      );
    else if (activeSort === "refundable")
      list = list.filter((o) => o.conditions?.refundable);
    else if (activeSort === "changeable")
      list = list.filter((o) => o.conditions?.changeable);
    else
      list = [...list].sort(
        (a, b) =>
          parseFloat(a.pricing?.totalAmount) +
          (parseInt(a.pricing?.totalEmissionsKg) || 0) * 0.05 -
          (parseFloat(b.pricing?.totalAmount) +
            (parseInt(b.pricing?.totalEmissionsKg) || 0) * 0.05),
      );
    return list;
  }, [
    offers,
    maxPrice,
    stopsFilter,
    airlineFilter,
    activeSort,
    refundableOnly,
    changeableOnly,
  ]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleCount((prev) => prev + BATCH);
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [processed.length]);

  const cheapestPrice = useMemo(
    () =>
      offers.length
        ? Math.min(...offers.map((o) => parseFloat(o.pricing?.totalAmount)))
        : 0,
    [offers],
  );
  const fastestDur = useMemo(
    () =>
      offers.length
        ? offers.map((o) => o.slices?.[0]?.duration || "PT99H").sort()[0]
        : "",
    [offers],
  );
  const allAirlines = filters.availableAirlines || [];
  const airlineNameMap = useMemo(() => {
    const map = {};
    offers.forEach((o) => {
      if (o.owner?.iataCode && o.owner?.name)
        map[o.owner.iataCode] = o.owner.name;
    });
    return map;
  }, [offers]);
  const airlineOfferCount = useMemo(() => {
    const counts = {};
    offers.forEach((o) => {
      const code = o.owner?.iataCode;
      if (code) counts[code] = (counts[code] || 0) + 1;
    });
    return counts;
  }, [offers]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <Navbar autoHide={false} />
      <div style={{ height: 56 }} />

      {/* ── Search bar ── */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          padding: "24px 32px 0",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          {/* Fields row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              paddingBottom: 12,
            }}
          >
            <PlaceInput
              label="From"
              value={from}
              onChange={setFrom}
              placeholder="City or airport"
            />

            {/* Swap */}
            <button
              onClick={handleSwap}
              aria-label="Swap"
              style={{
                flexShrink: 0,
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "1px solid #d1d5db",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                marginBottom: 1,
              }}
            >
              <ArrowLeftRight
                style={{ width: 13, height: 13, color: "#2563eb" }}
              />
            </button>

            <PlaceInput
              label="To"
              value={to}
              onChange={setTo}
              placeholder="City or airport"
            />

            <CalendarPicker
              label="Depart"
              value={depart}
              onChange={setDepart}
            />

            {showReturn && (
              <CalendarPicker
                label="Return"
                value={returnDate}
                onChange={setReturnDate}
                minDate={depart}
              />
            )}

            <TravelersDropdown value={travelers} onChange={setTravelers} />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSearch}
              disabled={searching}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: searching ? "#93c5fd" : "#2563eb",
                color: "#fff",
                padding: "9px 20px",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                border: "none",
                cursor: searching ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
                transition: "background 0.2s",
              }}
            >
              <Search style={{ width: 15, height: 15 }} />
              {searching ? "Searching…" : "Search flights"}
            </motion.button>
          </div>

          {/* Return trip toggle */}
          <div style={{ paddingBottom: 10 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontSize: 13,
                color: "#6b7280",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <input
                type="checkbox"
                checked={showReturn}
                onChange={(e) => setShowReturn(e.target.checked)}
                style={{
                  width: 13,
                  height: 13,
                  accentColor: "#2563eb",
                  cursor: "pointer",
                }}
              />
              Add return trip
            </label>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "24px 32px",
          display: "flex",
          gap: 24,
        }}
      >
        {/* ── Filter sidebar ── */}
        <div style={{ width: 260, flexShrink: 0 }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              border: "1px solid #E5E7EB",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#0F172A",
                }}
              >
                <SlidersHorizontal size={15} style={{ color: "#2563EB" }} />
                Filters
              </div>
              <button
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 12,
                  color: "#2563EB",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setMaxPrice(priceMax);
                  setStopsFilter({ 0: true, 1: true, "2+": true });
                  const a = {};
                  allAirlines.forEach((k) => (a[k] = true));
                  setAirlineFilter(a);
                  setRefundableOnly(false);
                  setChangeableOnly(false);
                }}
              >
                Clear all
              </button>
            </div>

            <FilterSection label="Stops">
              {[
                { key: 0, label: "Non-stop" },
                { key: 1, label: "1 stop" },
                { key: "2+", label: "2+ stops" },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={stopsFilter[key] !== false}
                    onChange={(e) =>
                      setStopsFilter((p) => ({ ...p, [key]: e.target.checked }))
                    }
                    style={{ accentColor: "#2563EB" }}
                  />
                  <span style={{ color: "#0F172A", flex: 1 }}>{label}</span>
                </label>
              ))}
            </FilterSection>

            <FilterSection label="Ticket Flexibility">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                <input
                  type="checkbox"
                  checked={refundableOnly}
                  onChange={(e) => setRefundableOnly(e.target.checked)}
                  style={{ accentColor: "#2563EB" }}
                />
                <span style={{ color: "#0F172A", flex: 1 }}>
                  Refundable only
                </span>
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                <input
                  type="checkbox"
                  checked={changeableOnly}
                  onChange={(e) => setChangeableOnly(e.target.checked)}
                  style={{ accentColor: "#2563EB" }}
                />
                <span style={{ color: "#0F172A", flex: 1 }}>
                  Changeable only
                </span>
              </label>
            </FilterSection>

            <div style={{ borderTop: "1px solid #F1F5F9", margin: "14px 0" }} />

            {allAirlines.length > 0 && (
              <>
                <FilterSection label="Airlines">
                  {allAirlines.map((code) => (
                    <label
                      key={code}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 8,
                        cursor: "pointer",
                        fontSize: 13,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={airlineFilter[code] !== false}
                        onChange={(e) =>
                          setAirlineFilter((p) => ({
                            ...p,
                            [code]: e.target.checked,
                          }))
                        }
                        style={{ accentColor: "#2563EB" }}
                      />
                      <span style={{ color: "#0F172A", flex: 1, fontSize: 12 }}>
                        {airlineNameMap[code] || code}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#94A3B8",
                          fontWeight: 600,
                        }}
                      >
                        {airlineOfferCount[code] || 0}
                      </span>
                    </label>
                  ))}
                </FilterSection>
                <div
                  style={{ borderTop: "1px solid #F1F5F9", margin: "14px 0" }}
                />
              </>
            )}

            <FilterSection label="Max price">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "#64748B",
                  marginBottom: 8,
                }}
              >
                <span>${priceMin}</span>
                <span style={{ fontWeight: 700, color: "#0F172A" }}>
                  ${maxPrice}
                </span>
              </div>
              <RangeSlider
                min={priceMin}
                max={priceMax}
                value={maxPrice}
                onChange={setMaxPrice}
              />
            </FilterSection>
          </div>
        </div>

        {/* ── Results ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 18,
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#0F172A",
                margin: 0,
              }}
            >
              {processed.length} flight{processed.length !== 1 ? "s" : ""} found
            </h2>
            {totalOffers > 0 && (
              <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>
                of {totalOffers} total
              </span>
            )}
          </div>

          {/* Sort tabs */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 18,
              flexWrap: "wrap",
            }}
          >
            {[
              { id: "best", label: "Best", badge: "Recommended" },
              {
                id: "cheapest",
                label: "Cheapest",
                sub: `$${cheapestPrice.toFixed(0)}`,
              },
              {
                id: "fastest",
                label: "Fastest",
                sub: parseDuration(fastestDur),
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveSort((prev) => (prev === tab.id ? null : tab.id))
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 18px",
                  borderRadius: 12,
                  border:
                    activeSort === tab.id
                      ? "1.5px solid #2563EB"
                      : "1px solid #E5E7EB",
                  background: activeSort === tab.id ? "#EFF6FF" : "#fff",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 700,
                  color: activeSort === tab.id ? "#2563EB" : "#374151",
                  transition: "all 0.15s",
                }}
              >
                {tab.label}
                {tab.badge && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      background: "#DBEAFE",
                      color: "#2563EB",
                      padding: "2px 7px",
                      borderRadius: 20,
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
                {tab.sub && (
                  <span
                    style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}
                  >
                    {tab.sub}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Flight list */}
          {offers.length === 0 ? (
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                border: "1px solid #E5E7EB",
                padding: "60px 24px",
                textAlign: "center",
              }}
            >
              <AlertCircle
                size={40}
                style={{ color: "#CBD5E1", marginBottom: 12 }}
              />
              <div style={{ fontSize: 16, fontWeight: 700, color: "#374151" }}>
                No flights found
              </div>
              <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 6 }}>
                No flights are available for this route and date. Try different
                dates or nearby airports.
              </div>
            </div>
          ) : processed.length === 0 ? (
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                border: "1px solid #E5E7EB",
                padding: "60px 24px",
                textAlign: "center",
              }}
            >
              <AlertCircle
                size={40}
                style={{ color: "#CBD5E1", marginBottom: 12 }}
              />
              <div style={{ fontSize: 16, fontWeight: 700, color: "#374151" }}>
                No flights match your filters
              </div>
              <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 6 }}>
                Try widening the price range or relaxing stop filters
              </div>
            </div>
          ) : (
            <>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {processed.slice(0, visibleCount).map((offer, i) => (
                  <FlightCard
                    key={offer.offerId || i}
                    offer={offer}
                    index={i}
                  />
                ))}
              </div>

              {visibleCount < processed.length && (
                <div
                  ref={sentinelRef}
                  style={{
                    padding: "32px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  {[1, 2].map((n) => (
                    <div
                      key={n}
                      style={{
                        width: "100%",
                        height: 110,
                        borderRadius: 18,
                        background:
                          "linear-gradient(90deg, #F1F5F9 0%, #E2E8F0 50%, #F1F5F9 100%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.4s infinite",
                        border: "1px solid #E5E7EB",
                      }}
                    />
                  ))}
                  <div
                    style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}
                  >
                    Showing {Math.min(visibleCount, processed.length)} of{" "}
                    {processed.length} flights
                  </div>
                </div>
              )}

              {visibleCount >= processed.length && processed.length > BATCH && (
                <div style={{ padding: "24px 0", textAlign: "center" }}>
                  <div
                    style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}
                  >
                    All {processed.length} flights shown
                  </div>
                </div>
              )}

              <style>{`
                @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
              `}</style>
            </>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <div
          style={{
            width: 270,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              border: "1px solid #E5E7EB",
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: 16,
              }}
            >
              Why book with us?
            </div>
            {[
              {
                icon: <Tag size={14} />,
                title: "Best Price Guarantee",
                sub: "We match the lowest price",
              },
              {
                icon: <Shield size={14} />,
                title: "Secure Payments",
                sub: "Your payment is 100% secure",
              },
              {
                icon: <Zap size={14} />,
                title: "Instant Confirmation",
                sub: "Get your e-ticket instantly",
              },
              {
                icon: <Headphones size={14} />,
                title: "24/7 Support",
                sub: "We're here to help anytime",
              },
            ].map(({ icon, title, sub }) => (
              <div
                key={title}
                style={{ display: "flex", gap: 12, marginBottom: 14 }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "#EFF6FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2563EB",
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}
                  >
                    {title}
                  </div>
                  <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>
                    {sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {offers[0]?.expiresAt && (
            <div
              style={{
                background: "#FFFBEB",
                borderRadius: 14,
                border: "1px solid #FDE68A",
                padding: "14px 16px",
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <Clock
                size={15}
                style={{ color: "#D97706", flexShrink: 0, marginTop: 1 }}
              />
              <div>
                <div
                  style={{ fontSize: 12, fontWeight: 700, color: "#92400E" }}
                >
                  Prices expire soon
                </div>
                <div style={{ fontSize: 11, color: "#B45309", marginTop: 2 }}>
                  Lock in your fare before{" "}
                  {new Date(offers[0].expiresAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
