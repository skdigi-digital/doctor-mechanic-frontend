import { ADMIN } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {

  console.log("actionssssssss",action.type)
  switch (action.type) {
    case ADMIN.LOAD:
      return {
        ...state,
        loading: true,
      };
    case ADMIN.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.admin,
        error: "",
      };
    case ADMIN.LOAD_FAIL:
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
