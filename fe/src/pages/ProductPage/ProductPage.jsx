import { Button } from "@material-ui/core";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout/Layout";
import Product from "../../components/Product/Product";
import { addToCart } from "../../redux/actions/cart.actions";
import {
  addReview,
  getProducts,
  getProductsById,
} from "../../redux/actions/product.actions";
import "./ProductPage.css";

const ProductPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [ide, setIde] = useState(0);
  const [cate, setCate] = useState([]);
  const [review, setReview] = useState("");

  const handelSize = (s) => {
    setSize(s);
    // console.log(s);
  };
  const handelColor = (c) => {
    setColor(c);
    // console.log(c);
  };

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const submitReview = (e) => {
    e.preventDefault();
    const newReview = {
      productId: id,
      review: review,
    };
    // console.log(newReview);
    dispatch(addReview(newReview));
  };

  useEffect(() => {
    dispatch(getProductsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setCate(product.productDetail.category);
    // console.log(product.productDetail.category?.[0]);
    // dispatch(getProducts(product.productDetail.category?.[0]));
    // console.log(product.products);
  }, [dispatch, product.productDetail]);

  return (
    <Layout>
      <div className="wrapperPrd">
        <div className="imgContainer">
          <div className="subImg">
            {product.productDetail.productPictures?.map((pic, index) => (
              <img
                src={pic.img}
                alt=""
                key={pic._id}
                onClick={() => setIde(index)}
              />
            ))}
          </div>
          <div className="mainImg">
            <img
              src={product.productDetail.productPictures?.[ide].img}
              alt=""
            />
          </div>
        </div>
        <div className="infoWrapper">
          <h2 className="prdName">{product.productDetail.name}</h2>
          <p className="prdDesc">{product.productDetail.description}</p>
          <p
            className={
              product.productDetail.quantity < 1
                ? "inoutstock redcolor"
                : "inoutstock greencolor"
            }
          >
            {product.productDetail.quantity < 1 ? "Hết hàng" : "Còn hàng"}
          </p>
          <br />
          <span className="prdDetailPrice">{product.productDetail.price}₫</span>
          <hr />
          <div className="">
            <p>Kích thước</p>
            <div className="sizeOption">
              {product.productDetail.size?.map((item) => (
                <div
                  className={
                    size === item
                      ? "sizeOptionItem sizeOptionActive"
                      : "sizeOptionItem "
                  }
                  value={item}
                  key={item}
                  onClick={() => handelSize(item)}
                >
                  {item}
                </div>
              ))}
            </div>
            <p>Màu sắc</p>
            <div className="colorOption">
              {product.productDetail.color?.map((item) => (
                <div
                  className={
                    color === item
                      ? "colorOptionItem colorOptionItemActive"
                      : "colorOptionItem"
                  }
                  value={item}
                  key={item}
                  onClick={() => handelColor(item)}
                  style={{ backgroundColor: `${item}` }}
                ></div>
              ))}
            </div>
            <div className="btnAndLike">
              <div
                className="btnAddToCart"
                onClick={() => {
                  if (!size || !color) {
                    alert("Vui lòng chọn kích thước và màu sắc");
                  } else {
                    const { _id, name, price } = product.productDetail;
                    const img = product.productDetail.productPictures[0].img;
                    // console.log(_id, size, color);
                    dispatch(addToCart({ _id, name, price, img, size, color }));
                    history.push(`/cart`);
                  }
                }}
                disable={product.productDetail.quantity < 1 ? "true" : "false"}
              >
                THÊM VÀO GIỎ HÀNG
              </div>
              <div className="like">
                <FavoriteBorderOutlined
                  style={{ width: "40px", height: "40px" }}
                />
              </div>
            </div>
            <div className="productService">
              <div className="freeship"></div>
              <div className="freeExchange"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="reviewCont">
        <h2>Viết đánh giá của bạn</h2>
        {auth.authenticate ? (
          <div className="reviewWrapper">
            <div className="avtReview">
              <div className="avtImg">
                <img
                  src={auth.user.profilePicture}
                  alt=""
                  className="avtRvImg"
                />
                <div>{auth.user.username}</div>
                <div>{auth.user.email}</div>
              </div>
            </div>
            <div className="textReview">
              <textarea onChange={(e) => setReview(e.target.value)} />
            </div>
            <div className="btnReviewWrapper">
              <Button
                variant="contained"
                className="reviewBtn"
                onClick={submitReview}
              >
                Gửi
              </Button>
            </div>
          </div>
        ) : (
          <p>
            Bạn phải đăng nhập để viết đánh giá.{" "}
            <Link to="/login" style={{ color: "orangered" }}>
              Đăng nhập
            </Link>
          </p>
        )}
        <h2>Đánh giá của khách hàng</h2>
        <div className="customerReview">
          {product.productDetail?.reviews?.map((rv) => (
            <div className="reviewCard">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt=""
                className="avtRvImg"
              />
              <span className="reviewCardComment">{rv.review}</span>
            </div>
          ))}
        </div>
      </div>
      <h2 style={{ padding: "0px 200px" }}>Sản phẩm tương tự</h2>
      <div className="sameProWrapper">
        {product.products
          .sort((a, b) => 0.5 - Math.random())
          .slice(0, 4)
          .map((prod) => (
            <Product item={prod} key={prod._id} />
          ))}
      </div>
      <Footer />
    </Layout>
  );
};

export default ProductPage;
