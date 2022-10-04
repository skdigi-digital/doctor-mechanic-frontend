import { USERS } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  console.log(action.type,"actixxon");
  switch (action.type) {
    case USERS.LOAD:
      return {
        ...state,
        loading: true,
      };
    case USERS.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.users,
        error: "",
      };
    case USERS.LOAD_FAIL:
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
