import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import cartReducers from "./cart.reducers";
import categoryReducers from "./category.reducers";
import productReducers from "./product.reducers";
import userReducers from "./user.reducers";

const rootReducer = combineReducers({
  user: userReducers,
  cart: cartReducers,
  auth: authReducers,
  category: categoryReducers,
  product: productReducers,
});

export default rootReducer;
