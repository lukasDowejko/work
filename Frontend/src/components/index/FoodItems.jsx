import cartIcon from "../../assets/images/svg/cart-shopping-solid.svg";
import spicyIcon from "../../assets/images/svg/pepper-hot-solid.svg";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { ShopContext } from "../../context/ShopContext";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

function FoodItems({ foodItems }) {
  const { addToCart } = useContext(ShopContext);
  const { loggedIn } = useContext(AuthContext);

  const [modalState, setModalState] = useState(false);

  function checkSpicyLevel(spicyNumber) {
    const spicyLvl = [];
    for (let i = 0; i < spicyNumber; i++) {
      spicyLvl.push(<img src={spicyIcon} alt="spicy!" key={i} className="spicyIcon" />);
    }
    return spicyLvl;
  }
  return (
    <>
      {foodItems.map((foodItem) => (
        <div className="foodMenuItem md:flex p-10" key={foodItem.id}>
          <div>
            <img
              src={`/images/${foodItem.picture}`}
              alt={foodItem.foodName}
              className="foodImage rounded-md max-md:w-full"
            />
          </div>
          <div className="nameContainer">
            <div className="name flex text-3xl m-1">
              <b>{foodItem.foodName}</b>
              <span className="spicyLvlContainer flex">
                {checkSpicyLevel(foodItem.spicyLevel)}
              </span>
            </div>
            <div className="ingredients text-lg m-1 max-w-sm">
              <i>{foodItem.ingredients}</i>
            </div>
          </div>
          <div className="addToCartConatiner ml-auto justify-center items-center flex">
            <div className="foodPrice text-3xl items-center">
              <b>{foodItem.price}€</b>
            </div>
            {loggedIn && (
              <button
                className="addToCartBtn"
                onClick={() => addToCart(foodItem.foodName)}
              >
                <img
                  src={cartIcon}
                  alt="Add to cart"
                  className="icon addToCartIcon"
                />
              </button>
            )}
            {!loggedIn && (
              <button className="addToCartBtn" onClick={() => setModalState(true)}>
                <img
                  src={cartIcon}
                  alt="Add to cart"
                  className="icon addToCartIcon"
                />
              </button>
              )}
              {modalState && 
                <Modal setModalState={setModalState} />
              }
          </div>
        </div>
      ))}
    </>
  );
}

FoodItems.propTypes = {
  foodItems: PropTypes.array.isRequired,
};

export default FoodItems;
