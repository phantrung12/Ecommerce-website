import axiosIntance from "../../helpers/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axiosIntance.get(`/products/${slug}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    } else {
    }
  };
};

export const getProductsById = (id) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_BY_ID_REQUEST });
    const res = await axiosIntance.get(`/product/${id}`);
    if (res.status === 200) {
      // console.log(res.data);
      dispatch({
        type: productConstants.GET_PRODUCT_BY_ID_SUCCESS,
        payload: { product: res.data.product },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: productConstants.GET_PRODUCT_BY_ID_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const getAllProduct = () => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
    const res = await axiosIntance.post("/products/getAllProduct");
    if (res.status === 200) {
      // console.log(res.data);
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products: res.data.products },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const getProducts = (
  keyword = "",
  currentPage = 1,
  price = [0, 1000000],
  category,
  size,
  color
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_PRODUCTS_REQUEST });
      let link = `/allproducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (size && category && color) {
        link = `/allproducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&size=${size}&color=${color}`;
      } else if (size && category) {
        link = `/allproducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&size=${size}`;
      } else if (category && color) {
        link = `/allproducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&color=${color}`;
      } else if (category) {
        link = `/allproducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }

      const res = await axiosIntance.get(link);
      if (res.status === 200) {
        // console.log(res.data);
        dispatch({
          type: productConstants.GET_PRODUCTS_SUCCESS,
          payload: res.data,
        });
        // console.log(res.data);
      } else {
        console.log(res.error);
      }
    } catch (error) {
      // dispatch({
      //   type: productConstants.GET_PRODUCTS_FAILURE,
      //   payload: error.message,
      // });
      console.log(error);
    }
  };
};

export const addReview = (newReview) => {
  return async (dispatch) => {
    const { productId } = newReview;
    try {
      const res = await axiosIntance.put("/addreview", newReview);
      if (res.status === 200) {
        dispatch(getProductsById(productId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: productConstants.CLEAR_ERRORS });
};
