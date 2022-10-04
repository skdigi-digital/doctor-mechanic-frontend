import { EXAMS } from "../constants";

const loadExams = (exams) => ({
  type: EXAMS.LOAD,
  exams,
});

const setExams = (exams) => ({
  type: EXAMS.LOAD_SUCCESS,
  exams,
});

const setError = (error) => ({
  type: EXAMS.LOAD_FAIL,
  error,
});

export { loadExams, setExams, setError };
