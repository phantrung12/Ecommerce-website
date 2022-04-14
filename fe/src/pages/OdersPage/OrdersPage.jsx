import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/Card/Card";
import { getOrders } from "../../redux/actions/user.actions";
import "./OrdersPage.css";
import { Link } from "react-router-dom";
import { MdArrowRight } from "react-icons/md";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        {user.orders.map((order) => {
          return order.items.map((item) => (
            <Card style={{ display: "block", margin: "5px 0" }}>
              <Link
                to={`/order_details/${order._id}`}
                className="orderItemContainer"
              >
                <div className="orderImgContainer">
                  <img
                    className="orderImg"
                    src={item.productId.productPictures[0].img}
                    alt=""
                  />
                </div>
                <div className="orderRow">
                  <div className="orderName">{item.productId.name}</div>
                  <div className="orderPrice">{item.payablePrice}₫</div>
                  <div>{order.paymentStatus}</div>
                </div>
                <div>
                  Xem chi tiết đơn hàng <MdArrowRight color="green" />
                </div>
              </Link>
            </Card>
          ));
        })}
      </div>
    </Layout>
  );
};

export default OrdersPage;
