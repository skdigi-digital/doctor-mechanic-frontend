import Userdetails from "./Usersdetails";
import React, { Component } from "react";
import { connect } from "react-redux";
import Datatable from "../../components/datatable";
import { loadUsers } from "../../store/actions/users";
import DeleteModal from "../../components/deletemodal/deleteModal";
import axios from "axios";
import { deleteNotificationApi } from "../../constant";
const headers = [
  {
    id: "first_name",
    numeric: false,
    disablePadding: true,
    label: "First_Name",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: true,
    label: "Phone",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: " Email",
  },
];
const display = "visible";
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
      token:"",
    };
  }

  componentDidMount() {
    const { getUser, Login } = this.props;
    getUser({ token: Login.data.response.token });
    this.setState({token:Login.data.response.token })
  }
  componentDidUpdate()
  {
    const {errorType} = this.state;
    const {getUser,Login} = this.props;
    if(errorType != ""){
    getUser({token: Login.data.response.token});
    this.setState({errorType: ""})
    }
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
  deletenotification = async () => {
    this.setState({ deleteBackdrop: true });
    try {
      const { Login } = this.props;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        token: Login.data.response.token,
      };
      const notification = {
        customer_id: this.state.selected[0],
      };
      const data = Object.keys(notification)
        .map((key) => `${key}=${encodeURIComponent(notification[key])}`)
        .join("&");

      const notificationDelete = await axios({
        method: "delete",
        url: deleteNotificationApi,
        data: data,
        headers: headers,
      });

      if (notificationDelete.data.status === 200) {
        this.setState({
          deleteBackdrop: false,
          errorType: "success",
          message: notificationDelete.data.message,
          alert: true,
        });
        //getNotificationsList({ token: Login.data.response.token });
        this.handleDeleteModal(false);
      } else if (
        notificationDelete.data.status === 201 ||
        notificationDelete.data.status === 500
      ) {
        this.setState({
          deleteBackdrop: false,
          errorType: "error",
          message: notificationDelete.data.message,
          alert: true,
        });
      } else {
        this.setState({
          deleteBackdrop: false,
          errorType: "error",
          message: "Error!, Please contact your Administrator!!",
          alert: true,
        });
      }
    } catch (error) {
      this.setState({
        deleteBackdrop: false,
        errorType: "error",
        message: "Error!, Please contact your Administrator!!" + error,
        alert: true,
      });
    }
  };
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
    const { Users } = this.props;
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
      token,
    } = this.state;
    console.log("Vendorlist",this.props)
    return (
      <div style={{ marginTop: 30 }}>
        <Datatable
          name="Users"
          headCell={headers}
          data={Users.data}
          handleButtonClick={this.ordersClick}
          selectEmpty={selectBol}
          handleSelectEmpty={(value) => this.setState({ selectBol: value })}
          displayaddbutton={display}
        />

         <Userdetails
          openModel={open}
          handleModelClose={this.handleModal}
          selected={selected}
          token={token}
        />  
        <DeleteModal
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
        />
      </div>
    );
  }
}

const mapStateToProps = ({ Users, Login }) => ({
  Users,
  Login,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (object) => dispatch(loadUsers(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginUsers);
