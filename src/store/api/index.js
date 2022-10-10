import axios from "axios";
import {
  studentsListApi,
  employeesListApi,
  coursesListApi,
  examListApi,
  loginUrl,
  vendorlist,
  vendorloginUrl,
  usersListApi,
  notificationLsitApi,
  servicelist,
  orderslist,
} from "../../constant.js";
import moment from "moment";
import { Login } from "@mui/icons-material";

const login = async (user) => {
  const headers = {
    "Content-Type": "application/json",
   
  };
  const email = user.email;
  const password = user.password;

  try {
    const logindata = await axios.post(
      loginUrl,
      {
        email: email,
        password: password,
        user_type:2,
      },
      { headers: headers }
    );
    console.log("login data",logindata);
    return logindata.data;
  } catch (error) {
    console.log(error);
  }
};
const vendorlogin = async (users) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const email = users.email;
  const password = users.password;

  try {
    const vendorlogindata = await axios.post(
      vendorloginUrl,
      {
        email: email,
        password: password,
      },
      { headers: headers }
    );
    return vendorlogindata.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchStudents = async (token) => {
  const headers = {
    "Content-Type": "application/json",
    authorization: "Bearer " + token.token,
  };
  try {
    const StudentsApi = await axios.get(studentsListApi, {
      headers: headers,
    });
    
    let Students = await StudentsApi.data.data;
    return Students;
  } catch (error) {
    const data = {
      error: "",
    };
    data.error = error.response.data;
    return data;
  }
};

const fetchEmployees = async (token) => {
  const headers = {
      "Content-Type": "application/json",
      token:  token.token,
  };
  try {
    const employeesApi = await axios.get(employeesListApi, {
      headers: headers,
    });

    employeesApi.data.data.map((it) => {
      return (it.createddt = moment(it.createddt).format("DD MMM YYYY"));
    });

    let employees = await employeesApi.data.data;
    return employees;
  } catch (error) {
    const data = {
      error: "",
    };
    data.error = error.response.data;
    return data;
  }
};

const fetchCourse = async (token) => {
  console.log(token);
  const headers = {
    "Content-Type": "application/json",
    authorization: "Bearer " + token.token,
  };
  try {
    const coursesApi = await axios.get(coursesListApi, {
      headers: headers,
    });

    coursesApi.data.data.map((it) => {
      return (it.createddt = moment(it.createddt).format("DD MMM YYYY"));
    });

    let courses = await coursesApi.data.data;
    return courses;
  } catch (error) {
    const data = {
      error: "",
    };
    data.error = error.response.data;
    return data;
  }
};

const fetchExam = async (token) => {
  const headers = {
    "Content-Type": "application/json",
    authorization: "Bearer " + token.token,
  };
  try {
    const examsApi = await axios.get(examListApi, {
      headers: headers,
    });

    examsApi.data.data.map((it) => {
      return (it.createddt = moment(it.createddt).format("DD MMM YYYY"));
    });

    let exams = await examsApi.data.data;
    return exams;
  } catch (error) {
    const data = {
      error: "",
    };
    data.error = error.response.data;
    return data;
  }
};
const fetchUsers = async (token) => {
  console.log("token",token.token)
  // const params = new ([["user_type",3]]);
  const headers = {
    "Content-Type": "application/json",
    token:  token.token,
   };
  try {
    const usersApi = await axios.get(usersListApi, {
      headers: headers,
      params:{
        user_type:"2"
      }
    });
   
    usersApi.data.data.map((it) => {
      return (it.createddt = moment(it.createddt).format("DD MMM YYYY"));
    });

    let users = await usersApi.data.data;
    return users;
  } catch (error) {
    const data = {
      error: "",
    };
    data.error = error.response.data;
    return data;
  }
};
const fetchVendors = async (token) => {
  const headers = {
    "Content-Type": "application/json",
    token: token.token,
  };
  try {
    const vendorsApi = await axios.get(vendorlist, {
      headers: headers,
    });

    vendorsApi.data.data.map((it) => {
      return (it.createddt = moment(it.createddt).format("DD MMM YYYY"));
    });

    let vendors = await vendorsApi.data.data;
    return vendors;
  } catch (error) {
    const data = {
      error: "",
    };
    data.error = error.response.data;
    return data;
  }
};
const fetchService = async (token) => {

  const headers = {
    "Content-Type": "application/json",
    token: token.token,
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Credentials":true,
  };
  try {
    const serviceApi = await axios.get(servicelist, {
      headers: headers,
    });

    serviceApi.data.data.map((it) => {
      return (it.createddt = moment(it.createddt).format("DD MMM YYYY"));
    });

    let service = await serviceApi.data.data;
    return service;
  } catch (error) {
    const data = {
      error: "",
    };
    data.error = error.response.data;
    return data;
  }
};
const fetchOrders = async (token) => {
  const headers = {
    "Content-Type": "application/json",
    token: token.token,
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Credentials":true,
  };
  try {
    
    const ordersApi = await axios.get(orderslist, {
      headers: headers,
    });
    console.log(ordersApi,"ordersapi");
    ordersApi.data.data.map((it) => {
      return (it.createddt = moment(it.createddt).format("DD MMM YYYY"));
    });

    let orders = await ordersApi.data.data;
    return orders;
  } catch (error) {
    const data = {
      error: "",
    };
    data.error = error.response.data;
    return data;
  }
};
const fetchNotification = async (token) => {
  const headers = {
    "Content-Type": "application/json",
    token: token.token,
  };
  try {
    const notificationApi = await axios.get(notificationLsitApi, {
      headers: headers,
    });

    notificationApi.data.data.map((it) => {
      return (it.createddt = moment(it.createddt).format("DD MMM YYYY"));
    });

    let notification = await notificationApi.data.data;
    return notification;
  } catch (error) {
    const data = {
      error: "",
    };
    data.error = error.response.data;
    return data;
  }
};

export {
  login,
  fetchStudents,
  fetchEmployees,
  fetchCourse,
  fetchExam,
  fetchUsers,
  vendorlogin,
  fetchVendors,
  fetchService,
  fetchNotification,
  fetchOrders,
};
