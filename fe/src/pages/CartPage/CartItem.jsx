import React, { useState } from "react";
import { IoIosTrash } from "react-icons/io";
import "./CartItem.css";

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);

  const { _id, name, price, img, color, size } = props.cartItem;

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(props.cartItem);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(props.cartItem);
  };
  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={img} alt={""} />
        </div>
        <div style={{ width: "45%" }}>
          <p>{name}</p>
          <p>{price}₫</p>
          <div className="colorSize">
            <div
              className="colorPart"
              style={{
                backgroundColor: `${color}`,
              }}
            ></div>{" "}
            / {size}
          </div>
        </div>
        <div className="quantityControl">
          <button onClick={onQuantityDecrement}>-</button>
          <input value={qty} readOnly />
          <button onClick={onQuantityIncrement}>+</button>
        </div>
        <div style={{ width: "15%" }}>Delivery in 3 - 5 days</div>
      </div>
      <div className="cartItemDetails"></div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}

        <button className="cartActionBtn">save for later</button>
        <button
          style={{ color: "red" }}
          className="cartActionBtn"
          onClick={() => props.onRemoveCartItem(props.cartItem)}
        >
          <IoIosTrash />
          Remove
        </button>
      </div>
      <hr />
    </div>
  );
};

export default CartItem;
