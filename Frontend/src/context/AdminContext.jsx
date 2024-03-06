import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getOrders() {
    try {
      const response = await axios.get("http://localhost:3000/order/getOrders");
      setOrderData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
    const intervalId = setInterval(() => {
      getOrders();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const contextValue = { orderData, isLoading, getOrders };
  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

AdminContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AdminContextProvider;
