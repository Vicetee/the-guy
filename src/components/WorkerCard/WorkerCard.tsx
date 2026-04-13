import type { Worker } from "../../firebase/worker";
import "./WorkerCard.css";

interface Props {
  worker: Worker;
  index?: number;
}

const PLACEHOLDER_AVATAR = (name: string) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
  return initials;
};

const TRADE_ICONS: Record<string, string> = {
  plumber: "🔧",
  electrician: "⚡",
  carpenter: "🪵",
  painter: "🎨",
  welder: "🔥",
  cleaner: "🧹",
  driver: "🚗",
  roofer: "🏠",
  tiler: "🧱",
  default: "🔨",
};

const tradeIcon = (trade: string) =>
  TRADE_ICONS[trade.toLowerCase()] ?? TRADE_ICONS.default;

export default function WorkerCard({ worker, index = 0 }: Props) {
  const waLink = `https://wa.me/${worker.whatsapp.replace(/\D/g, "")}`;
  const callLink = `tel:${worker.phone.replace(/\s/g, "")}`;

  return (
    <div className="wcard" style={{ animationDelay: `${index * 0.07}s` }}>
      {worker.verified && <div className="wcard__verified">✓ Verified</div>}

      <div className="wcard__top">
        <div className="wcard__avatar">
          {worker.photoUrl ? (
            <img src={worker.photoUrl} alt={worker.name} />
          ) : (
            <span>{PLACEHOLDER_AVATAR(worker.name)}</span>
          )}
        </div>

        <div className="wcard__info">
          <h3 className="wcard__name">{worker.name}</h3>
          <div className="wcard__trade">
            <span className="wcard__trade-icon">{tradeIcon(worker.trade)}</span>
            <span>{worker.trade.charAt(0).toUpperCase() + worker.trade.slice(1)}</span>
          </div>
          {worker.yearsExp > 0 && (
            <div className="wcard__exp">{worker.yearsExp} yr{worker.yearsExp !== 1 ? "s" : ""} experience</div>
          )}
        </div>

        <div className={`wcard__gender wcard__gender--${worker.gender}`}>
          {worker.gender === "male" ? "♂" : "♀"}
        </div>
      </div>

      {worker.bio && (
        <p className="wcard__bio">{worker.bio}</p>
      )}

      <div className="wcard__location">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5z" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        {worker.location.charAt(0).toUpperCase() + worker.location.slice(1)}
      </div>

      <div className="wcard__actions">
        <a href={callLink} className="wcard__btn wcard__btn--call">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h2.236a1.5 1.5 0 0 1 1.423 1.026l.708 2.124a1.5 1.5 0 0 1-.343 1.547L6.5 7.72a11.045 11.045 0 0 0 5.78 5.78l1.023-1.024a1.5 1.5 0 0 1 1.547-.343l2.124.708A1.5 1.5 0 0 1 18 14.264V16.5A1.5 1.5 0 0 1 16.5 18C8.492 18 2 11.508 2 3.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          Call
        </a>
        <a href={waLink} target="_blank" rel="noreferrer" className="wcard__btn wcard__btn--wa">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M10 2a8 8 0 0 1 6.93 12.01L18 18l-4.08-1.06A8 8 0 1 1 10 2z" stroke="currentColor" strokeWidth="1.4" />
            <path d="M7.5 8.5c.5 1 1.5 2 2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}