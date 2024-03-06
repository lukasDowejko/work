import "./card.css";
import Card from "./Card";
import AdminNav from "../AdminNav";

function CustomizationPage() {
  return (
    <div className="flex">
      <Card />
      <div className="absolute right-0">
        <AdminNav />
      </div>
    </div>
  );
}

export default CustomizationPage;
