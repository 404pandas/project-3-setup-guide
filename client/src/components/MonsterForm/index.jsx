import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_LISTING } from "../../utils/mutations";
import { QUERY_LISTINGS } from "../../utils/queries";

const CATEGORIES = [
  "Weaponry", "Arcana", "Ingredients", "Monster Parts",
  "Forbidden Texts", "Contraband", "Curiosities",
];
const RISK_LEVELS = ["Low", "Medium", "High", "Forbidden"];

const ListingForm = () => {
  const [formState, setFormState] = useState({
    itemName: "",
    category: "",
    price: "",
    riskLevel: "Medium",
    region: "",
    description: "",
  });

  const [addListing, { error }] = useMutation(ADD_LISTING, {
    refetchQueries: [QUERY_LISTINGS, "getListings"],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addListing({ variables: { ...formState } });
      setFormState({ itemName: "", category: "", price: "", riskLevel: "Medium", region: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="listing-form-panel">
      <p className="listing-form-title">Post a New Listing</p>

      <form onSubmit={handleFormSubmit}>
        <div className="flex-row" style={{ gap: "1rem" }}>
          <div className="col-12 col-md-8">
            <label htmlFor="itemName">Item Name</label>
            <input
              id="itemName"
              name="itemName"
              type="text"
              placeholder="What are you selling?"
              value={formState.itemName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="text"
              placeholder="e.g. 500 orens, trade only"
              value={formState.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex-row" style={{ gap: "1rem" }}>
          <div className="col-12 col-md-4">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={formState.category} onChange={handleChange} required>
              <option value="">— Select —</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="riskLevel">Risk Level</label>
            <select id="riskLevel" name="riskLevel" value={formState.riskLevel} onChange={handleChange}>
              {RISK_LEVELS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="region">Region / Location</label>
            <input
              id="region"
              name="region"
              type="text"
              placeholder="e.g. Novigrad, Skellige"
              value={formState.region}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe the item. Be as vague or detailed as you prefer."
          value={formState.description}
          style={{ minHeight: "100px" }}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary btn-block py-3" type="submit" style={{ marginTop: "0.5rem" }}>
          Post to the Board
        </button>

        {error && (
          <div className="bg-danger text-white p-3 my-3">{error.message}</div>
        )}
      </form>
    </div>
  );
};

export default ListingForm;
