import { put, call, takeEvery } from "redux-saga/effects";

import { setExams, setError } from "../actions/exam";
import { EXAMS } from "../constants";
import { fetchExam } from "../api";

export function* handleExamsLoad(action) {
  try {
    const exams = yield call(fetchExam, action.exams);
    if (exams && exams.error) throw exams.error;
    yield put(setExams(exams));
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* watchExamsLoad() {
  yield takeEvery(EXAMS.LOAD, handleExamsLoad);
}
