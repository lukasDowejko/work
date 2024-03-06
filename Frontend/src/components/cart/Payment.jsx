import { useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useContext } from "react";
import axios from "axios";

function Payment() {
  const [ delivery, setDelivery ] = useState(false)
  const [ address, setAddress ] = useState("")
  const { cartItems, getTotalAmount } = useContext(ShopContext);

  const totalAmount = getTotalAmount()

  function handleChangeDelivery() {
    if (delivery == false) {
      setDelivery(true)
    } 
  }

  async function postOrder(e) {
    e.preventDefault()

    try {
      if (delivery == true) {
        let orderData = {
          cartItems,
          totalAmount,
          delivery,
          address
      }
      await axios.post("http://localhost:3000/order/submitOrder", orderData)
      .then(response => {
        if (response.status == 201) {
          return (window.location.href = "http://localhost:5173/orderCompleted");
        }
      })
    }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="paymentContainer w-1/4 max-md:w-auto p-5 m-10 rounded-md h-min">
      <form onSubmit={postOrder}>
        <label htmlFor="cardNumber">Card Number</label>
        <br />
        <input type="number" id="cardNumber" className="bg-[#D9D9D9] rounded-md border-2 border-black py-1" required/>
        <br />
        <label htmlFor="expiryDate">Expiry Date</label>
        <br />
        <input type="text" id="expiryDate" className="bg-[#D9D9D9] rounded-md border-2 border-black py-1" required/>
        <br />
        <label htmlFor="magicNumber">CVC/CVV</label>
        <br />
        <input type="number" id="magicNumber" className="bg-[#D9D9D9] rounded-md border-2 border-black py-1" required/>
        <br />
        <input type="radio" id="delivery" name="deliveryMethod" onChange={handleChangeDelivery} value={delivery == false} required/>
        <span>Delivery</span>
        {delivery && (
        <div>
          <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} defaultValue={address} className="bg-[#D9D9D9] rounded-md border-2 border-black p-2 m-1" required/>
        </div>
        )}
        <div className="mt-5">
          <span className="totalPrice text-xl">Total: {totalAmount}€</span>
          <input type="submit" value="submit" className="bg-[#000] text-white text-xl p-1 ml-3 rounded-md" />
        </div>
      </form>
    </div>
  );
}

export default Payment;
