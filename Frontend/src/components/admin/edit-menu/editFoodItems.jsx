import editIcon from "../../../assets/images/svg/edit-item.svg";
import trashIcon from "../../../assets/images/svg/trash-can-solid.svg";
import confirmIcon from "../../../assets/images/svg/square-check-solid.svg";
import PropTypes from "prop-types";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../../../context/ShopContext";

function FoodItems({ foodItems }) {
  const { fetchMenuData } = useContext(ShopContext);

  function edit(id) {
    let editBtn = document.getElementById(`edit-btn-${id}`);
    let confirmBtn = document.getElementById(`confirm-btn-${id}`);

    // let foodPic = document.querySelector(`.foodItem-pic-${id} img`);
    let foodName = document.querySelector(`.foodItem-foodName-${id}`);
    let foodGroup = document.querySelector(`.foodItem-group-${id}`);
    let foodSpicy = document.querySelector(`.foodItem-spicy-${id}`);
    let foodIngr = document.querySelector(`.foodItem-ingr-${id}`);
    let foodPrice = document.querySelector(`.foodItem-price-${id}`);
    console.log(foodName);

    foodName.outerHTML = `<input type="text" class="w-72 input-foodName-${id} edit-menu-item-input" value="${foodName.innerHTML}" />`;
    foodGroup.outerHTML = `<input type="text" class="w-72 input-foodGroup-${id} edit-menu-item-input" value="${foodGroup.innerHTML}" />`;
    foodSpicy.outerHTML = `<input type="number" min="0" max="3" class="w-10 input-spicy-${id} edit-menu-item-input" value="${foodSpicy.innerHTML}" />`;
    foodIngr.outerHTML = `<textarea style="width: 100%" class="input-ingredients-${id} edit-menu-item-input">${foodIngr.innerHTML}</textarea>`;
    foodPrice.outerHTML = `<input type="text" class="w-20 input-price-${id} edit-menu-item-input" value="${foodPrice.innerHTML}" />`;
    // foodPic.outerHTML =`<input type=file style="width:100%">`

    if (editBtn.style.display === "none") {
      editBtn.style.display = "block";
    } else {
      editBtn.style.display = "none";
      confirmBtn.style.display = "block";
    }
  }

  async function confirm(id, objectId) {
    let editBtn = document.getElementById(`edit-btn-${id}`);
    let confirmBtn = document.getElementById(`confirm-btn-${id}`);

    let foodName = document.querySelector(`.input-foodName-${id}`);
    let foodGroup = document.querySelector(`.input-foodGroup-${id}`);
    let foodSpicy = document.querySelector(`.input-spicy-${id}`);
    let foodIngr = document.querySelector(`.input-ingredients-${id}`);
    let foodPrice = document.querySelector(`.input-price-${id}`);

    let newPatch = {
      _id: objectId,
      foodName: foodName.value,
      foodGroup: foodGroup.value,
      ingredients: foodIngr.value,
      price: foodPrice.value,
      spicyLevel: foodSpicy.value,
    };

    try {
      await axios.patch("http://localhost:3000/menu/updateMenuItem", newPatch);
      fetchMenuData();
    } catch (error) {
      console.log(error);
    }

    foodName.outerHTML = `<span class="foodItem-foodName-${id}">${foodName.value}</span>`
    foodGroup.outerHTML = `<span class="foodItem-group-${id}">${foodGroup.value}</span>`
    foodSpicy.outerHTML = `<span class="foodItem-spicy-${id}">${foodSpicy.value}</span>`
    foodIngr.outerHTML = `<i class="foodItem-ingr-${id}">${foodIngr.value}</i>`
    foodPrice.outerHTML = `<span class="foodItem-price-${id}">${foodPrice.value}</span>`

    if (confirmBtn.style.display === "none") {
      confirmBtn.style.display = "block";
    } else {
      confirmBtn.style.display = "none";
      editBtn.style.display = "block";
    }
  }

  async function deleteItem(objectId) {
    try {
      await axios.delete(
        `http://localhost:3000/menu/deleteMenuItem/${objectId}`
      );
      fetchMenuData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {foodItems.map((foodItem) => (
        <div className="foodMenuItem md:flex p-10 relative" key={foodItem.id}>
          <div>
            <div className={`foodItem-pic-${foodItem.id}`}></div>
          </div>
          <div className="">
            <div className=" text-3xl edit-menu-item w-fit">
              Name:
              <span className={`foodItem-foodName-${foodItem.id}`}>
                {foodItem.foodName}
              </span>
            </div>
            <div className="text-3xl edit-menu-item">
              <span className={`foodItem-group-${foodItem.id}`}>
                {foodItem.foodGroup}
              </span>
            </div>
            <div className="text-3xl edit-menu-item">
              spiciness:
              <span className={`foodItem-spicy-${foodItem.id}`}>
                {foodItem.spicyLevel}
              </span>
            </div>
            <div className="foodPrice text-3xl items-center edit-menu-item">
              <span className={`foodItem-price-${foodItem.id}`}>
                {foodItem.price}
              </span>
              €
            </div>
            <div className="ingredients text-lg m-1 max-w-sm edit-menu-item">
              <i className={`foodItem-ingr-${foodItem.id}`}>
                {foodItem.ingredients}
              </i>
            </div>
          </div>

          <div className="button-container flex absolute right-0">
            <button
              className="opt-btn"
              id={`edit-btn-${foodItem.id}`}
              onClick={() => edit(foodItem.id)}
            >
              <img className="edit-icon" src={editIcon} alt="edit" />
            </button>
            <button
              className="opt-btn"
              id={`confirm-btn-${foodItem.id}`}
              style={{ display: "none" }}
              onClick={() => confirm(foodItem.id, foodItem._id)}
            >
              <img className="edit-icon" src={confirmIcon} alt="confirm" />
            </button>

            <div className="delete-btn-container flex">
              <button onClick={() => deleteItem(foodItem._id)}>
                <img src={trashIcon} alt="Delete" className="edit-icon" />
              </button>
            </div>
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
