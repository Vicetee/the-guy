import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        alpha: Math.random() * 0.3 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="home">
      <canvas ref={canvasRef} className="home__canvas" />

      <div className="home__content">
        <div className="home__badge">Lagos · Nigeria · 2026</div>

        <div className="home__logo">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="20" r="11" fill="white" fillOpacity="0.9" />
            <path d="M12 58c0-11.046 8.954-20 20-20s20 8.954 20 20" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="22" y="39" width="20" height="3" rx="1.5" fill="white" fillOpacity="0.4" />
          </svg>
        </div>

        <h1 className="home__title">
          The<br />Guy
        </h1>

        <p className="home__tagline">
          Need a plumber? Electrician? Carpenter?<br />
          We've got <em>The Guy</em> for any job.
        </p>

        <div className="home__cards">
          <button
            className="home__card home__card--find"
            onClick={() => navigate("/find")}
          >
            <div className="home__card-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
                <path d="M20 20L27 27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="home__card-text">
              <span className="home__card-title">I need a Guy</span>
              <span className="home__card-sub">Find a trusted worker near you</span>
            </div>
            <div className="home__card-arrow">→</div>
          </button>

          <button
            className="home__card home__card--worker"
            onClick={() => navigate("/register")}
          >
            <div className="home__card-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="10" r="5" stroke="currentColor" strokeWidth="2.5" />
                <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M22 14l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="home__card-text">
              <span className="home__card-title">I'm a Worker</span>
              <span className="home__card-sub">Register and get hired today</span>
            </div>
            <div className="home__card-arrow">→</div>
          </button>
        </div>

        <p className="home__footer">Est 2026 by The Guy Inc.</p>
      </div>
    </div>
  );
}