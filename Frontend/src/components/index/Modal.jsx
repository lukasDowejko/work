import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Modal({ setModalState }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-modal" onClick={() => setModalState(false)}>
          &times;
        </button>
        <p className="modal-text">You need to be logged in to be able too add items to cart,you can log in</p>
        <Link to="/register">
          <b className="modal-text">HERE</b>
        </Link>
      </div>
    </div>
  );
}

Modal.propTypes = {
    setModalState: PropTypes.func.isRequired,
  };

export default Modal;
