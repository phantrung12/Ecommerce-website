import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Products from "../../components/Products/Products";
import Slider from "@material-ui/core/Slider";
import "./ProductList.css";

const ProductsList = () => {
  const location = useLocation();
  const slug = location.pathname.split("/")[2];

  const [sort, setSort] = useState("newest");

  return (
    <Layout>
      <div className="filterContainer">
        <div className="filterTitle">Sắp xếp</div>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value={"newest"}>Mới nhất</option>
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
            />
          </div>
          <div className="filterItem">
            <div className="filterTitle">Kích thước</div>
            <div>
              <ul className="filterListSize">
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
              </ul>
            </div>
          </div>
          <div className="filterItem">
            <div className="filterTitle">Màu sắc</div>
            <div className="filterListColor">
              <div
                className="filterItemColor"
                style={{ backgroundColor: "red" }}
              ></div>
              <div
                className="filterItemColor"
                style={{ backgroundColor: "black" }}
              ></div>
              <div
                className="filterItemColor"
                style={{ backgroundColor: "yellow" }}
              ></div>
              <div
                className="filterItemColor"
                style={{ backgroundColor: "green" }}
              ></div>
            </div>
          </div>
          <div className="filterItem">
            <div className="filterTitle">Danh mục</div>
          </div>
        </div>
        <div className="productWrap">
          <Products slug={slug} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductsList;
