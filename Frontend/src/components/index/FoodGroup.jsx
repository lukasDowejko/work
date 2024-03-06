import FoodList from "./FoodItems";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

function Menu() {
  const { groupedFood } = useContext(ShopContext)
  
  return (
    <>
      {Object.keys(groupedFood).map((group) => (
        <div key={group}>
          <div className="foodGroup my-5 rounded mx-20" id={group}>
            <h3 className="foodGroupTitle font-bold mx-10">{group}</h3>
          </div>
          <div className="foodList rounded mx-20 max-md:mx-10">
            <FoodList foodItems={groupedFood[group]} />
          </div>
        </div>
      ))}
    </>
  );
}

export default Menu;
