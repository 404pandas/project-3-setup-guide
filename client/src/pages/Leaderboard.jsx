import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_LEADERBOARD } from "../utils/queries";
import { gsap, ScrollTrigger } from "../utils/gsap";
import usePageEntrance from "../utils/usePageEntrance";

const RANK_MEDALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
                     "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];

const Leaderboard = () => {
  const { loading, data } = useQuery(QUERY_LEADERBOARD);
  const entries = data?.leaderboard || [];

  const headerRef = usePageEntrance([]);
  const tableRef  = useRef(null);

  useEffect(() => {
    if (!entries.length || !tableRef.current) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray(".leaderboard-row", tableRef.current);

      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power2.out",
            clearProps: "transform",
            delay: i < 3 ? i * 0.08 : 0, // top 3 stagger immediately; rest via ScrollTrigger
            scrollTrigger: {
              trigger: row,
              start: "top 93%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, tableRef);

    return () => ctx.revert();
  }, [entries]);

  return (
    <main>
      <div ref={headerRef} className="market-header">
        <h2 className="market-title">Most Trusted Contacts</h2>
        <p className="market-subtitle">Reputation is currency. Here&apos;s who&apos;s flush.</p>
        <div className="market-divider">— ✦ —</div>
      </div>

      <div className="notice-banner">
        Rankings are based on vouches minus burns. Earn trust by completing deals and building a clean record.
      </div>

      {loading ? (
        <div className="loading-wrap">
          <p className="loading-text">Consulting the network...</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="empty-board">
          <p className="empty-board-text">No reputation on record yet.</p>
          <p className="empty-board-sub">Be the first to vouch for someone.</p>
        </div>
      ) : (
        <div ref={tableRef} className="leaderboard-table">
          <div className="leaderboard-header-row">
            <span className="lb-col-rank">Rank</span>
            <span className="lb-col-name">Contact</span>
            <span className="lb-col-vouches">Vouches</span>
            <span className="lb-col-burns">Burns</span>
            <span className="lb-col-score">Score</span>
          </div>
          {entries.map((entry, i) => (
            <div
              key={entry.username}
              className={`leaderboard-row ${i === 0 ? "lb-top" : i < 3 ? "lb-podium" : ""}`}
            >
              <span className="lb-col-rank lb-rank-num">{RANK_MEDALS[i]}</span>
              <span className="lb-col-name">
                <Link to={`/profiles/${entry.username}`} className="lb-username">
                  {entry.username}
                </Link>
              </span>
              <span className="lb-col-vouches lb-vouches">{entry.vouches}</span>
              <span className="lb-col-burns lb-burns">{entry.burns > 0 ? entry.burns : "—"}</span>
              <span className="lb-col-score lb-score" data-positive={entry.score > 0} data-negative={entry.score < 0}>
                {entry.score > 0 ? `+${entry.score}` : entry.score}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Leaderboard;
