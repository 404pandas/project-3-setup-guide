import { useQuery } from "@apollo/client";
import ListingBoard from "../components/MonsterList";
import ListingForm from "../components/MonsterForm";
import { QUERY_LISTINGS } from "../utils/queries";
import Auth from "../utils/auth";

const Home = () => {
  const { loading, data } = useQuery(QUERY_LISTINGS, { variables: {} });
  const listings = data?.listings || [];

  return (
    <main>
      <div className="market-header">
        <h2 className="market-title">The Market Board</h2>
        <p className="market-subtitle">Current listings from across the Continent.</p>
        <div className="market-divider">— ✦ —</div>
      </div>

      <div className="notice-banner">
        All transactions conducted in person. The Underground accepts no responsibility for lost coin, stolen goods, or sudden inquisitor involvement.
      </div>

      {Auth.loggedIn() && (
        <div className="mb-4">
          <ListingForm />
        </div>
      )}

      {!Auth.loggedIn() && (
        <div
          style={{
            textAlign: "center",
            padding: "0.9rem 1.25rem",
            border: "1px dashed var(--border)",
            borderRadius: "var(--radius)",
            color: "var(--text-dim)",
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            marginBottom: "1.5rem",
          }}
        >
          Sign in to post items to the board.
        </div>
      )}

      {loading ? (
        <div className="loading-wrap">
          <p className="loading-text">Consulting the board...</p>
        </div>
      ) : (
        <ListingBoard listings={listings} />
      )}
    </main>
  );
};

export default Home;
