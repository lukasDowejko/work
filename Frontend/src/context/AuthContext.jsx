import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"
import axios from "axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [userRole, setUserRole] = useState(undefined);
    const [userName, setUserName] = useState(undefined);

    async function getLoggedIn() {
        const loggedInResponse = await axios.get("http://localhost:3000/auth/loggedIn")
        setLoggedIn(loggedInResponse.data)
    }

    async function getUserInfo() {
        const userInfoResponse = await axios.get("http://localhost:3000/auth/userInfo")
        setUserRole(userInfoResponse.data.role)
        setUserName(userInfoResponse.data.userName)
    }

    useEffect(() => {
        getLoggedIn()
        .then(getUserInfo())
    }, [])
 
    const contextValue = {loggedIn, getLoggedIn, userRole, userName}
    return ( 
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
     );
}

AuthContextProvider.propTypes = {
    children: PropTypes.node,
 };

export default AuthContextProvider