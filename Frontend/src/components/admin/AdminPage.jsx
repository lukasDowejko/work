import Orders from "./Orders";
import SelectedOrder from "./SelectedOrder";
import AdminNav from "./AdminNav";
import "./adminPage.css"

function AdminPage() {
  return (
    <div className="flex">
      <Orders />
      <SelectedOrder />
      <div className="absolute right-0">
        <AdminNav />
      </div>
    </div>
  );
}

export default AdminPage;
