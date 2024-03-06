import { ShopContext } from "../../context/ShopContext";
import { useContext } from "react";
import CartItem from "./CartItem";

function Cart() {
  const { cartItems, menuData } = useContext(ShopContext);

  return (
    <div className="cartItems m-10 w-3/5 max-md:w-auto rounded-md h-min">
      <h1 className="cartTitle m-5 text-3xl">Your Cart</h1>
      {menuData.map((item) => {
        if (cartItems[item.foodName] !== 0) {
          return (
            <CartItem cartItem={item} cartData={cartItems} key={item.id}/>
          )
        }
      })}
    </div>
  );
}

export default Cart;
