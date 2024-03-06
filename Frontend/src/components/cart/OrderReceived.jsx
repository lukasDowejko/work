import { Link } from "react-router-dom";

function OrderReceived() {
  return (
    <div className="h-screen flex">
      <div className="Completed-order h-fit text-center rounded-md mx-auto mt-20 text-3xl p-3">
        Your order was succesfully received
        <br />
        <Link to="/" className="go-back-btn rounded-md">
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default OrderReceived;
