import { VENDORS } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case VENDORS.LOAD:
      return {
        ...state,
        loading: true,
      };
    case VENDORS.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.vendors,
        error: "",
      };
    case VENDORS.LOAD_FAIL:
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
