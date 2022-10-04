import { VENDORLOGIN } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  // console.log(action.type)
  switch (action.type) {
    case VENDORLOGIN.LOAD:
      return {
        ...state,
        loading: true,
      };
    case VENDORLOGIN.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.vendorlogin,
        error: "",
      };
    case VENDORLOGIN.LOAD_FAIL:
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
