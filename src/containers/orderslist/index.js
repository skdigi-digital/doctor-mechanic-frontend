import React, { Component } from "react";
import { connect } from "react-redux";
import Datatable from "../../components/datatable";
import { loadOrders } from "../../store/actions/orders";
import { vendorlogin } from "../../store/api";
// import DeleteModal from "../../components/deletemodal/deleteModal";
// import axios from "axios";
// import { deleteNotificationApi } from "../../constant";
const headers = [
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Model",
  },

  {
    id: "brand",
    numeric: false,
    disablePadding: false,
    label: "Brand",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
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
    };
  }

  componentDidMount() {
    const { getService, Login, Vendorlogin } = this.props;
   
    if (Vendorlogin.data.status === 200) {
      getService({ token: Vendorlogin.data.token });
      console.log(Login.data,"werw");
    } else if (Login.data.response.status === 200) {
      getService({ token: Login.data.response.token });
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
    const { Orders } = this.props;
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
          name="Orders"
          headCell={headers}
          data={Orders.data}
          handleButtonClick={this.ordersClick}
          selectEmpty={selectBol}
          handleSelectEmpty={(value) => this.setState({ selectBol: value })}
          displayaddbutton={display}
        />

        {/* <Servicedetails
          openModel={open}
          handleModelClose={this.handleModal}
          selected={selected}
        /> */}
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

const mapStateToProps = ({ Orders, Login, Vendorlogin }) => ({
  Orders,
  Login,
  Vendorlogin,
});

const mapDispatchToProps = (dispatch) => ({
  getService: (object) => dispatch(loadOrders(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginUsers);
