import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindAGuy.css";

const TRADES = [
  "Plumber", "Electrician", "Carpenter", "Painter", "Welder",
  "Mason / Bricklayer", "Tiler", "AC Technician", "Generator Technician",
  "Roofer", "Cleaner", "Fumigator", "Security Guard", "Driver", "Other",
];

export default function FindAGuy() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [trade, setTrade] = useState("");
  const [customTrade, setCustomTrade] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "any">("any");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFind = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalTrade = trade === "Other" ? customTrade : trade;
    if (!location.trim() || !finalTrade.trim()) {
      setError("Please fill in your location and the type of worker you need.");
      return;
    }
    setError("");
    setLoading(true);
    // navigate to results with search params
    navigate(`/results?trade=${encodeURIComponent(finalTrade)}&location=${encodeURIComponent(location)}&gender=${gender}`);
  };

  return (
    <div className="find">
      <div className="find__bg" />

      <div className="find__inner">
        <button className="find__back" onClick={() => navigate("/")}>
          ← Back
        </button>

        <div className="find__header">
          <div className="find__header-icon">
            <svg viewBox="0 0 32 32" fill="none">
              <circle cx="14" cy="14" r="8" stroke="white" strokeWidth="2.5" />
              <path d="M20 20L27 27" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1>The Guy</h1>
            <p>Your number one referral site for handymen and workers.<br />Need a guy for any job? We've got The Guy!</p>
          </div>
        </div>

        <form className="find__form" onSubmit={handleFind}>
          <div className="find__grid find__grid--top">
            <div className="find__card">
              <label>Where is your location?</label>
              <input
                type="text"
                placeholder="Enter your location (e.g., Lekki)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="find__card">
              <label>Preferred Gender</label>
              <div className="find__toggle">
                {(["male", "female", "any"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={gender === g ? "active" : ""}
                    onClick={() => setGender(g)}
                  >
                    {g === "any" ? "Any" : g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
              <span className="find__hint">Please select your preference</span>
            </div>
          </div>

          <div className="find__grid find__grid--bottom">
            <div className="find__card">
              <label>Which Guy do you need?</label>
              <select value={trade} onChange={(e) => setTrade(e.target.value)}>
                <option value="">Select type of worker...</option>
                {TRADES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {trade === "Other" && (
                <input
                  type="text"
                  placeholder="Specify the type of worker"
                  value={customTrade}
                  onChange={(e) => setCustomTrade(e.target.value)}
                  style={{ marginTop: 10 }}
                />
              )}
            </div>

            <button
              type="submit"
              className={`find__btn${loading ? " loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <span className="find__spinner" />
              ) : (
                "Find me a guy"
              )}
            </button>
          </div>

          {error && <p className="find__error">{error}</p>}
        </form>

        <p className="find__footer">Est 2026 by The Guy Inc.</p>
      </div>
    </div>
  );
}