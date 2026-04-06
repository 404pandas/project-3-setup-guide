import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_INQUIRY } from "../../utils/mutations";
import { QUERY_SINGLE_LISTING } from "../../utils/queries";

const UpdateInquiryForm = ({ listingId, inquiryId, initialText, handleCloseModal }) => {
  const [inquiryText, setInquiryText] = useState(initialText || "");

  const [updateInquiry, { error }] = useMutation(UPDATE_INQUIRY, {
    refetchQueries: [{ query: QUERY_SINGLE_LISTING, variables: { listingId } }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateInquiry({ variables: { listingId, inquiryId, inquiryText } });
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={inquiryText}
        onChange={(e) => setInquiryText(e.target.value)}
        style={{ minHeight: "110px" }}
        placeholder="Revise your inquiry..."
      />
      {error && <div className="bg-danger text-white p-3 my-2">{error.message}</div>}
      <button className="btn btn-primary btn-block" type="submit" style={{ marginTop: "0.75rem" }}>
        Update
      </button>
    </form>
  );
};

export default UpdateInquiryForm;
