import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Slider from "@material-ui/core/Slider";
import { clearErrors, getProducts } from "../../redux/actions/product.actions";
import Product from "../../components/Product/Product";
import Pagination from "react-js-pagination";
import "./ProductListPage.css";
import Footer from "../../components/Footer";
import SubNav from "../../components/SubNav";

const ProductListPage = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 1000000]);
  const [category, setCategory] = useState(match.params.cateId);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const categoryList = useSelector((state) => state.category);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.product);

  const keyword = match.params.keyword;
  const cateId = match.params.cateId;

  const handleColor = (value) => {
    setColor(value);
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (cateId) {
      setCategory(cateId);
    }
    dispatch(getProducts(keyword, currentPage, price, category, size, color));
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    error,
    cateId,
    size,
    color,
  ]);

  return (
    <Layout>
      <div className="filterContainer">
        <div className="filterTitle">Sắp xếp</div>
        <select>
          <option value="newest">Mới nhất</option>
          <option value="asc">Giá (thấp đến cao)</option>
          <option value="desc">Giá (cao đến thấp)</option>
        </select>
      </div>
      <div className="pListContainer">
        <div className="sidebarFilter">
          <div className="filterItem">
            <div className="filterTitle">Lọc theo giá</div>
            <Slider
              min={0}
              max={1000000}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              value={price}
              onChange={priceHandler}
              disabled={loading}
            />
          </div>
          <div className="filterItem">
            <div className="filterTitle">Kích thước</div>
            <select
              style={{ padding: "6px", fontSize: "14px", margin: "10px 0px" }}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Size</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>
          <div className="filterItem">
            <div className="filterTitle">Màu sắc</div>
            <div className="filterListColor">
              <div
                className="filterItemColor"
                style={{ backgroundColor: "red" }}
                value="red"
                onClick={() => handleColor("red")}
              ></div>
              <div
                className="filterItemColor"
                style={{ backgroundColor: "black" }}
                value="black"
                onClick={() => handleColor("black")}
              ></div>
              <div
                className="filterItemColor"
                style={{ backgroundColor: "yellow" }}
                value="yellow"
                onClick={() => handleColor("yellow")}
              ></div>
              <div
                className="filterItemColor"
                style={{ backgroundColor: "green" }}
                value="green"
                onClick={() => handleColor("green")}
              ></div>
              <div
                className="filterItemColor"
                style={{ backgroundColor: "blue" }}
                value="blue"
                onClick={() => handleColor("blue")}
              ></div>
              <div
                className="filterItemColor"
                style={{ backgroundColor: "white" }}
                value="white"
                onClick={() => handleColor("white")}
              ></div>
            </div>
          </div>
          <div className="filterItem">
            <div className="filterTitle">Danh mục</div>
            <div>
              {categoryList.categories.map((c, index) => (
                <SubNav item={c} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="productWrap">
          <div className="productWrapChild">
            {products &&
              products.map((pro) => <Product item={pro} key={pro._id} />)}
          </div>
          <div>
            {resultPerPage < count && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default ProductListPage;
