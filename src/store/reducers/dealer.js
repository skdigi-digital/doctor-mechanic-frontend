import { DEALER } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
    case DEALER.LOAD:
      return {
        ...state,
        loading: true,
      };
    case DEALER.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.dealer,
        error: "",
      };
    case DEALER.LOAD_FAIL:
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
