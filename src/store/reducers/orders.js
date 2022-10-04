import { ORDERS } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERS.LOAD:
      return {
        ...state,
        loading: true,
      };
    case ORDERS.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.orders,
        error: "",
      };
    case ORDERS.LOAD_FAIL:
      return {
        loading: false,
        data: [],
        error: action.error,
      };
    default:
      return state;
  }
};
export default reducer;
