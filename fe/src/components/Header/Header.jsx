import React, { useState } from "react";
import "./header.css";
import {
  ShoppingCartOutlined,
  AccountCircleOutlined,
  FavoriteBorderOutlined,
  SearchOutlined,
  MessageOutlined,
  MenuOutlined,
  CloseOutlined,
  Add,
  Remove,
  AccountCircle,
  ExitToApp,
  ShoppingBasketSharp,
  PersonAddSharp,
  PersonSharp,
} from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux/actions/auth.actions";
import { useHistory } from "react-router-dom";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const [keyword, setKeyword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [subnav, setSubnav] = useState(false);

  const logout = () => {
    dispatch(signout());
  };

  const searchSubmitHandle = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/allproducts/${keyword}`);
    } else {
      history.push(`/allproducts`);
    }
  };

  const renderNonLogin = () => {
    return (
      <div className="accountCont">
        <Link to="/login">
          <div className="accountContItem">
            <PersonSharp />
            Đăng nhập
          </div>
        </Link>
        <Link to="/signup">
          <div className="accountContItem">
            <PersonAddSharp />
            Đăng kí
          </div>
        </Link>
      </div>
    );
  };

  const renderLoggedIn = () => {
    return (
      <div className="accountCont">
        <Link to={`/account/${auth.user._id}`}>
          <div className="accountContItem">
            <AccountCircle />
            {auth.user.username}
          </div>
        </Link>
        <Link to="/account/orders">
          <div className="accountContItem">
            <ShoppingBasketSharp />
            Đơn hàng
          </div>
        </Link>
        <Link to="/">
          <div className="accountContItem" onClick={logout}>
            <ExitToApp />
            Đăng xuất
          </div>
        </Link>
      </div>
    );
  };

  const renderCateList = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name} onClick={() => setSubnav(!subnav)}>
          <span>{category.name}</span>
          {category.children ? subnav ? <Remove /> : <Add /> : null}
        </li>
      );
    }
    return myCategories;
  };

  return (
    <div className="header">
      <div className="container">
        <div className="sidebarIcon" onClick={() => setClicked(!clicked)}>
          {clicked ? <CloseOutlined /> : <MenuOutlined />}
        </div>
        <div className="left">
          <Link to={"/"}>
            <div className="logo">Logo</div>
          </Link>
        </div>
        <div className="center">
          <div className="headerSearch">
            <form onSubmit={searchSubmitHandle}>
              <input onChange={(e) => setKeyword(e.target.value)} />
            </form>
            <SearchOutlined style={{ color: "gray" }} />
          </div>
        </div>
        <div className="right">
          <div className="menuIcon">
            <div className="hdIcon">
              <Link to="/cart">
                <Badge
                  badgeContent={Object.keys(cart.cartItems).length}
                  color="secondary"
                >
                  <ShoppingCartOutlined className="rightIcon" />
                </Badge>
              </Link>
            </div>
            <div className="hdIcon">
              <AccountCircleOutlined
                className="accountIcon rightIcon"
                style={{
                  position: "relative",
                }}
              />
              {auth.authenticate ? renderLoggedIn() : renderNonLogin()}
            </div>
            <div className="hdIcon">
              <FavoriteBorderOutlined className="rightIcon" />
            </div>
            <div className="hdIcon">
              <Link to="/support-chat">
                <MessageOutlined className="rightIcon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <nav className={clicked ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <CloseOutlined onClick={() => setClicked(!clicked)} />
          </li>
          <li>
            <div>
              <form className="headerSearch" onSubmit={searchSubmitHandle}>
                <input onChange={(e) => setKeyword(e.target.value)} />
                <button className="searchButton">
                  <SearchOutlined />
                </button>
              </form>
            </div>
          </li>
          <li className="nav-text">Trang chủ</li>
          {/* <li className="nav-text">Thời trang nam</li>
          <li className="nav-text">Thời trang nữ</li>
          <li className="nav-text">Phụ kiện</li>
          <li className="nav-text">Giày dép</li> */}
          {category.categories.length > 0
            ? renderCateList(category.categories)
            : null}
          <li className="nav-text">Về chúng tôi</li>
          <li className="nav-text">Chính sách</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
