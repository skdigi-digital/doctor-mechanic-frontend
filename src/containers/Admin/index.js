import Admindetails from "./adminmodel";
import React, { Component } from "react";
import { connect } from "react-redux";
import Datatable from "../../components/datatable";
import { loadEmployees } from "../../store/actions/employees";
// import DeleteModal from "../../components/deletemodal/deleteModal";
// import axios from "axios";
// import { deleteNotificationApi } from "../../constant";
const headers = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "lastName",
    numeric: false,
    disablePadding: true,
    label: "Description",
  },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "phoneNumber",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "email",
  },
];

export class LoginUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      edit: false,
      del: false,
      open: false,
      deleteModal: false,
      deleteBackdrop: false,
      errorType: "",
      message: "",
      alert: false,
      selectedName: "",
      selected: [],
      selectBol: false,
    };
  }

  componentDidMount() {
    const { getEmployees, Login } = this.props;
    console.log("propss",this.props); 
    console.log(Login.data.token);
    getEmployees({ token: Login.data.token });
  }

  ordersClick = (value, selected, name) => {
    this.setState({ [value]: true }, () => {
      if (value === "add") {
        this.setState({ open: true });
      } else if (value === "edit") {
        this.setState({ open: true, selected: selected });
      } else {
        this.setState({
          deleteModal: true,
          selected: selected,
          selectedName: name,
        });
      }
    });
  };
  // deletenotification = async () => {
  //   this.setState({ deleteBackdrop: true });
  //   try {
  //     const { Login, getNotificationsList } = this.props;
  //     const headers = {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       token: Login.data.token,
  //     };

  //     const notification = {
  //       notification_id: this.state.selected[0],
  //     };

  //     const data = Object.keys(notification)
  //       .map((key) => `${key}=${encodeURIComponent(notification[key])}`)
  //       .join("&");

  //     const notificationDelete = await axios({
  //       method: "post",
  //       url: deleteNotificationApi,
  //       data: data,
  //       headers: headers,
  //     });
  //     if (notificationDelete.data.status === 200) {
  //       this.setState({
  //         deleteBackdrop: false,
  //         errorType: "success",
  //         message: notificationDelete.data.message,
  //         alert: true,
  //       });
  //       getNotificationsList({ token: Login.data.token });
  //       this.handleDeleteModal(false);
  //     } else if (
  //       notificationDelete.data.status === 201 ||
  //       notificationDelete.data.status === 500
  //     ) {
  //       this.setState({
  //         deleteBackdrop: false,
  //         errorType: "error",
  //         message: notificationDelete.data.message,
  //         alert: true,
  //       });
  //     } else {
  //       this.setState({
  //         deleteBackdrop: false,
  //         errorType: "error",
  //         message: "Error!, Please contact your Administrator!!",
  //         alert: true,
  //       });
  //     }
  //   } catch (error) {
  //     this.setState({
  //       deleteBackdrop: false,
  //       errorType: "error",
  //       message: "Error!, Please contact your Administrator!!",
  //       alert: true,
  //     });
  //   }
  // };
  handleModal = (value) => {
    this.setState({ open: value }, () => {
      if (this.state.open === false) {
        this.setState({ selectBol: value, selected: [] });
      }
    });
  };
  handleBackdrop = (value) => {
    this.setState({ deleteBackdrop: value });
  };

  handlealert = (value) => {
    this.setState({ alert: value });
  };

  handleDeleteModal = (value) => {
    this.setState({ deleteModal: value }, () => {
      if (this.state.deleteModal === false) {
        this.setState({ selectBol: value, selected: [] });
      }
    });
  };

  render() {
    const { Employees } = this.props;
    const {
      open,
      selected,
      deleteModal,
      selectedName,
      deleteBackdrop,
      alert,
      message,
      errorType,
      selectBol,
    } = this.state;
    return (
      <div style={{ marginTop: 30 }}>
        <Datatable
          name="Admin"
          headCell={headers}
          data={Employees.data}
          handleButtonClick={this.ordersClick}
          selectEmpty={selectBol}
          handleSelectEmpty={(value) => this.setState({ selectBol: value })}
        />
        {console.log("here we are")}

        <Admindetails
          openModel={open}
          handleModelClose={this.handleModal}
          selected={selected}
        />
        {/* <DeleteModal
          openModal={deleteModal}
          name={selectedName}
          backdropOpen={deleteBackdrop}
          handledelete={this.deletenotification}
          handleCloseModal={this.handleDeleteModal}
          handleBackdrop={this.handleBackdrop}
          handleAlert={this.handlealert}
          errorType={errorType}
          message={message}
          alert={alert}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ Employees, Login }) => ({
  Employees,
  Login,
});

const mapDispatchToProps = (dispatch) => ({
  getEmployees: (object) => dispatch(loadEmployees(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginUsers);
