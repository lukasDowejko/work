import { useContext } from "react";
import Order from "./Order";
import { AdminContext } from "../../context/AdminContext";

function Orders() {
  const { orderData, isLoading } = useContext(AdminContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (orderData.length == 0) {
    return (
      <div className="w-[22.5rem]">
        <div className="text-3xl">No Orders</div>
      </div>
    );
  }
  return (
    <div className="order-list-container">
      <div className="order-list flex-col">
        {orderData.map((order) => (
          <div className="m-5" key={order._id}>
            <Order order={order} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;