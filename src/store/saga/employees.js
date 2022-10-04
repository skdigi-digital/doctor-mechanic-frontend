import { put, call, takeEvery } from "redux-saga/effects";

import { setEmployees, setError } from "../actions/employees";
import { EMPLOYEES } from "../constants";
import { fetchEmployees } from "../api";

export function* handleEmployeesLoad(action) {
  try {
    const employees = yield call(fetchEmployees, action.employees);
    if (employees && employees.error) throw employees.error;
    yield put(setEmployees(employees));
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* watchEmployeesLoad() {
  yield takeEvery(EMPLOYEES.LOAD, handleEmployeesLoad);
}
