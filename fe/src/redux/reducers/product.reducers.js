import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  productsByPrice: {
    under100k: [],
    under500k: [],
    under1000k: [],
  },
  productDetail: {},
  loading: false,
  error: false,
  productsCount: 0,
  resultPerPage: 0,
  filteredProductsCount: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      };
      break;

    case productConstants.GET_ALL_PRODUCTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;

    case productConstants.GET_ALL_PRODUCTS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case productConstants.GET_PRODUCT_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case productConstants.GET_PRODUCT_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        productDetail: action.payload.product,
      };
      break;

    case productConstants.GET_PRODUCT_BY_ID_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case productConstants.GET_PRODUCTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_PRODUCTS_SUCCESS:
      // console.log(action.payload);
      state = {
        ...state,
        loading: false,
        products: action.payload.productList,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
      break;
    case productConstants.GET_PRODUCTS_FAILURE:
    case productConstants.CLEAR_ERRORS:
      state = {
        ...state,
        error: null,
      };
  }
  return state;
};
