import { useState } from "react";
import UpdateInquiryForm from "../updateCommentForm";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { REMOVE_INQUIRY } from "../../utils/mutations";

const InquiryList = ({ inquiries = [], listingId }) => {
  const [showModal, setShowModal]           = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const [removeInquiry] = useMutation(REMOVE_INQUIRY);

  const handleEdit = (inquiryId) => {
    setSelectedInquiry(inquiryId);
    setShowModal(true);
  };

  const handleDelete = async (inquiryId) => {
    try {
      await removeInquiry({ variables: { listingId, inquiryId } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setSelectedInquiry(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="inquiries-header">Inquiries</div>

      {!inquiries.length ? (
        <div className="no-inquiries">
          No inquiries yet. Be the first to make contact.
        </div>
      ) : (
        <div>
          {inquiries.map((inquiry) => (
            <div key={inquiry._id} className="inquiry-card">
              <div className="inquiry-author">{inquiry.inquiryAuthor}</div>
              <div className="inquiry-timestamp">sent {inquiry.createdAt}</div>
              <p className="inquiry-text">{inquiry.inquiryText}</p>
              {Auth.loggedIn() &&
                Auth.getProfile().data.username === inquiry.inquiryAuthor && (
                  <div className="inquiry-actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(inquiry._id)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(inquiry._id)}>
                      Retract
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <>
          <div className="modal-backdrop show" onClick={handleCloseModal} />
          <div className="modal show" role="dialog" aria-modal="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Inquiry</h5>
                  <button className="btn-close" onClick={handleCloseModal} aria-label="Close" />
                </div>
                <div className="modal-body">
                  <UpdateInquiryForm
                    listingId={listingId}
                    inquiryId={selectedInquiry}
                    handleCloseModal={handleCloseModal}
                    initialText={inquiries.find((i) => i._id === selectedInquiry)?.inquiryText}
                  />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary btn-sm" onClick={handleCloseModal}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InquiryList;
