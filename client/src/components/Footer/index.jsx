import { useLocation, useNavigate } from "react-router-dom";

const DISCLAIMERS = [
  "The Novigrad Underground assumes no liability for arrests, curses, or sudden disappearances.",
  "All transactions are final. No refunds on forbidden texts, venoms, or previously-enchanted items.",
  "By browsing this board, you acknowledge that this board does not exist.",
  "The Church of the Eternal Fire is not aware of this service. Please keep it that way.",
  "We are not responsible for what happens after you buy the thing.",
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const disclaimer = DISCLAIMERS[Math.floor(Math.random() * DISCLAIMERS.length)];

  return (
    <footer className="underground-footer">
      <div className="container text-center">
        {location.pathname !== "/" && (
          <div className="mb-3">
            <button className="btn btn-dark btn-sm" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
        )}
        <p className="footer-warning">DISCLAIMER</p>
        <p className="footer-tagline">{disclaimer}</p>
      </div>
    </footer>
  );
};

export default Footer;
