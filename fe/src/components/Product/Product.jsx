import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductModal from "./Product Modal/ProductModal";
import "./Product.css";

const Product = ({ item }) => {
  const [addToCartModal, setAddToCartModal] = useState(false);

  const renderAddtoCartModal = () => {
    return <div show={addToCartModal}>{item.name}</div>;
  };

  return (
    <div className="prdContainer">
      <div className="prdWrapper">
        <img src={item.productPictures[0]?.img} alt="" />
        <div className="prdIconsContainer">
          <div className="prdIcon" onClick={() => setAddToCartModal(true)}>
            <ShoppingCartOutlined />
          </div>
          <Link to={`/product/${item._id}`}>
            <div className="prdIcon">
              <SearchOutlined style={{ color: "black" }} />
            </div>
          </Link>
          <div className="prdIcon">
            <FavoriteBorderOutlined />
          </div>
        </div>
      </div>
      <div className="prdInfo">
        <Link to={`/product/${item._id}`}>
          <div className="prdTitle">{item.name}</div>
        </Link>
        <div className="prdPrice">{item.price}₫</div>
      </div>
      <ProductModal
        showModal={addToCartModal}
        setShowModal={setAddToCartModal}
        item={item}
      />
    </div>
  );
};

export default Product;
