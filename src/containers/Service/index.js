import Servicedetails from "./Servicedetails";
import React, { Component } from "react";
import { connect } from "react-redux";
import Datatable from "../../components/datatable";
import { loadService } from "../../store/actions/service";
import DeleteModal from "../../components/deletemodal/deleteModal";
import axios from "axios";
import { deleteservice } from "../../constant";
const headers = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "name",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "description",
  },

  {
    id: "tax",
    numeric: false,
    disablePadding: true,
    label: "tax",
  },
  
  {
    id: "estimated_cost",
    numeric: false,
    disablePadding: true,
    label: "Estimated Cost",
  },
];
const display = "visible";
export class Services extends Component {
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
    const { getService, Login, Vendorlogin } = this.props;
    if (Vendorlogin.data.status === 200) {
      getService({ token: Vendorlogin.data.token });
    } else if (Login.data.response.status === 200) {
      getService({ token: Login.data.response.token });
    }
    console.log("Im the token",Login.data.response.token);
  }
  componentDidUpdate()
  {
    const {errorType} = this.state;
    const {getService,Login} = this.props;
    if(errorType != ""){
    getService({token: Login.data.response.token});
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
        service_id: this.state.selected[0],
      };
      
      const data = Object.keys(notification)
        .map((key) => `${key}=${encodeURIComponent(notification[key])}`)
        .join("&");

      const notificationDelete = await axios({
        method: "delete",
        url: deleteservice,
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
    const { Servicelist } = this.props;
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
          name="Service"
          headCell={headers}
          data={Servicelist.data}
          handleButtonClick={this.ordersClick}
          selectEmpty={selectBol}
          handleSelectEmpty={(value) => this.setState({ selectBol: value })}
          displayaddbutton={display}
        />

        <Servicedetails
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

const mapStateToProps = ({ Servicelist, Login,Vendorlogin }) => ({
  Servicelist,
  Vendorlogin,
  Login,
});

const mapDispatchToProps = (dispatch) => ({
  getService: (object) => dispatch(loadService(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Services);
