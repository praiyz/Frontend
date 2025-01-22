import "./PlaceOrder.css";

const PlaceOrder = () => {
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p>Delievery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Contact Info" />
      </div>
      <div className="place-order-right"></div>
    </form>
  );
};

export default PlaceOrder;
