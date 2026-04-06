import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap, ScrollTrigger } from "../../utils/gsap";

const CATEGORY_STYLES = {
  "Weaponry":       { background: "var(--cat-weaponry-bg)",    color: "var(--cat-weaponry-text)",    border: "#2a3050" },
  "Arcana":         { background: "var(--cat-arcana-bg)",      color: "var(--cat-arcana-text)",      border: "#3a1870" },
  "Ingredients":    { background: "var(--cat-ingredients-bg)", color: "var(--cat-ingredients-text)", border: "#284018" },
  "Monster Parts":  { background: "var(--cat-parts-bg)",       color: "var(--cat-parts-text)",       border: "#401010" },
  "Forbidden Texts":{ background: "var(--cat-texts-bg)",       color: "var(--cat-texts-text)",       border: "#300a48" },
  "Contraband":     { background: "var(--cat-contraband-bg)",  color: "var(--cat-contraband-text)",  border: "#501008" },
  "Curiosities":    { background: "var(--cat-curiosities-bg)", color: "var(--cat-curiosities-text)", border: "#483010" },
};

const RISK_STYLES = {
  "Low":       { bg: "var(--risk-low-bg)",   border: "var(--risk-low-border)",   color: "var(--risk-low-text)",   symbol: "●" },
  "Medium":    { bg: "var(--risk-med-bg)",   border: "var(--risk-med-border)",   color: "var(--risk-med-text)",   symbol: "◆" },
  "High":      { bg: "var(--risk-high-bg)",  border: "var(--risk-high-border)",  color: "var(--risk-high-text)",  symbol: "▲" },
  "Forbidden": { bg: "var(--risk-forb-bg)",  border: "var(--risk-forb-border)",  color: "var(--risk-forb-text)",  symbol: "✖" },
};

const ListingBoard = ({ listings }) => {
  const navigate   = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!listings.length || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".listing-card", containerRef.current);

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [listings]);

  if (!listings.length) {
    return (
      <div className="empty-board">
        <p className="empty-board-text">The board is empty. Nothing to buy, nothing to sell.</p>
        <p className="empty-board-sub">Be the first to post a listing.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      {listings.map((listing) => {
        const cat  = CATEGORY_STYLES[listing.category] || CATEGORY_STYLES["Curiosities"];
        const risk = RISK_STYLES[listing.riskLevel]    || RISK_STYLES["Medium"];
        const statusClass = `status-stamp status-${listing.status?.toLowerCase()}`;

        return (
          <div
            key={listing._id}
            className="listing-card listing-card-link"
            onClick={() => navigate(`/listings/${listing._id}`)}
          >
            <div className="listing-card-top">
              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", flexWrap: "wrap" }}>
                <span
                  className="category-badge"
                  style={{ background: cat.background, color: cat.color, borderColor: cat.border }}
                >
                  {listing.category}
                </span>
                <span
                  className="risk-badge"
                  style={{ background: risk.bg, borderColor: risk.border, color: risk.color }}
                >
                  {risk.symbol} {listing.riskLevel}
                </span>
              </div>
              <span className={statusClass}>{listing.status}</span>
            </div>

            <div className="listing-card-body">
              <h4 className="listing-name">{listing.itemName}</h4>
              <p className="listing-price">{listing.price}</p>
              <p className="listing-region">📍 {listing.region}</p>
              <p className="listing-description">{listing.description}</p>
            </div>

            <div className="listing-card-footer" style={{ color: "var(--crimson-bright)", fontFamily: "var(--font-sc)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
              View Listing →
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListingBoard;
