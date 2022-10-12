import Dealerdetails from "./Dealerdeatils";
import React, { Component } from "react";
import { connect } from "react-redux";
import Datatable from "../../components/datatable";
import { loadDealer } from "../../store/actions/dealer";
import DeleteModal from "../../components/deletemodal/deleteModal";
import axios from "axios";
import { deletedealer } from "../../constant";
const headers = [
  {
    id: "first_name",
    numeric: false,
    disablePadding: true,
    label: "First_Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },

  {
    id: "state",
    numeric: false,
    disablePadding: true,
    label: "State",
  },
  
  {
    id: "city",
    numeric: false,
    disablePadding: true,
    label: "City",
  },
];
const display = "visible";
export class Dealer extends Component {
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
    const { getDealer, Vendorlogin } = this.props;
    if (Vendorlogin.data.status === 200) {
    getDealer({ token: Vendorlogin.data.token });
    }
    console.log("Im the token",Vendorlogin.data.token);
  }
  componentDidUpdate()
  {
    const {errorType} = this.state;
    const {getDealer,Vendorlogin} = this.props;
    if(errorType != ""){
        getDealer({token: Vendorlogin.data.token});
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
      const { Vendorlogin } = this.props;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        token: Vendorlogin.data.token,
      };

      const notification = {
        dealer_id: this.state.selected[0],
      };
      
      const data = Object.keys(notification)
        .map((key) => `${key}=${encodeURIComponent(notification[key])}`)
        .join("&");

      const notificationDelete = await axios({
        method: "delete",
        url: deletedealer,
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
        message: "Error!, Please contact your Administrator!!",
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
    const { Dealer } = this.props;
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
    return (
      <div style={{ marginTop: 30 }}>
        <Datatable
          name="Dealer"
          headCell={headers}
          data={Dealer.data}
          handleButtonClick={this.ordersClick}
          selectEmpty={selectBol}
          handleSelectEmpty={(value) => this.setState({ selectBol: value })}
          displayaddbutton={display}
        />

        <Dealerdetails
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

const mapStateToProps = ({ Dealer, Login,Vendorlogin }) => ({
    Dealer,
    Vendorlogin,
    Login,
});

const mapDispatchToProps = (dispatch) => ({
  getDealer: (object) => dispatch(loadDealer(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dealer);
