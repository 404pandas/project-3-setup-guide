import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({ username: "", email: "", password: "" });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addUser({ variables: { ...formState } });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-panel">
        <div className="auth-header">
          <svg width="36" height="36" viewBox="0 0 60 70" style={{ marginBottom: "0.75rem", opacity: 0.75 }}>
            <line x1="30" y1="2" x2="30" y2="10" stroke="#b03a08" strokeWidth="2.5" strokeLinecap="round"/>
            <rect x="18" y="10" width="24" height="5" rx="2" fill="#3a1a06" stroke="#b03a08" strokeWidth="1.5"/>
            <rect x="16" y="15" width="28" height="34" rx="3" fill="#120c06" stroke="#b03a08" strokeWidth="1.5"/>
            <rect x="19" y="18" width="9" height="28" rx="2" fill="#b03a08" opacity="0.45"/>
            <rect x="32" y="18" width="9" height="28" rx="2" fill="#b03a08" opacity="0.45"/>
            <ellipse cx="30" cy="22" rx="3.5" ry="4.5" fill="#d44a10" opacity="0.8"/>
            <rect x="18" y="49" width="24" height="5" rx="2" fill="#3a1a06" stroke="#b03a08" strokeWidth="1.5"/>
          </svg>
          <h2 className="auth-title">Join the Network</h2>
          <p className="auth-subtitle">No real names. No questions. Understood.</p>
        </div>

        <div className="auth-body">
          {data ? (
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--amber)", marginBottom: "1rem" }}>
                Contact established. You&apos;re one of us now.
              </p>
              <Link to="/" className="btn btn-crimson">View the Board →</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="s-username">Handle</label>
              <input id="s-username" name="username" type="text" placeholder="What do they call you?" value={formState.username} onChange={handleChange} required />
              <label htmlFor="s-email">Contact Address</label>
              <input id="s-email" name="email" type="email" placeholder="Your email" value={formState.email} onChange={handleChange} required />
              <label htmlFor="s-password">Passphrase</label>
              <input id="s-password" name="password" type="password" placeholder="••••••••" value={formState.password} onChange={handleChange} required />
              <button className="btn btn-primary btn-block py-3" type="submit" style={{ marginTop: "0.5rem" }}>
                Establish Contact
              </button>
            </form>
          )}
          {error && <div className="bg-danger text-white p-3 my-3">{error.message}</div>}
          <div className="auth-footer-text">
            Already in? <Link to="/login">Access the Underground</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
