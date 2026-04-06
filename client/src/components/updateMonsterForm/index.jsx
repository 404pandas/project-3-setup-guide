import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_LISTING } from "../../utils/mutations";
import { QUERY_SINGLE_LISTING } from "../../utils/queries";

const CATEGORIES = [
  "Weaponry", "Arcana", "Ingredients", "Monster Parts",
  "Forbidden Texts", "Contraband", "Curiosities",
];
const RISK_LEVELS  = ["Low", "Medium", "High", "Forbidden"];
const STATUSES     = ["Available", "Reserved", "Sold"];

const UpdateListingForm = ({ listingId, initialListingData, handleCloseModal }) => {
  const [formState, setFormState] = useState({
    itemName:    initialListingData.itemName    || "",
    category:    initialListingData.category    || "",
    price:       initialListingData.price       || "",
    riskLevel:   initialListingData.riskLevel   || "Medium",
    region:      initialListingData.region      || "",
    description: initialListingData.description || "",
    status:      initialListingData.status      || "Available",
  });

  useEffect(() => {
    setFormState({
      itemName:    initialListingData.itemName    || "",
      category:    initialListingData.category    || "",
      price:       initialListingData.price       || "",
      riskLevel:   initialListingData.riskLevel   || "Medium",
      region:      initialListingData.region      || "",
      description: initialListingData.description || "",
      status:      initialListingData.status      || "Available",
    });
  }, [initialListingData]);

  const [updateListing, { error }] = useMutation(UPDATE_LISTING, {
    refetchQueries: [{ query: QUERY_SINGLE_LISTING, variables: { listingId } }],
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateListing({ variables: { listingId, ...formState } });
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="u-itemName">Item Name</label>
      <input id="u-itemName" name="itemName" type="text" value={formState.itemName} onChange={handleChange} required />

      <div className="flex-row" style={{ gap: "1rem" }}>
        <div className="col-12 col-md-6">
          <label htmlFor="u-price">Price</label>
          <input id="u-price" name="price" type="text" value={formState.price} onChange={handleChange} />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="u-region">Region</label>
          <input id="u-region" name="region" type="text" value={formState.region} onChange={handleChange} />
        </div>
      </div>

      <div className="flex-row" style={{ gap: "1rem" }}>
        <div className="col-12 col-md-4">
          <label htmlFor="u-category">Category</label>
          <select id="u-category" name="category" value={formState.category} onChange={handleChange}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="u-riskLevel">Risk Level</label>
          <select id="u-riskLevel" name="riskLevel" value={formState.riskLevel} onChange={handleChange}>
            {RISK_LEVELS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="u-status">Status</label>
          <select id="u-status" name="status" value={formState.status} onChange={handleChange}>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <label htmlFor="u-description">Description</label>
      <textarea id="u-description" name="description" value={formState.description} onChange={handleChange} style={{ minHeight: "90px" }} />

      {error && <div className="bg-danger text-white p-3 my-2">{error.message}</div>}

      <button className="btn btn-primary btn-block" type="submit" style={{ marginTop: "0.75rem" }}>
        Update Listing
      </button>
    </form>
  );
};

export default UpdateListingForm;
