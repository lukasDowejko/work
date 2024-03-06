import { createContext, useState } from "react";
import PropTypes from "prop-types"

export const OrderContext = createContext()

export const OrderContextProvider = ({ children }) => {
    const [ selectedOrder, setSelectedOrder ] = useState({});
    const [ orderIsSelected, setOrderIsSelected ] = useState(false);

    function selectOrder(order) {
        setSelectedOrder(order)
        setOrderIsSelected(true)
    }

    const contextValue = {selectOrder, selectedOrder, orderIsSelected, setOrderIsSelected}
    return (<OrderContext.Provider value={contextValue}>{children}</OrderContext.Provider>)
}

OrderContextProvider.propTypes = {
    children: PropTypes.node,
 };

export default OrderContextProvider