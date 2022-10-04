import { put, call, takeEvery } from "redux-saga/effects";

import { setUsers, setError } from "../actions/users";
import { USERS } from "../constants";
import { fetchUsers } from "../api";

export function* handleUsersLoad(action) {
  try {
    console.log("action users",action.users)
    const users = yield call(fetchUsers, action.users);
    if (users && users.error) throw users.error;
    yield put(setUsers(users));
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* watchUsersLoad() {
  yield takeEvery(USERS.LOAD, handleUsersLoad);
}
