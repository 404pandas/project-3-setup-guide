import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_REPUTATION_FOR } from "../../utils/queries";
import { ADD_REPUTATION, UPDATE_REPUTATION, REMOVE_REPUTATION } from "../../utils/mutations";
import Auth from "../../utils/auth";

const ReputationPanel = ({ username }) => {
  const [voteIntent, setVoteIntent] = useState(null); // "Vouched" | "Burned" | null
  const [note, setNote]             = useState("");
  const [editTarget, setEditTarget] = useState(null); // reputation _id being edited
  const [error, setError]           = useState("");

  const { data, loading } = useQuery(QUERY_REPUTATION_FOR, {
    variables: { username },
  });
  const ratings = data?.reputationFor || [];

  const refetchOpts = { refetchQueries: [{ query: QUERY_REPUTATION_FOR, variables: { username } }] };
  const [addReputation]    = useMutation(ADD_REPUTATION,    refetchOpts);
  const [updateReputation] = useMutation(UPDATE_REPUTATION, refetchOpts);
  const [removeReputation] = useMutation(REMOVE_REPUTATION, refetchOpts);

  const isLoggedIn     = Auth.loggedIn();
  const currentUser    = isLoggedIn ? Auth.getProfile().data.username : null;
  const isOwnProfile   = currentUser === username;
  const existingRating = ratings.find((r) => r.fromUser === currentUser);

  const vouches = ratings.filter((r) => r.type === "Vouched").length;
  const burns   = ratings.filter((r) => r.type === "Burned").length;
  const score   = vouches - burns;

  const resetForm = () => {
    setVoteIntent(null);
    setNote("");
    setEditTarget(null);
    setError("");
  };

  const handleVoteClick = (type) => {
    setError("");
    setNote("");
    setEditTarget(null);
    setVoteIntent(type);
  };

  const handleEditClick = (rep) => {
    setError("");
    setNote(rep.note || "");
    setEditTarget(rep._id);
    setVoteIntent(rep.type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editTarget) {
        await updateReputation({ variables: { reputationId: editTarget, type: voteIntent, note } });
      } else {
        await addReputation({ variables: { toUser: username, type: voteIntent, note } });
      }
      resetForm();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  const handleRemove = async (reputationId) => {
    try { await removeReputation({ variables: { reputationId } }); }
    catch (err) { console.error(err); }
  };

  if (loading) return null;

  return (
    <div className="reputation-panel">

      {/* ── Header: score + tally ── */}
      <div className="reputation-header">
        <span>Reputation</span>
        <div className="rep-tally-row">
          <span className="rep-tally rep-vouch">▲ {vouches}</span>
          <span className="rep-score" data-positive={score > 0} data-negative={score < 0} data-neutral={score === 0}>
            {score > 0 ? `+${score}` : score}
          </span>
          <span className="rep-tally rep-burn">▼ {burns}</span>
        </div>
      </div>

      {/* ── Vote controls (other people's profiles only) ── */}
      {isLoggedIn && !isOwnProfile && (
        <div className="rep-vote-area">

          {/* No existing rating and no form open: show vote buttons */}
          {!existingRating && !voteIntent && (
            <div className="rep-vote-buttons">
              <button
                className="btn-vote btn-vouch"
                onClick={() => handleVoteClick("Vouched")}
              >
                ▲ Vouch
              </button>
              <button
                className="btn-vote btn-burn"
                onClick={() => handleVoteClick("Burned")}
              >
                ▼ Burn
              </button>
            </div>
          )}

          {/* Existing rating: show their current rating + change/remove */}
          {existingRating && !voteIntent && (
            <div className="rep-existing">
              <span className="rep-existing-label">
                Your rating:
                <span className={existingRating.type === "Vouched" ? "rep-type-vouch" : "rep-type-burn"}>
                  {existingRating.type === "Vouched" ? " ▲ Vouched" : " ▼ Burned"}
                </span>
              </span>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button className="btn btn-secondary btn-sm" onClick={() => handleEditClick(existingRating)}>Change</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleRemove(existingRating._id)}>Remove</button>
              </div>
            </div>
          )}

          {/* Form: open when voteIntent is set */}
          {voteIntent && (
            <form onSubmit={handleSubmit} className="rep-form">
              <div className="rep-form-type-row">
                <button
                  type="button"
                  className={`btn-vote btn-vouch ${voteIntent === "Vouched" ? "btn-vote-active" : "btn-vote-inactive"}`}
                  onClick={() => setVoteIntent("Vouched")}
                >
                  ▲ Vouch
                </button>
                <button
                  type="button"
                  className={`btn-vote btn-burn ${voteIntent === "Burned" ? "btn-vote-active" : "btn-vote-inactive"}`}
                  onClick={() => setVoteIntent("Burned")}
                >
                  ▼ Burn
                </button>
              </div>
              <input
                type="text"
                placeholder="Leave a note (optional, max 200 chars)"
                maxLength={200}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="rep-note-input"
              />
              {error && <p className="rep-error">{error}</p>}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn btn-primary btn-sm" type="submit">
                  {editTarget ? "Update" : "Submit"}
                </button>
                <button className="btn btn-secondary btn-sm" type="button" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ── Reputation cards ── */}
      <div className="rep-cards">
        {ratings.length === 0 ? (
          <p className="rep-empty">
            No reputation on record. New contact, or nobody survived to write a review.
          </p>
        ) : (
          ratings.map((rep) => (
            <div key={rep._id} className={`rep-card ${rep.type === "Vouched" ? "rep-card-vouch" : "rep-card-burn"}`}>
              <div className="rep-card-header">
                <div>
                  <span className={rep.type === "Vouched" ? "rep-type-vouch" : "rep-type-burn"}>
                    {rep.type === "Vouched" ? "▲ Vouched" : "▼ Burned"}
                  </span>
                  <span className="rep-from"> by {rep.fromUser}</span>
                </div>
                <span className="rep-date">{rep.createdAt}</span>
              </div>
              {rep.note && <p className="rep-note">{rep.note}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReputationPanel;
