import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AcountPage from "./pages/AccountPage/AcountPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import Homepage from "./pages/HomePage/Homepage";
import Login from "./pages/Login/Login";
import OrdersPage from "./pages/OdersPage/OrdersPage";
import OrderDetail from "./pages/OrderDetailPage/OrderDetail";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductsList from "./pages/ProductsList/ProductsList";
import Signup from "./pages/Signup/Signup";
import SupportChat from "./pages/SupportChat/SupportChat";
import { isUserLoggedIn } from "./redux/actions/auth.actions";
import { updateCart } from "./redux/actions/cart.actions";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/products/:slug">
            <ProductsList />
          </Route>
          <Route path="/products/getallproduct">
            <ProductsList />
          </Route>
          <Route exact path="/allproducts" component={ProductListPage} />
          <Route
            exact
            path="/allproducts/:keyword"
            component={ProductListPage}
          />
          <Route
            exact
            path="/allproductsByCate/:cateId"
            component={ProductListPage}
          />
          <Route exact path="/product/:id">
            <ProductPage />
          </Route>
          <Route path="/checkout">
            <CheckoutPage />
          </Route>
          <Route path="/account/orders">
            <OrdersPage />
          </Route>
          <Route path="/order_details/:orderId" component={OrderDetail} />
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/support-chat" component={SupportChat} />
          <Route path="/account">
            {auth.authenticate ? <AcountPage /> : <Login />}
          </Route>
          <Route path="/login">
            {auth.authenticate ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/signup">
            {auth.authenticate ? <Redirect to="/" /> : <Signup />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
