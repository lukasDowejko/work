import PropTypes from "prop-types"
import { useContext } from "react";
import { OrderContext } from "../../context/OrderContext"

function Order({ order }) {
    const { selectOrder } = useContext(OrderContext)

    return ( 
        <button className="order w-80 p-4 rounded-md" onClick={() => selectOrder(order)}>
            <div className="flex">
                <div className="user-name mr-4">User name: {order.userName}</div>
                <div className="order-id">Order id: {order.orderId}</div>
            </div>
            <div>
                {Object.entries(order.filteredCartItems).map(entry => {
                    let key = entry[0]
                    let value = entry[1]
                    return (<div className="order-item" key={key}>{key}: {value}</div>)
                })}
            </div>
            <div className="totalPrice">Total price: {order.totalAmount}€</div>
        </button>
     );
}

Order.propTypes = {
    order: PropTypes.object.isRequired,
  };

export default Order;