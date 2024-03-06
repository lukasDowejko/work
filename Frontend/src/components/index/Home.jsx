import FoodGroupButtons from "./FoodGroupButtons";
import Menu from "./FoodGroup";

function Home() {
  return (
    <>
      <div className="max-md:hidden">
        <FoodGroupButtons />
      </div>
      <Menu />
    </>
  );
}

export default Home;
