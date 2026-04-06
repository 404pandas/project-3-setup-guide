import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ListingForm from "../components/MonsterForm";
import ListingBoard from "../components/MonsterList";
import ReputationPanel from "../components/ReputationPanel";
import { QUERY_USER, QUERY_ME, QUERY_LISTINGS } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const displayName = userParam || (Auth.loggedIn() ? Auth.getProfile().data.username : null);

  const { loading: loadingListings, data: listingData } = useQuery(QUERY_LISTINGS, {
    variables: { username: displayName },
    skip: !displayName,
  });

  const user     = data?.me || data?.user || {};
  const listings = listingData?.listings || [];

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading || loadingListings) {
    return (
      <div className="loading-wrap">
        <p className="loading-text">Pulling up the stash...</p>
      </div>
    );
  }

  if (!user?.username) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--text-muted)" }}>
          You need to be in the network to view a stash.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="stash-header">
        <div className="stash-label">Underground Contact</div>
        <h2 className="stash-name">{displayName}</h2>
        <div style={{ marginTop: "0.6rem" }}>
          <span style={{ fontFamily: "var(--font-sc)", fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--text-dim)" }}>
            {listings.length} active listing{listings.length !== 1 ? "s" : ""} on the board
          </span>
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="empty-board">
          <p className="empty-board-text">Nothing on the board yet.</p>
          <p className="empty-board-sub">Post something to get started.</p>
        </div>
      ) : (
        <div className="mb-5">
          <ListingBoard listings={listings} />
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <ReputationPanel username={displayName} />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <ListingForm />
      </div>
    </div>
  );
};

export default Profile;
