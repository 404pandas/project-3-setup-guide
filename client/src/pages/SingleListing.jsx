import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "../utils/gsap";
import InquiryList from "../components/CommentList";
import InquiryForm from "../components/CommentForm";
import UpdateListingForm from "../components/updateMonsterForm";
import { QUERY_SINGLE_LISTING } from "../utils/queries";
import { REMOVE_LISTING } from "../utils/mutations";
import Auth from "../utils/auth";

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

const SingleListing = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_SINGLE_LISTING, {
    variables: { listingId },
  });
  const listing = data?.listing || {};
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const entryRef = useRef(null);

  const [removeListing] = useMutation(REMOVE_LISTING);

  useEffect(() => {
    if (!listing._id || !entryRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        entryRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", clearProps: "transform" }
      );
    }, entryRef);
    return () => ctx.revert();
  }, [listing._id]);

  const handleDelete = async () => {
    try {
      await removeListing({ variables: { listingId: listing._id } });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="loading-wrap">
        <p className="loading-text">Retrieving listing...</p>
      </div>
    );
  }

  const cat  = CATEGORY_STYLES[listing.category] || CATEGORY_STYLES["Curiosities"];
  const risk = RISK_STYLES[listing.riskLevel]    || RISK_STYLES["Medium"];
  const statusClass = `status-stamp status-${listing.status?.toLowerCase()}`;

  return (
    <>
      <div ref={entryRef} className="listing-entry">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
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
            <span className={statusClass}>{listing.status}</span>
          </div>
          {Auth.loggedIn() &&
            Auth.getProfile().data.username === listing.createdBy && (
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowEditModal(true)}>
                  Edit Listing
                </button>
                {confirmDelete ? (
                  <>
                    <span style={{ fontFamily: "var(--font-sc)", fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
                      Are you sure?
                    </span>
                    <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                      Yes, Pull It
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setConfirmDelete(false)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(true)}>
                    Remove Listing
                  </button>
                )}
              </div>
            )}
        </div>

        <h1 className="listing-entry-name">{listing.itemName}</h1>
        <p className="listing-entry-price">{listing.price}</p>

        <div className="listing-stat-grid">
          <div className="listing-stat-block">
            <div className="listing-stat-label">Category</div>
            <div className="listing-stat-value">{listing.category}</div>
          </div>
          <div className="listing-stat-block">
            <div className="listing-stat-label">Region</div>
            <div className="listing-stat-value">{listing.region}</div>
          </div>
          <div className="listing-stat-block">
            <div className="listing-stat-label">Risk Level</div>
            <div className="listing-stat-value" style={{ color: risk.color }}>{listing.riskLevel}</div>
          </div>
          <div className="listing-stat-block">
            <div className="listing-stat-label">Status</div>
            <div className="listing-stat-value">{listing.status}</div>
          </div>
        </div>

        <div className="listing-description-full">{listing.description}</div>
      </div>

      <div className="my-4">
        <InquiryList inquiries={listing.inquiries} listingId={listing._id} />
      </div>

      <InquiryForm listingId={listing._id} />

      {showEditModal && (
        <>
          <div className="modal-backdrop show" onClick={() => setShowEditModal(false)} />
          <div className="modal show" role="dialog" aria-modal="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Listing</h5>
                  <button className="btn-close" onClick={() => setShowEditModal(false)} aria-label="Close" />
                </div>
                <div className="modal-body">
                  <UpdateListingForm
                    listingId={listing._id}
                    initialListingData={listing}
                    handleCloseModal={() => setShowEditModal(false)}
                  />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary btn-sm" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleListing;
