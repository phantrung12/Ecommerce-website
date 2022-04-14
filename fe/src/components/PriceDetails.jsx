import React from "react";
import Card from "./Card/Card";

const PriceDetails = (props) => {
  return (
    <Card headerLeft={"Chi tiết đơn hàng"} style={{ maxWidth: "380px" }}>
      <div
        style={{
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Giá ({props.totalItem} mặt hàng)</div>
          <div>{props.totalPrice}</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Phí vận chuyển</div>
          <div>FREE</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Tổng tiền</div>
          <div>{props.totalPrice}</div>
        </div>
      </div>
    </Card>
  );
};

export default PriceDetails;
