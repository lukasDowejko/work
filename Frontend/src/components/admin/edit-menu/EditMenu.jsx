import AddMenuItem from "./AddMenuItem";
import AdminFoodItems from "./AdminFoodItems";
import AdminNav from "../AdminNav";

function EditMenu() {
  return (
    <div className="flex">
      <AdminFoodItems />
      <AddMenuItem />
      <div className="absolute right-0">
        <AdminNav />
      </div>
    </div>
  );
}

export default EditMenu;
