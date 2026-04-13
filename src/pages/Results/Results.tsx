import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { findWorkers } from "../../firebase/worker";
import type { Worker } from "../../firebase/worker";
import WorkerCard from "../../components/WorkerCard/WorkerCard.tsx";
import "./Results.css";

export default function Results() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const trade = params.get("trade") ?? "";
  const location = params.get("location") ?? "";
  const gender = params.get("gender") ?? "any";

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const results = await findWorkers(trade, location, gender);
        if (!cancelled) setWorkers(results);
      } catch (err) {
        if (!cancelled) setError("Something went wrong. Please try again.");
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [trade, location, gender]);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="results">
      <div className="results__bg" />

      <div className="results__inner">
        <button className="results__back" onClick={() => navigate("/find")}>
          ← New search
        </button>

        <div className="results__header">
          <div className="results__header-left">
            <h1>
              {loading
                ? "Searching..."
                : workers.length > 0
                ? `${workers.length} Guy${workers.length !== 1 ? "s" : ""} Found`
                : "No Guys Found"}
            </h1>
            <p>
              {capitalize(trade)} · {capitalize(location)}
              {gender !== "any" && ` · ${capitalize(gender)}`}
            </p>
          </div>
          <button
            className="results__search-again"
            onClick={() => navigate("/find")}
          >
            Search again
          </button>
        </div>

        {loading && (
          <div className="results__loading">
            <div className="results__spinner" />
            <p>Finding the best guys near you…</p>
          </div>
        )}

        {!loading && error && (
          <div className="results__empty">
            <span>⚠️</span>
            <p>{error}</p>
            <button onClick={() => navigate("/find")}>Try again</button>
          </div>
        )}

        {!loading && !error && workers.length === 0 && (
          <div className="results__empty">
            <span>😔</span>
            <p>No {trade} found in {location} right now.</p>
            <p className="results__empty-sub">
              Try a different location or trade, or check back soon.
            </p>
            <button onClick={() => navigate("/find")}>Search again</button>
          </div>
        )}

        {!loading && !error && workers.length > 0 && (
          <div className="results__grid">
            {workers.map((w, i) => (
              <WorkerCard key={w.id} worker={w} index={i} />
            ))}
          </div>
        )}

        <div className="results__cta">
          <p>Are you a {trade}?</p>
          <button onClick={() => navigate("/register")}>
            Register as a worker →
          </button>
        </div>

        <p className="results__footer">Est 2026 by The Guy Inc.</p>
      </div>
    </div>
  );
}