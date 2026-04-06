import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const LanternIcon = () => (
  <svg className="lantern-icon" viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
    {/* Flame */}
    <ellipse cx="30" cy="22" rx="3.5" ry="4.5" fill="#d44a10" opacity="0.8"/>
    <ellipse cx="30" cy="21" rx="2" ry="3" fill="#e09a20" opacity="0.9"/>
    {/* Bottom cap */}
    <rect x="18" y="49" width="24" height="5" rx="2" fill="#3a1a06" stroke="#b03a08" strokeWidth="1.5"/>
    {/* Hook detail */}
    <path d="M27 10 Q30 6 33 10" fill="none" stroke="#b03a08" strokeWidth="1.5"/>
  </svg>
);

const Header = () => {
  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };

  return (
    <header className="underground-header">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link className="header-brand" to="/">
          <LanternIcon />
          <div>
            <h1 className="header-title">The Novigrad Underground</h1>
            <p className="header-tagline">Buy. Sell. Don&apos;t ask questions.</p>
          </div>
        </Link>

        <nav className="header-nav">
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
