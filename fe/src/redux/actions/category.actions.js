import axiosIntance from "../../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
    const res = await axiosIntance.get("/category/getCate");
    if (res.status === 200) {
      const { categoryList } = res.data;

      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
