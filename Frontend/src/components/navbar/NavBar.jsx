import userIcon from "../../assets/images/svg/user-solid.svg";
import adminIcon from "../../assets/images/svg/user-secret-solid.svg"
import cartIcon from "../../assets/images/svg/cart-shopping-solid.svg";
import homeIcon from "../../assets/images/svg/house-solid.svg";
import logOutIcon from "../../assets/images/svg/log-out.svg"
import sidePanelBars from "../../assets/images/svg/bars-solid.svg";
import FoodGroupButtons from "../index/FoodGroupButtons";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";

function NavBar() {
  const { loggedIn, userName, userRole } = useContext(AuthContext);
  const { itemCount } = useContext(ShopContext)

  async function logOut() {
    await axios.get("http://localhost:3000/auth/logout")
    .then((response) => {
      if (response.status === 200) {
        return (window.location.href = "http://localhost:5173/");
      }
    });
  }

  const [sidePanel, setSidePanel] = useState(false);
  function handleClick() {
    setSidePanel(!sidePanel);
    document.body.style.overflow = sidePanel ? "auto" : "hidden";
  }
  return (
    <div className="navBar w-full h-[80px] flex justify-around items-center border-2 border-gray-300 relative z-10">
      {/* dekstop navbar */}
      <div className="sidePanelBtn md:hidden z-10" onClick={handleClick}>
        <img src={sidePanelBars} alt="Side panel" className="icon" />
      </div>
      <div className="flex">
        <Link to="/">
          <img src={homeIcon} alt="Home" className="icon" />
        </Link>
        {userRole == "admin" && (
          <Link to="/admin">
            <img src={adminIcon} alt="to admin" className="icon"/>
          </Link>
          )}
      </div>
      <h1 className="title text-6xl max-md:text-5xl">TITLE</h1>
      <div className="flex">
        {!loggedIn && (
          <Link to="/register">
            <img src={userIcon} alt="User" className="userIcon icon" />
          </Link>
        )}
        {loggedIn && (
          <>
          <div className="WelcomeText mt-auto mb-auto">Welcome, {userName}</div>
            <Link to="/cart" className="cartBtn max-md:hidden m-2 relative">
              <img src={cartIcon} alt="Cart" className="cartIcon icon" />
              <div className="absolute bottom-0 right-0 bg-black text-white rounded-full w-6 h-6 text-center">{itemCount}</div>
            </Link>
            <button onClick={logOut}><img src={logOutIcon} alt="Log Out" className="icon"/></button>
          </>
        )}
      </div>

      {/* mobile navbar */}
      <ul
        className={
          !sidePanel
            ? "hidden"
            : "sidePanel absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center"
        }>
        <FoodGroupButtons closeSidePanel={handleClick} sidePanel={sidePanel} />
      </ul>
      {loggedIn && (
      <div
        className={
          !sidePanel
            ? "mobileCartBtn md:hidden fixed bottom-0 h-14 w-screen z-50 flex"
            : "hidden"
        }>
        <Link
          to="/cart"
          className="m-auto w-4/5 h-2/3 bg-black text-white text-center rounded-md">
          <button className="text-lg m-auto">Cart</button>
        </Link>
      </div>
      )}
    </div>
  );
}

export default NavBar;
