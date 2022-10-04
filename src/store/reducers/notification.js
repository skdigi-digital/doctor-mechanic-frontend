import { NOTIFICATION } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION.LOAD:
      return {
        ...state,
        loading: true,
      };
    case NOTIFICATION.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.notification,
        error: "",
      };
    case NOTIFICATION.LOAD_FAIL:
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
