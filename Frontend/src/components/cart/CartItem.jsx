import PropTypes from "prop-types";
import { ShopContext } from "../../context/ShopContext";
import { useContext } from "react";
import minusIcon from "../../assets/images/svg/minus-solid.svg";
import plusIcon from "../../assets/images/svg/plus-solid.svg";

function CartItem({ cartItem }) {
  const { addToCart, removeFromCart, cartItems } = useContext(ShopContext);

  return (
    <div className="cartItem md:flex p-4" key={cartItem.id}>
      <div>
        <img
          src={`/images/${cartItem.picture}`}
          alt={cartItem.foodName}
          className="cartFoodImage rounded-md max-md:w-full"
        />
      </div>
      <div className="nameContainer">
        <div className="name flex text-3xl m-1">
          <b>{cartItem.foodName}</b>
          <span className="spicyLvlContainer flex">
            {/* {checkSpicyLevel(cartItem.spicyLevel)} */}
          </span>
        </div>
        <div className="ingredients text-sm m-1 max-w-sm">
          <i>{cartItem.ingredients}</i>
        </div>
      </div>
      <div className="ml-auto justify-center items-center flex max-md:flex-col">
        <div className="foodPrice text-3xl items-center m-5">
          <b>{cartItem.price}€</b>
        </div>
        <div className="flex">
          <button onClick={() => removeFromCart(cartItem.foodName)} className="border-y-2 border-l-2 rounded-l-lg border-black">
            <img src={minusIcon} alt="Minus" className="cartIcons" />
          </button>
          <div className="amountNumber w-16 text-3xl border-2 border-black flex items-center justify-center">{cartItems[cartItem.foodName]}</div>
          <button onClick={() => addToCart(cartItem.foodName)} className="border-y-2 border-r-2 rounded-r-lg border-black">
            <img src={plusIcon} alt="Plus" className="cartIcons"/>
          </button>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.object,
  cartData: PropTypes.object,
};

export default CartItem;
