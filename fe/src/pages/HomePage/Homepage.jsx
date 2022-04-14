import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/CategoryItem/Categories";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout/Layout";
import Newsletter from "../../components/Newsletter";
import Product from "../../components/Product/Product";
import Products from "../../components/Products/Products";
import Slider from "../../components/Slider/Slider";
import { getAllProduct } from "../../redux/actions/product.actions";
import "./Homepage.css";

const Homepage = () => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <Layout>
      <Slider />
      <Categories />
      <Products
        products={product.products
          .filter((pro) => pro.category[2]._id === "622afe87262e89697320b86f")
          .sort((a, b) => 0.5 - Math.random())
          .slice(0, 4)}
        title="Thời trang nam"
      />
      <Products
        products={product.products
          .filter((pro) => pro.category[2]._id === "622afe8b262e89697320b871")
          .sort((a, b) => 0.5 - Math.random())
          .slice(0, 4)}
        title="Thời trang nữ"
      />
      <Newsletter />
      <Footer />
    </Layout>
  );
};

export default Homepage;
