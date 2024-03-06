import PropTypes from "prop-types";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

function FoodGroupButtons({ closeSidePanel, sidePanel }) {
  
  function scrollToFoodGroup(group) {
    const element = document.getElementById(group);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (sidePanel == true) {
      closeSidePanel()
    }
  }

  const { groupedFood } = useContext(ShopContext)

  return (
      <div className="groupButtons flex flex-wrap justify-center max-md:flex-col max-md:overflow-auto max-md:w-screen">
        {Object.keys(groupedFood).map((group) => (
          <button key={group} className="foodGroupButton rounded px-1 w-fit max-md:mx-auto max-md:my-6" onClick={() => scrollToFoodGroup(group)}>
            {group}
          </button>
        ))}
      </div>
  );
}

FoodGroupButtons.propTypes = {
  closeSidePanel: PropTypes.func,
  sidePanel: PropTypes.bool,
};

export default FoodGroupButtons;
