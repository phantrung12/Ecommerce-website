import axiosIntance from "../../helpers/axios";
import { userConstants } from "./constants";

export const getAddress = () => {
  return async (dispatch) => {
    try {
      const res = await axiosIntance.post(`/user/getaddress`);
      dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
      if (res.status === 200) {
        const {
          userAddress: { address },
        } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        dispatch({
          type: userConstants.GET_USER_ADDRESS_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAddress = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
      const res = await axiosIntance.post(`/user/address/create`, { payload });
      if (res.status === 200) {
        console.log(res);
        const {
          address: { address },
        } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axiosIntance.post("/addOrder", payload);
      dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });
      if (res.status === 200) {
        const { order } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ORDER_SUCCESS,
          payload: { order },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const res = await axiosIntance.get("/getOrders");
      dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });
      if (res.status === 200) {
        const { orders } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrder = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
      const res = await axiosIntance.post("/getOrder", payload);

      if (res.status === 200) {
        console.log(res);
        const { order } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
          payload: { order },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_USER_INFO_REQUEST });
      const res = await axiosIntance.get(`/getUser/${id}`);
      // console.log(res.data);
      dispatch({
        type: userConstants.GET_USER_INFO_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: userConstants.GET_USER_INFO_FAILURE,
        payload: { error },
      });
      console.log(error);
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const { id } = user;
      // console.log(id);
      dispatch({ type: userConstants.UPDATE_USER_REQUEST });
      const res = await axiosIntance.put(`user/updateUser/${id}`, user);
      if (res.status === 200) {
        dispatch({ type: userConstants.UPDATE_USER_SUCCESS });
        dispatch(getUser(id));
      } else {
        if (res.status === 500) {
          dispatch({
            type: userConstants.UPDATE_USER_SUCCESS,
            payload: res.data.error,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
