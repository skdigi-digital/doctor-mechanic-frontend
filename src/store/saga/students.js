import { put, call, takeEvery } from "redux-saga/effects";

import { setStudents, setError } from "../actions/students";
import { STUDENTS } from "../constants";
import { fetchStudents } from "../api";

export function* handleStudentsLoad(action) {
  try {
    const students = yield call(fetchStudents, action.students);
    if (students && students.error) throw students.error;
    yield put(setStudents(students));
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* watchStudentsLoad() {
  yield takeEvery(STUDENTS.LOAD, handleStudentsLoad);
}
