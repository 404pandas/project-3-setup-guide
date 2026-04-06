import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { gsap } from "../../utils/gsap";

const LanternIcon = ({ lanternRef }) => (
  <svg ref={lanternRef} className="lantern-icon" viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Chain */}
    <line x1="30" y1="2" x2="30" y2="10" stroke="#b03a08" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Top cap */}
    <rect x="18" y="10" width="24" height="5" rx="2" fill="#3a1a06" stroke="#b03a08" strokeWidth="1.5"/>
    {/* Lantern body */}
    <rect x="16" y="15" width="28" height="34" rx="3" fill="#120c06" stroke="#b03a08" strokeWidth="1.5"/>
    {/* Glass panels - left */}
    <rect x="19" y="18" width="9" height="28" rx="2" fill="#b03a08" opacity="0.45"/>
    {/* Glass panels - right */}
    <rect x="32" y="18" width="9" height="28" rx="2" fill="#b03a08" opacity="0.45"/>
    {/* Center divider */}
    <line x1="30" y1="15" x2="30" y2="49" stroke="#3a1a06" strokeWidth="2"/>
    {/* Inner glow */}
    <ellipse cx="30" cy="32" rx="7" ry="9" fill="#d44a10" opacity="0.12"/>
    {/* Flame outer */}
    <ellipse className="flame-outer" cx="30" cy="22" rx="3.5" ry="4.5" fill="#d44a10" opacity="0.8"/>
    {/* Flame inner */}
    <ellipse className="flame-inner" cx="30" cy="21" rx="2" ry="3" fill="#e09a20" opacity="0.9"/>
    {/* Bottom cap */}
    <rect x="18" y="49" width="24" height="5" rx="2" fill="#3a1a06" stroke="#b03a08" strokeWidth="1.5"/>
    {/* Hook detail */}
    <path d="M27 10 Q30 6 33 10" fill="none" stroke="#b03a08" strokeWidth="1.5"/>
  </svg>
);

const Header = () => {
  const lanternRef = useRef(null);
  const flameOuterRef = useRef(null);
  const flameInnerRef = useRef(null);

  useEffect(() => {
    if (!lanternRef.current) return;

    const svg = lanternRef.current;
    const flameOuter = svg.querySelector(".flame-outer");
    const flameInner = svg.querySelector(".flame-inner");

    // Pendulum sway — pivot from the top center of the lantern
    gsap.set(svg, { transformOrigin: "50% 0%" });
    const sway = gsap.to(svg, {
      rotation: 4,
      duration: 2.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Flame flicker — irregular opacity + scale
    const flickerOuter = gsap.to(flameOuter, {
      opacity: 0.5,
      scaleY: 0.8,
      duration: 0.18,
      ease: "none",
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.05,
    });

    const flickerInner = gsap.to(flameInner, {
      opacity: 0.6,
      scaleY: 0.75,
      duration: 0.14,
      ease: "none",
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.08,
    });

    return () => {
      sway.kill();
      flickerOuter.kill();
      flickerInner.kill();
    };
  }, []);

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };

  return (
    <header className="underground-header">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link className="header-brand" to="/">
          <LanternIcon lanternRef={lanternRef} />
          <div>
            <h1 className="header-title">The Novigrad Underground</h1>
            <p className="header-tagline">Buy. Sell. Don&apos;t ask questions.</p>
          </div>
        </Link>

        <nav className="header-nav">
          <Link className="btn btn-light" to="/wanted">
            Wanted Board
          </Link>
          <Link className="btn btn-light" to="/leaderboard">
            Most Trusted
          </Link>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-info" to="/me">
                {Auth.getProfile().data.username}&apos;s Stash
              </Link>
              <button className="btn btn-light" onClick={logout}>
                Go Dark
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-info" to="/login">
                Enter
              </Link>
              <Link className="btn btn-crimson" to="/signup">
                Join the Network
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
