import { useState, useEffect, useRef } from "react";
import React from "react";

const BLUE = "#2152E8";
const BLUE_LIGHT = "#EEF2FF";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    position: "relative",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    overflowX: "hidden",
    width: "100%",
    boxSizing: "border-box",
  },
  left: {
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    padding: "32px 48px 32px 48px",
    minHeight: "100vh",
    color: "#1a1a2e",
  },
  leftOverlay: {
    position: "fixed",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(200,220,255,0.45) 0%, rgba(180,210,255,0.25) 60%, rgba(150,190,255,0.15) 100%)",
    zIndex: 0,
    pointerEvents: "none",
  },
  leftContent: { position: "relative", zIndex: 1, flex: 1 },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 700,
    fontSize: 22,
    color: BLUE,
    marginBottom: 40,
  },
  logoIcon: { width: 32, height: 32 },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(255,255,255,0.75)",
    border: "1px solid #e0e8ff",
    borderRadius: 20,
    padding: "5px 14px",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    color: BLUE,
    marginBottom: 24,
  },
  headline: {
    fontSize: 52,
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 0,
    color: "#1a1a2e",
  },
  headlineBlue: { color: BLUE, display: "block" },
  subtext: {
    marginTop: 18,
    fontSize: 15,
    color: "#3a3a5a",
    lineHeight: 1.6,
    maxWidth: 380,
  },
  stats: { display: "flex", gap: 32, marginTop: 36 },
  statBox: {
    background: "rgba(255,255,255,0.7)",
    borderRadius: 14,
    padding: "12px 18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 80,
    backdropFilter: "blur(8px)",
  },
  statIcon: { fontSize: 22, marginBottom: 4 },
  statNum: { fontWeight: 800, fontSize: 17, color: "#1a1a2e" },
  statLabel: { fontSize: 11, color: "#666", marginTop: 2 },
  bonusCard: {
    background: "rgba(255,255,255,0.82)",
    borderRadius: 18,
    padding: "20px 20px",
    marginTop: 40,
    maxWidth: 420,
    display: "flex",
    alignItems: "center",
    gap: 16,
    backdropFilter: "blur(12px)",
    boxShadow: "0 4px 24px rgba(33,82,232,0.08)",
  },
  bonusLeft: { flex: 1 },
  bonusTitle: {
    fontWeight: 700,
    fontSize: 15,
    color: "#1a1a2e",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  bonusDesc: { fontSize: 13, color: "#555", marginTop: 4 },
  bonusBadge: {
    marginTop: 10,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: BLUE_LIGHT,
    color: BLUE,
    borderRadius: 8,
    padding: "5px 10px",
    fontSize: 12,
    fontWeight: 700,
  },
  bonusImg: {
    width: 90,
    height: 70,
    borderRadius: 12,
    objectFit: "cover",
    flexShrink: 0,
  },
  trustBar: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    gap: 32,
    marginTop: 32,
    fontSize: 13,
    color: "#1a1a2e",
    fontWeight: 500,
  },
  trustItem: { display: "flex", alignItems: "center", gap: 6 },
  right: {
    width: 520,
    minWidth: 0,
    background: "#fff",
    padding: "36px 40px",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.1)",
    alignSelf: "center",
    borderRadius: "24px",
    margin: "32px 32px 32px 0",
    zIndex: 10,
    maxHeight: "calc(100vh - 64px)",
    flexShrink: 0,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 800,
    color: "#1a1a2e",
    marginBottom: 2,
  },
  formSub: { fontSize: 14, color: "#888", marginBottom: 28 },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
    marginBottom: 6,
    display: "block",
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #e5e7eb",
    borderRadius: 10,
    padding: "0 14px",
    marginBottom: 16,
    background: "#fafafa",
    transition: "border 0.2s",
  },
  inputWrapFocus: { border: `1.5px solid ${BLUE}`, background: "#fff" },
  inputIcon: { color: "#aaa", marginRight: 10, fontSize: 16, flexShrink: 0 },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 14,
    color: "#222",
    background: "transparent",
    padding: "12px 0",
  },
  eyeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#aaa",
    padding: 0,
    fontSize: 16,
  },
  row: { display: "flex", gap: 12 },
  rowItem: { flex: 1 },
  select: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 14,
    color: "#222",
    background: "transparent",
    padding: "12px 0",
    cursor: "pointer",
    appearance: "none",
    width: "100%",
  },
  checkRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 20,
    marginTop: 4,
  },
  checkbox: {
    marginTop: 2,
    accentColor: BLUE,
    width: 15,
    height: 15,
    cursor: "pointer",
  },
  checkLabel: { fontSize: 13, color: "#555", lineHeight: 1.5 },
  link: { color: BLUE, textDecoration: "none", fontWeight: 600 },
  createBtn: {
    width: "100%",
    background: BLUE,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px 0",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: 16,
    transition: "background 0.2s",
  },
  orRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
    color: "#bbb",
    fontSize: 13,
  },
  orLine: { flex: 1, height: 1, background: "#e5e7eb" },
  socialBtn: {
    width: "100%",
    border: "1.5px solid #e5e7eb",
    borderRadius: 10,
    padding: "12px 0",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: 10,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    color: "#222",
  },
  loginRow: { textAlign: "center", marginTop: 10, fontSize: 13, color: "#888" },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: "#aaa",
    textTransform: "uppercase",
    marginTop: 8,
    marginBottom: 14,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  sectionLine: { flex: 1, height: 1, background: "#f0f0f0" },
  dialDivider: {
    width: 1,
    height: 20,
    background: "#e5e7eb",
    margin: "0 10px 0 4px",
    flexShrink: 0,
  },
  dialSelect: {
    border: "none",
    outline: "none",
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
    background: "transparent",
    cursor: "pointer",
    appearance: "none",
    padding: "12px 0",
    minWidth: 60,
  },
  tzBadge: {
    fontSize: 10,
    fontWeight: 700,
    background: BLUE_LIGHT,
    color: BLUE,
    borderRadius: 4,
    padding: "2px 6px",
    marginLeft: 6,
    letterSpacing: "0.05em",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  loadingBar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#aaa",
    fontSize: 13,
    padding: "10px 0",
    marginBottom: 8,
  },
  spinner: {
    width: 14,
    height: 14,
    border: "2px solid #e5e7eb",
    borderTop: `2px solid ${BLUE}`,
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
  apiNote: {
    fontSize: 11,
    color: "#bbb",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

// Convert cca2 code → emoji flag
function cca2ToFlag(cca2) {
  return cca2
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e0 - 65 + c.charCodeAt(0)))
    .join("");
}

// Get the primary timezone abbreviation from an IANA tz string
// e.g. "Asia/Kolkata" → "IST", "America/New_York" → "EST/EDT"
function tzAbbr(ianaTimezone) {
  try {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: ianaTimezone,
      timeZoneName: "short",
    }).formatToParts(now);
    const tz = parts.find((p) => p.type === "timeZoneName");
    return tz ? tz.value : "";
  } catch {
    return "";
  }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function InputField({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
  name,
  rightEl,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      style={{ ...styles.inputWrap, ...(focused ? styles.inputWrapFocus : {}) }}
    >
      <span
        style={{ ...styles.inputIcon, display: "flex", alignItems: "center" }}
      >
        {icon}
      </span>
      <input
        style={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
      />
      {rightEl}
    </div>
  );
}

function CustomDropdown({
  options,
  value,
  onChange,
  renderTrigger,
  searchable = true,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  const filtered = searchable
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(search.toLowerCase()) ||
          (o.sub && o.sub.toLowerCase().includes(search.toLowerCase())),
      )
    : options;

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {renderTrigger()}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="#aaa"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            zIndex: 999,
            background: "#fff",
            borderRadius: 14,
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)",
            width: 260,
            overflow: "hidden",
            border: "1px solid #f0f0f0",
          }}
        >
          {searchable && (
            <div
              style={{
                padding: "10px 12px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#f7f8fa",
                  borderRadius: 8,
                  padding: "7px 10px",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: 13,
                    background: "transparent",
                    color: "#222",
                    width: "100%",
                  }}
                />
              </div>
            </div>
          )}
          <div style={{ maxHeight: 220, overflowY: "auto", padding: "6px 0" }}>
            {filtered.length === 0 ? (
              <div
                style={{ padding: "12px 16px", fontSize: 13, color: "#aaa" }}
              >
                No results
              </div>
            ) : (
              filtered.map((o) => (
                <div
                  key={o.value}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                    setSearch("");
                  }}
                  style={{
                    padding: "9px 14px",
                    fontSize: 13,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: o.value === value ? BLUE_LIGHT : "transparent",
                    color: o.value === value ? BLUE : "#222",
                    fontWeight: o.value === value ? 600 : 400,
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => {
                    if (o.value !== value)
                      e.currentTarget.style.background = "#f7f8fa";
                  }}
                  onMouseLeave={(e) => {
                    if (o.value !== value)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  {o.flag && (
                    <span style={{ fontSize: 16, lineHeight: 1 }}>
                      {o.flag}
                    </span>
                  )}
                  <span
                    style={{
                      flex: 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {o.label}
                  </span>
                  {o.sub && (
                    <span
                      style={{ fontSize: 11, color: "#aaa", flexShrink: 0 }}
                    >
                      {o.sub}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PhoneField({
  countries,
  loading,
  selectedCode,
  onCodeChange,
  phoneNum,
  onPhoneChange,
}) {
  const [focused, setFocused] = useState(false);
  const selected = countries.find((c) => c.cca2 === selectedCode);

  const options = countries.map((c) => ({
    value: c.cca2,
    label: c.name,
    sub: c.dial,
  }));

  return (
    <div
      style={{
        ...styles.inputWrap,
        ...(focused ? styles.inputWrapFocus : {}),
        padding: "0 10px 0 14px",
      }}
    >
      {loading ? (
        <span
          style={{
            fontSize: 13,
            color: "#bbb",
            padding: "12px 0",
            marginRight: 8,
          }}
        >
          Loading…
        </span>
      ) : (
        <>
          <CustomDropdown
            options={options}
            value={selectedCode}
            onChange={(val) => onCodeChange({ target: { value: val } })}
            renderTrigger={() => (
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#333",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {selected?.cca2} {selected?.dial}
              </span>
            )}
          />
          <span style={styles.dialDivider} />
        </>
      )}
      <input
        style={styles.input}
        type="tel"
        placeholder="Phone number"
        value={phoneNum}
        onChange={onPhoneChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
      />
    </div>
  );
}

function NationalityField({ countries, loading, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const selected = countries.find((c) => c.cca2 === value);

  const options = countries.map((c) => ({
    value: c.cca2,
    label: c.name,
  }));

  return (
    <div
      style={{
        ...styles.inputWrap,
        ...(focused ? styles.inputWrapFocus : {}),
        cursor: "pointer",
      }}
    >
      {loading ? (
        <span style={{ fontSize: 13, color: "#bbb", padding: "12px 0" }}>
          Loading…
        </span>
      ) : (
        <CustomDropdown
          options={options}
          value={value}
          onChange={(val) => onChange({ target: { value: val } })}
          renderTrigger={() => (
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#222",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 0",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#555",
                  background: "#f0f0f0",
                  borderRadius: 4,
                  padding: "2px 5px",
                }}
              >
                {selected?.cca2}
              </span>
              {selected?.name}
            </span>
          )}
        />
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Register() {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCountry: "IN",
    phoneNum: "",
    dateOfBirth: "",
    nationality: "IN",
    passportNumber: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── Fetch all countries from REST Countries API ──
  useEffect(() => {
    async function fetchCountries() {
      try {
        setLoadingCountries(true);
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd,timezones",
        );
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();

        const parsed = data
          .map((c) => {
            const root = c.idd?.root || "";
            const suffix =
              c.idd?.suffixes?.length === 1 ? c.idd.suffixes[0] : "";
            const dial = root + suffix;
            const tz = c.timezones?.[0] || "";
            const abbr = tz && tz !== "UTC" ? tzAbbr(tz) : tz;
            return {
              cca2: c.cca2,
              name: c.name?.common || c.cca2,
              dial: dial || "—",
              timezone: tz,
              tzAbbr: abbr,
            };
          })
          .filter((c) => c.dial && c.dial !== "—" && c.dial !== "+")
          .sort((a, b) => a.name.localeCompare(b.name));

        if (parsed.length < 10) throw new Error("Too few countries returned");

        setCountries(parsed);
        setApiError(null);
      } catch (err) {
        setApiError("Could not load countries. Using defaults.");
        // Comprehensive fallback list
        setCountries(
          [
            {
              cca2: "AF",
              name: "Afghanistan",
              dial: "+93",
              timezone: "Asia/Kabul",
              tzAbbr: "AFT",
            },
            {
              cca2: "AL",
              name: "Albania",
              dial: "+355",
              timezone: "Europe/Tirane",
              tzAbbr: "CET",
            },
            {
              cca2: "DZ",
              name: "Algeria",
              dial: "+213",
              timezone: "Africa/Algiers",
              tzAbbr: "CET",
            },
            {
              cca2: "AR",
              name: "Argentina",
              dial: "+54",
              timezone: "America/Argentina/Buenos_Aires",
              tzAbbr: "ART",
            },
            {
              cca2: "AU",
              name: "Australia",
              dial: "+61",
              timezone: "Australia/Sydney",
              tzAbbr: "AEST",
            },
            {
              cca2: "AT",
              name: "Austria",
              dial: "+43",
              timezone: "Europe/Vienna",
              tzAbbr: "CET",
            },
            {
              cca2: "BD",
              name: "Bangladesh",
              dial: "+880",
              timezone: "Asia/Dhaka",
              tzAbbr: "BST",
            },
            {
              cca2: "BE",
              name: "Belgium",
              dial: "+32",
              timezone: "Europe/Brussels",
              tzAbbr: "CET",
            },
            {
              cca2: "BR",
              name: "Brazil",
              dial: "+55",
              timezone: "America/Sao_Paulo",
              tzAbbr: "BRT",
            },
            {
              cca2: "CA",
              name: "Canada",
              dial: "+1",
              timezone: "America/Toronto",
              tzAbbr: "EST",
            },
            {
              cca2: "CL",
              name: "Chile",
              dial: "+56",
              timezone: "America/Santiago",
              tzAbbr: "CLT",
            },
            {
              cca2: "CN",
              name: "China",
              dial: "+86",
              timezone: "Asia/Shanghai",
              tzAbbr: "CST",
            },
            {
              cca2: "CO",
              name: "Colombia",
              dial: "+57",
              timezone: "America/Bogota",
              tzAbbr: "COT",
            },
            {
              cca2: "HR",
              name: "Croatia",
              dial: "+385",
              timezone: "Europe/Zagreb",
              tzAbbr: "CET",
            },
            {
              cca2: "CZ",
              name: "Czech Republic",
              dial: "+420",
              timezone: "Europe/Prague",
              tzAbbr: "CET",
            },
            {
              cca2: "DK",
              name: "Denmark",
              dial: "+45",
              timezone: "Europe/Copenhagen",
              tzAbbr: "CET",
            },
            {
              cca2: "EG",
              name: "Egypt",
              dial: "+20",
              timezone: "Africa/Cairo",
              tzAbbr: "EET",
            },
            {
              cca2: "FI",
              name: "Finland",
              dial: "+358",
              timezone: "Europe/Helsinki",
              tzAbbr: "EET",
            },
            {
              cca2: "FR",
              name: "France",
              dial: "+33",
              timezone: "Europe/Paris",
              tzAbbr: "CET",
            },
            {
              cca2: "DE",
              name: "Germany",
              dial: "+49",
              timezone: "Europe/Berlin",
              tzAbbr: "CET",
            },
            {
              cca2: "GH",
              name: "Ghana",
              dial: "+233",
              timezone: "Africa/Accra",
              tzAbbr: "GMT",
            },
            {
              cca2: "GR",
              name: "Greece",
              dial: "+30",
              timezone: "Europe/Athens",
              tzAbbr: "EET",
            },
            {
              cca2: "HK",
              name: "Hong Kong",
              dial: "+852",
              timezone: "Asia/Hong_Kong",
              tzAbbr: "HKT",
            },
            {
              cca2: "HU",
              name: "Hungary",
              dial: "+36",
              timezone: "Europe/Budapest",
              tzAbbr: "CET",
            },
            {
              cca2: "IN",
              name: "India",
              dial: "+91",
              timezone: "Asia/Kolkata",
              tzAbbr: "IST",
            },
            {
              cca2: "ID",
              name: "Indonesia",
              dial: "+62",
              timezone: "Asia/Jakarta",
              tzAbbr: "WIB",
            },
            {
              cca2: "IE",
              name: "Ireland",
              dial: "+353",
              timezone: "Europe/Dublin",
              tzAbbr: "GMT",
            },
            {
              cca2: "IL",
              name: "Israel",
              dial: "+972",
              timezone: "Asia/Jerusalem",
              tzAbbr: "IST",
            },
            {
              cca2: "IT",
              name: "Italy",
              dial: "+39",
              timezone: "Europe/Rome",
              tzAbbr: "CET",
            },
            {
              cca2: "JP",
              name: "Japan",
              dial: "+81",
              timezone: "Asia/Tokyo",
              tzAbbr: "JST",
            },
            {
              cca2: "JO",
              name: "Jordan",
              dial: "+962",
              timezone: "Asia/Amman",
              tzAbbr: "EET",
            },
            {
              cca2: "KE",
              name: "Kenya",
              dial: "+254",
              timezone: "Africa/Nairobi",
              tzAbbr: "EAT",
            },
            {
              cca2: "KW",
              name: "Kuwait",
              dial: "+965",
              timezone: "Asia/Kuwait",
              tzAbbr: "AST",
            },
            {
              cca2: "LB",
              name: "Lebanon",
              dial: "+961",
              timezone: "Asia/Beirut",
              tzAbbr: "EET",
            },
            {
              cca2: "MY",
              name: "Malaysia",
              dial: "+60",
              timezone: "Asia/Kuala_Lumpur",
              tzAbbr: "MYT",
            },
            {
              cca2: "MX",
              name: "Mexico",
              dial: "+52",
              timezone: "America/Mexico_City",
              tzAbbr: "CST",
            },
            {
              cca2: "MA",
              name: "Morocco",
              dial: "+212",
              timezone: "Africa/Casablanca",
              tzAbbr: "WET",
            },
            {
              cca2: "NL",
              name: "Netherlands",
              dial: "+31",
              timezone: "Europe/Amsterdam",
              tzAbbr: "CET",
            },
            {
              cca2: "NZ",
              name: "New Zealand",
              dial: "+64",
              timezone: "Pacific/Auckland",
              tzAbbr: "NZST",
            },
            {
              cca2: "NG",
              name: "Nigeria",
              dial: "+234",
              timezone: "Africa/Lagos",
              tzAbbr: "WAT",
            },
            {
              cca2: "NO",
              name: "Norway",
              dial: "+47",
              timezone: "Europe/Oslo",
              tzAbbr: "CET",
            },
            {
              cca2: "PK",
              name: "Pakistan",
              dial: "+92",
              timezone: "Asia/Karachi",
              tzAbbr: "PKT",
            },
            {
              cca2: "PE",
              name: "Peru",
              dial: "+51",
              timezone: "America/Lima",
              tzAbbr: "PET",
            },
            {
              cca2: "PH",
              name: "Philippines",
              dial: "+63",
              timezone: "Asia/Manila",
              tzAbbr: "PHT",
            },
            {
              cca2: "PL",
              name: "Poland",
              dial: "+48",
              timezone: "Europe/Warsaw",
              tzAbbr: "CET",
            },
            {
              cca2: "PT",
              name: "Portugal",
              dial: "+351",
              timezone: "Europe/Lisbon",
              tzAbbr: "WET",
            },
            {
              cca2: "QA",
              name: "Qatar",
              dial: "+974",
              timezone: "Asia/Qatar",
              tzAbbr: "AST",
            },
            {
              cca2: "RO",
              name: "Romania",
              dial: "+40",
              timezone: "Europe/Bucharest",
              tzAbbr: "EET",
            },
            {
              cca2: "RU",
              name: "Russia",
              dial: "+7",
              timezone: "Europe/Moscow",
              tzAbbr: "MSK",
            },
            {
              cca2: "SA",
              name: "Saudi Arabia",
              dial: "+966",
              timezone: "Asia/Riyadh",
              tzAbbr: "AST",
            },
            {
              cca2: "SG",
              name: "Singapore",
              dial: "+65",
              timezone: "Asia/Singapore",
              tzAbbr: "SGT",
            },
            {
              cca2: "ZA",
              name: "South Africa",
              dial: "+27",
              timezone: "Africa/Johannesburg",
              tzAbbr: "SAST",
            },
            {
              cca2: "KR",
              name: "South Korea",
              dial: "+82",
              timezone: "Asia/Seoul",
              tzAbbr: "KST",
            },
            {
              cca2: "ES",
              name: "Spain",
              dial: "+34",
              timezone: "Europe/Madrid",
              tzAbbr: "CET",
            },
            {
              cca2: "LK",
              name: "Sri Lanka",
              dial: "+94",
              timezone: "Asia/Colombo",
              tzAbbr: "IST",
            },
            {
              cca2: "SE",
              name: "Sweden",
              dial: "+46",
              timezone: "Europe/Stockholm",
              tzAbbr: "CET",
            },
            {
              cca2: "CH",
              name: "Switzerland",
              dial: "+41",
              timezone: "Europe/Zurich",
              tzAbbr: "CET",
            },
            {
              cca2: "TW",
              name: "Taiwan",
              dial: "+886",
              timezone: "Asia/Taipei",
              tzAbbr: "CST",
            },
            {
              cca2: "TH",
              name: "Thailand",
              dial: "+66",
              timezone: "Asia/Bangkok",
              tzAbbr: "ICT",
            },
            {
              cca2: "TR",
              name: "Turkey",
              dial: "+90",
              timezone: "Europe/Istanbul",
              tzAbbr: "TRT",
            },
            {
              cca2: "UA",
              name: "Ukraine",
              dial: "+380",
              timezone: "Europe/Kiev",
              tzAbbr: "EET",
            },
            {
              cca2: "AE",
              name: "United Arab Emirates",
              dial: "+971",
              timezone: "Asia/Dubai",
              tzAbbr: "GST",
            },
            {
              cca2: "GB",
              name: "United Kingdom",
              dial: "+44",
              timezone: "Europe/London",
              tzAbbr: "GMT",
            },
            {
              cca2: "US",
              name: "United States",
              dial: "+1",
              timezone: "America/New_York",
              tzAbbr: "EST",
            },
            {
              cca2: "VN",
              name: "Vietnam",
              dial: "+84",
              timezone: "Asia/Ho_Chi_Minh",
              tzAbbr: "ICT",
            },
          ].sort((a, b) => a.name.localeCompare(b.name)),
        );
      } finally {
        setLoadingCountries(false);
      }
    }
    fetchCountries();
  }, []);

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const handleSubmit = () => {
    if (!form.agree)
      return alert("Please agree to the Terms of Service and Privacy Policy.");
    if (form.password !== form.confirmPassword)
      return alert("Passwords do not match.");
    setSubmitted(true);
  };

  const selectedPhoneCountry = countries.find(
    (c) => c.cca2 === form.phoneCountry,
  );

  if (submitted) {
    return (
      <div
        style={{
          ...styles.page,
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f7ff",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "52px 48px",
            textAlign: "center",
            boxShadow: "0 8px 40px rgba(33,82,232,0.1)",
            maxWidth: 400,
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>✈️</div>
          <h2
            style={{
              color: BLUE,
              fontSize: 26,
              fontWeight: 800,
              margin: "0 0 8px",
            }}
          >
            Welcome aboard, {form.firstName}!
          </h2>
          <p style={{ color: "#666", fontSize: 15, marginBottom: 8 }}>
            Your Travelo account is ready.
          </p>
          <p style={{ color: "#aaa", fontSize: 13, marginBottom: 24 }}>
            {selectedPhoneCountry ? cca2ToFlag(selectedPhoneCountry.cca2) : ""}{" "}
            {selectedPhoneCountry?.dial} {form.phoneNum}{" "}
            {selectedPhoneCountry?.tzAbbr && (
              <span
                style={{ ...styles.tzBadge, display: "inline", marginLeft: 4 }}
              >
                {selectedPhoneCountry.tzAbbr}
              </span>
            )}
          </p>
          <button
            style={{ ...styles.createBtn, marginBottom: 0 }}
            onClick={() => setSubmitted(false)}
          >
            Back to Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* ── Left ── */}
      <div style={styles.left}>
        <div style={styles.leftOverlay} />
        <div style={styles.leftContent}>
          <div style={styles.logo}>
            <svg style={styles.logoIcon} viewBox="0 0 32 32" fill="none">
              <path
                d="M6 26L26 6M26 6H14M26 6V18"
                stroke={BLUE}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Travelo
          </div>
          <div style={styles.badge}>
            <span>⭐</span> SMART TRAVEL, BETTER DEALS
          </div>
          <h1 style={styles.headline}>
            Travel more.
            <span style={styles.headlineBlue}>Pay less.</span>
          </h1>
          <p style={styles.subtext}>
            Create your account and get access to exclusive deals on flights,
            hotels, cars and holiday packages.
          </p>
          <div style={styles.stats}>
            {[
              { icon: "✈️", num: "500+", label: "Airlines" },
              { icon: "🏨", num: "1M+", label: "Hotel Deals" },
              { icon: "🛡️", num: "Secure", label: "Payments" },
              { icon: "🎧", num: "24/7", label: "Support" },
            ].map((s) => (
              <div key={s.label} style={styles.statBox}>
                <span style={styles.statIcon}>{s.icon}</span>
                <span style={styles.statNum}>{s.num}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
          <div style={styles.bonusCard}>
            <div style={styles.bonusLeft}>
              <div style={styles.bonusTitle}>🎁 Welcome Bonus</div>
              <div style={styles.bonusDesc}>
                Sign up today and unlock exclusive member deals and offers.
              </div>
              <div style={styles.bonusBadge}>
                🎫 Get up to 20% OFF on your first booking
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80"
              alt="Tropical destination"
              style={styles.bonusImg}
            />
          </div>
        </div>
        <div style={styles.trustBar}>
          <span style={styles.trustItem}>
            🛡️ Trusted by millions of travelers worldwide
          </span>
          <span style={styles.trustItem}>🔒 Your data is safe with us</span>
        </div>
      </div>

      {/* ── Right / Form ── */}
      <div style={styles.right} className="travelo-right">
        <div style={styles.formTitle}>Create your account</div>
        <div style={styles.formSub}>Start your journey with Travelo</div>

        {/* Personal Details */}
        <div style={styles.sectionLabel}>
          <span>Personal Details</span>
          <span style={styles.sectionLine} />
        </div>

        <div style={styles.row}>
          <div style={styles.rowItem}>
            <label style={styles.label}>First name</label>
            <InputField
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
              placeholder="First name"
              value={form.firstName}
              onChange={set("firstName")}
              name="firstName"
            />
          </div>
          <div style={styles.rowItem}>
            <label style={styles.label}>Last name</label>
            <InputField
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
              placeholder="Last name"
              value={form.lastName}
              onChange={set("lastName")}
              name="lastName"
            />
          </div>
        </div>

        <label style={styles.label}>Email address</label>
        <InputField
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#aaa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
          placeholder="Enter your email"
          type="email"
          value={form.email}
          onChange={set("email")}
          name="email"
        />

        {/* Phone: flag + dial code (from API) + IST/timezone (from API) */}
        <label style={styles.label}>
          Phone number
          {!loadingCountries && selectedPhoneCountry?.timezone && (
            <span
              style={{
                fontWeight: 400,
                color: "#aaa",
                marginLeft: 6,
                fontSize: 11,
              }}
            >
              Timezone: {selectedPhoneCountry.timezone}
            </span>
          )}
        </label>
        <PhoneField
          countries={countries}
          loading={loadingCountries}
          selectedCode={form.phoneCountry}
          onCodeChange={set("phoneCountry")}
          phoneNum={form.phoneNum}
          onPhoneChange={set("phoneNum")}
        />

        <div style={styles.row}>
          <div style={styles.rowItem}>
            <label style={styles.label}>Date of birth</label>
            <InputField
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
              placeholder="YYYY-MM-DD"
              type="date"
              value={form.dateOfBirth}
              onChange={set("dateOfBirth")}
              name="dateOfBirth"
            />
          </div>
          <div style={styles.rowItem}>
            <label style={styles.label}>Nationality</label>
            <NationalityField
              countries={countries}
              loading={loadingCountries}
              value={form.nationality}
              onChange={set("nationality")}
            />
          </div>
        </div>

        {/* Travel Documents */}
        <div style={styles.sectionLabel}>
          <span>Travel Documents</span>
          <span style={styles.sectionLine} />
        </div>

        <label style={styles.label}>Passport number</label>
        <InputField
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#aaa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M16 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
              <path d="M6 10h2M6 14h12" />
            </svg>
          }
          placeholder="e.g. P2630567"
          value={form.passportNumber}
          onChange={set("passportNumber")}
          name="passportNumber"
        />

        {/* Security */}
        <div style={styles.sectionLabel}>
          <span>Security</span>
          <span style={styles.sectionLine} />
        </div>

        <label style={styles.label}>Password</label>
        <InputField
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#aaa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
          placeholder="Create a password"
          type={showPwd ? "text" : "password"}
          value={form.password}
          onChange={set("password")}
          name="password"
          rightEl={
            <button
              style={styles.eyeBtn}
              onClick={() => setShowPwd((v) => !v)}
              type="button"
              tabIndex={-1}
            >
              {showPwd ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          }
        />

        <label style={styles.label}>Confirm password</label>
        <InputField
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#aaa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
          placeholder="Confirm your password"
          type={showConfirm ? "text" : "password"}
          value={form.confirmPassword}
          onChange={set("confirmPassword")}
          name="confirmPassword"
          rightEl={
            <button
              style={styles.eyeBtn}
              onClick={() => setShowConfirm((v) => !v)}
              type="button"
              tabIndex={-1}
            >
              {showConfirm ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          }
        />

        <div style={styles.checkRow}>
          <input
            type="checkbox"
            style={styles.checkbox}
            checked={form.agree}
            onChange={set("agree")}
            id="agree"
          />
          <label style={styles.checkLabel} htmlFor="agree">
            I agree to the{" "}
            <a href="#" style={styles.link}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" style={styles.link}>
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          style={{ ...styles.createBtn, opacity: form.agree ? 1 : 0.6 }}
          onClick={handleSubmit}
        >
          Create account
        </button>

        <div style={styles.orRow}>
          <span style={styles.orLine} />
          <span>or continue with</span>
          <span style={styles.orLine} />
        </div>

        <button style={styles.socialBtn}>
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.5 2.7 13.5l7.8 6C12.3 13.2 17.7 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.5 2.8-2.1 5.1-4.5 6.7l7 5.4C43.4 36.8 46.5 31.1 46.5 24.5z"
            />
            <path
              fill="#FBBC05"
              d="M10.5 28.5c-.5-1.5-.8-3-.8-4.5s.3-3 .8-4.5l-7.8-6C1 16.3 0 20 0 24s1 7.7 2.7 10.5l7.8-6z"
            />
            <path
              fill="#4285F4"
              d="M24 48c6.3 0 11.6-2.1 15.5-5.7l-7-5.4c-2 1.4-4.6 2.1-8.5 2.1-6.3 0-11.7-3.7-13.5-9l-7.8 6C6.6 42.5 14.6 48 24 48z"
            />
          </svg>
          Sign up with Google
        </button>

        <button style={styles.socialBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.42.07 2.4.82 3.22.85.97-.17 1.89-.95 3.22-.96 2.01.08 3.54 1.1 4.45 2.84-3.97 2.37-3.05 7.57.93 9.13zm-3.23-18c.71 2.05-.93 4.13-2.87 4.27-1.03-2.38.93-4.13 2.87-4.27z" />
          </svg>
          Sign up with Apple
        </button>

        <div style={styles.loginRow}>
          Already have an account?{" "}
          <a href="#" style={styles.link}>
            Log in
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .travelo-right::-webkit-scrollbar { display: none; }
        .travelo-right { -ms-overflow-style: none; scrollbar-width: none; }
        body, html { overflow-x: hidden; max-width: 100vw; }
      `}</style>
    </div>
  );
}
