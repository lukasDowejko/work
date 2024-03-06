import Cart from "./Cart";
import Payment from "./Payment";

function CartPage() {
  return (
    <div className="flex max-md:flex-col">
      <Cart />
      <Payment />
    </div>
  );
}

export default CartPage;
