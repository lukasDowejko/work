import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import _ from "lodash";

export const ShopContext = createContext(null);

let menuData = [];
let cart = {};
async function getTheMenu() {
  try {
    const response = await axios.get("http://localhost:3000/menu/getMenu");
    menuData = response.data;
    for (let i = 0; i < menuData.length; i++) {
      cart[menuData[i].foodName] = 0;
    }
  } catch (error) {
    console.error("Error fetching menu data from the server");
  }
}

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(cart);
  const [groupedFood, setGroupedFood] = useState({});
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    getTheMenu().then(() => {
      const grouped = _.groupBy(menuData, "foodGroup");
      setGroupedFood(grouped);
    });
  }, [cartItems]);

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const foodName in cartItems) {
      if (cartItems[foodName] > 0) {
        let itemInfo = menuData.find((product) => product.foodName === foodName)
        totalAmount += cartItems[foodName] * itemInfo.price;
      }
    }
    return totalAmount.toFixed(2);
  };

  useEffect(() => {
    const count = Object.values(cartItems).reduce((total, value) => total + value, 0);
    setItemCount(count);
  }, [cartItems]);

  const addToCart = (foodName) => {
    setCartItems((prev) => ({ ...prev, [foodName]: prev[foodName] + 1 }));
  };

  const removeFromCart = (foodName) => {
    setCartItems((prev) => ({ ...prev, [foodName]: prev[foodName] - 1 }));
  };

  const fetchMenuData = async () => {
    try {
      await getTheMenu();
      const grouped = _.groupBy(menuData, "foodGroup");
      setGroupedFood(grouped);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    groupedFood,
    menuData,
    itemCount,
    fetchMenuData
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
