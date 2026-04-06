import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_WANTED_ADS } from "../utils/queries";
import { ADD_WANTED_AD, REMOVE_WANTED_AD, UPDATE_WANTED_AD } from "../utils/mutations";
import Auth from "../utils/auth";

const CATEGORIES = [
  "Weaponry", "Arcana", "Ingredients", "Monster Parts",
  "Forbidden Texts", "Contraband", "Curiosities",
];
const URGENCY_LEVELS = ["Casual", "Moderate", "Urgent", "Desperate"];

const URGENCY_STYLES = {
  Casual:     { color: "var(--risk-low-text)",   border: "var(--risk-low-border)",   bg: "var(--risk-low-bg)",   symbol: "○" },
  Moderate:   { color: "var(--risk-med-text)",   border: "var(--risk-med-border)",   bg: "var(--risk-med-bg)",   symbol: "◈" },
  Urgent:     { color: "var(--risk-high-text)",  border: "var(--risk-high-border)",  bg: "var(--risk-high-bg)",  symbol: "◉" },
  Desperate:  { color: "var(--risk-forb-text)",  border: "var(--risk-forb-border)",  bg: "var(--risk-forb-bg)",  symbol: "⊗" },
};

const CATEGORY_STYLES = {
  "Weaponry":       { color: "var(--cat-weaponry-text)",    border: "#2a3050",  bg: "var(--cat-weaponry-bg)" },
  "Arcana":         { color: "var(--cat-arcana-text)",      border: "#3a1870",  bg: "var(--cat-arcana-bg)" },
  "Ingredients":    { color: "var(--cat-ingredients-text)", border: "#284018",  bg: "var(--cat-ingredients-bg)" },
  "Monster Parts":  { color: "var(--cat-parts-text)",       border: "#401010",  bg: "var(--cat-parts-bg)" },
  "Forbidden Texts":{ color: "var(--cat-texts-text)",       border: "#300a48",  bg: "var(--cat-texts-bg)" },
  "Contraband":     { color: "var(--cat-contraband-text)",  border: "#501008",  bg: "var(--cat-contraband-bg)" },
  "Curiosities":    { color: "var(--cat-curiosities-text)", border: "#483010",  bg: "var(--cat-curiosities-bg)" },
};

const STATUS_STYLES = {
  Open:      "status-stamp status-available",
  Fulfilled: "status-stamp status-sold",
  Closed:    "status-stamp status-reserved",
};

const WantedAdForm = ({ onAdded }) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    itemWanted: "", category: "", offeredPrice: "",
    urgency: "Moderate", region: "", description: "",
  });
  const [addWantedAd, { error }] = useMutation(ADD_WANTED_AD, {
    refetchQueries: [QUERY_WANTED_ADS, "getWantedAds"],
  });

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addWantedAd({ variables: { ...formState } });
      setFormState({ itemWanted: "", category: "", offeredPrice: "", urgency: "Moderate", region: "", description: "" });
      setOpen(false);
      onAdded?.();
    } catch (err) {
      console.error(err);
    }
  };

  if (!open) {
    return (
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <button className="btn btn-amber" onClick={() => setOpen(true)}>
          + Post a Wanted Ad
        </button>
      </div>
    );
  }

  return (
    <div className="listing-form-panel" style={{ marginBottom: "2rem" }}>
      <p className="listing-form-title">What Are You Looking For?</p>
      <form onSubmit={handleSubmit}>
        <div className="flex-row" style={{ gap: "1rem" }}>
          <div className="col-12 col-md-8">
            <label>Item Wanted</label>
            <input name="itemWanted" type="text" placeholder="What do you need?" value={formState.itemWanted} onChange={handleChange} required />
          </div>
          <div className="col-12 col-md-4">
            <label>Offered Price</label>
            <input name="offeredPrice" type="text" placeholder="e.g. Up to 500 orens" value={formState.offeredPrice} onChange={handleChange} required />
          </div>
        </div>
        <div className="flex-row" style={{ gap: "1rem" }}>
          <div className="col-12 col-md-4">
            <label>Category</label>
            <select name="category" value={formState.category} onChange={handleChange} required>
              <option value="">— Select —</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label>Urgency</label>
            <select name="urgency" value={formState.urgency} onChange={handleChange}>
              {URGENCY_LEVELS.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label>Region</label>
            <input name="region" type="text" placeholder="e.g. Novigrad, anywhere" value={formState.region} onChange={handleChange} required />
          </div>
        </div>
        <label>Details</label>
        <textarea name="description" placeholder="Describe exactly what you need and any conditions..." value={formState.description} onChange={handleChange} style={{ minHeight: "90px" }} required />
        {error && <div className="bg-danger text-white p-3 my-2">{error.message}</div>}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
          <button className="btn btn-primary" type="submit" style={{ flex: 1 }}>Post Ad</button>
          <button className="btn btn-secondary" type="button" onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

const WantedAdCard = ({ ad }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const urgency = URGENCY_STYLES[ad.urgency] || URGENCY_STYLES.Moderate;
  const cat     = CATEGORY_STYLES[ad.category] || CATEGORY_STYLES["Curiosities"];
  const isOwner = Auth.loggedIn() && Auth.getProfile().data.username === ad.postedBy;

  const [removeWantedAd] = useMutation(REMOVE_WANTED_AD, {
    refetchQueries: [QUERY_WANTED_ADS, "getWantedAds"],
  });
  const [updateWantedAd] = useMutation(UPDATE_WANTED_AD, {
    refetchQueries: [QUERY_WANTED_ADS, "getWantedAds"],
  });

  const handleDelete = async () => {
    try { await removeWantedAd({ variables: { adId: ad._id } }); }
    catch (err) { console.error(err); }
  };

  const handleMarkFulfilled = async () => {
    try { await updateWantedAd({ variables: { adId: ad._id, status: "Fulfilled" } }); }
    catch (err) { console.error(err); }
  };

  return (
    <div className="wanted-ad-card">
      <div className="wanted-ad-top">
        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", flexWrap: "wrap" }}>
          <span className="category-badge" style={{ background: cat.bg, color: cat.color, borderColor: cat.border }}>
            {ad.category}
          </span>
          <span className="risk-badge" style={{ background: urgency.bg, borderColor: urgency.border, color: urgency.color }}>
            {urgency.symbol} {ad.urgency}
          </span>
        </div>
        <span className={STATUS_STYLES[ad.status] || "status-stamp"}>{ad.status}</span>
      </div>

      <div className="wanted-ad-body">
        <h4 className="wanted-ad-title">{ad.itemWanted}</h4>
        <p className="wanted-ad-price">Offering: {ad.offeredPrice}</p>
        <p className="wanted-ad-region">📍 {ad.region}</p>
        <p className="wanted-ad-desc">{ad.description}</p>
        <p className="wanted-ad-meta">Posted by <Link to={`/profiles/${ad.postedBy}`} className="user-link"><strong>{ad.postedBy}</strong></Link> · {ad.createdAt}</p>
      </div>

      {isOwner && ad.status === "Open" && (
        <div className="wanted-ad-footer">
          <button className="btn btn-secondary btn-sm" onClick={handleMarkFulfilled}>
            Mark Fulfilled
          </button>
          {confirmDelete ? (
            <>
              <span style={{ fontFamily: "var(--font-sc)", fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>Sure?</span>
              <button className="btn btn-danger btn-sm" onClick={handleDelete}>Yes, Pull It</button>
              <button className="btn btn-secondary btn-sm" onClick={() => setConfirmDelete(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(true)}>Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

const WantedAds = () => {
  const { loading, data } = useQuery(QUERY_WANTED_ADS, { variables: {} });
  const ads = data?.wantedAds || [];

  return (
    <main>
      <div className="market-header">
        <h2 className="market-title">Wanted Board</h2>
        <p className="market-subtitle">What the Underground is looking to acquire.</p>
        <div className="market-divider">— ✦ —</div>
      </div>

      <div className="notice-banner">
        Sellers: if you have what someone needs, contact them directly. Don&apos;t post here — post on the Market Board, then send word.
      </div>

      {Auth.loggedIn() && <WantedAdForm />}

      {!Auth.loggedIn() && (
        <div style={{ textAlign: "center", padding: "0.9rem 1.25rem", border: "1px dashed var(--border)", borderRadius: "var(--radius)", color: "var(--text-dim)", fontFamily: "var(--font-body)", fontStyle: "italic", marginBottom: "1.5rem" }}>
          Sign in to post a wanted ad.
        </div>
      )}

      {loading ? (
        <div className="loading-wrap"><p className="loading-text">Checking the board...</p></div>
      ) : ads.length === 0 ? (
        <div className="empty-board">
          <p className="empty-board-text">Nobody needs anything. Unlikely, but here we are.</p>
        </div>
      ) : (
        <div>{ads.map((ad) => <WantedAdCard key={ad._id} ad={ad} />)}</div>
      )}
    </main>
  );
};

export default WantedAds;
