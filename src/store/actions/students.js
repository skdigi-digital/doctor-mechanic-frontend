import { STUDENTS } from "../constants";

const loadStudents = (students) => ({
  type: STUDENTS.LOAD,
  students,
});

const setStudents = (students) => ({
  type: STUDENTS.LOAD_SUCCESS,
  students,
});

const setError = (error) => ({
  type: STUDENTS.LOAD_FAIL,
  error,
});

export { loadStudents, setStudents, setError };
