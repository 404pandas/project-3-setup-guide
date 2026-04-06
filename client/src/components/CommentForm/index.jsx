import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_INQUIRY } from "../../utils/mutations";
import Auth from "../../utils/auth";

const InquiryForm = ({ listingId }) => {
  const [inquiryText, setInquiryText] = useState("");
  const [charCount, setCharCount]     = useState(0);
  const MAX = 500;

  const [addInquiry, { error }] = useMutation(ADD_INQUIRY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addInquiry({ variables: { listingId, inquiryText } });
      setInquiryText("");
      setCharCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX) {
      setInquiryText(val);
      setCharCount(val.length);
    }
  };

  if (!Auth.loggedIn()) {
    return (
      <div className="inquiry-form-panel" style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1rem" }}>
          You need to be in the network to make inquiries.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <Link to="/login"  className="btn btn-info">Enter</Link>
          <Link to="/signup" className="btn btn-crimson">Join the Network</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="inquiry-form-panel">
      <p className="inquiry-form-title">Send an Inquiry</p>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Ask about availability, arrange a meeting, negotiate terms..."
          value={inquiryText}
          onChange={handleChange}
          style={{ minHeight: "90px" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.4rem" }}>
          <span style={{
            fontFamily: "var(--font-sc)",
            fontSize: "0.7rem",
            letterSpacing: "0.06em",
            color: charCount >= MAX ? "var(--crimson-bright)" : "var(--text-dim)",
          }}>
            {charCount}/{MAX}
            {error && <span style={{ marginLeft: "0.5rem" }}> — {error.message}</span>}
          </span>
          <button className="btn btn-crimson btn-sm" type="submit" disabled={!inquiryText.trim()}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;
