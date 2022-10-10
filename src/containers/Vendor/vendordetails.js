import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import DialogActions from "@mui/material/DialogActions";
import { InputLabel } from "@mui/material";
import {
  styled,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { connect } from "react-redux";
import { loadVendors } from "../../store/actions/vendorlist";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// web.cjs is required for IE11 support
import { useSpring, animated } from "react-spring";
import { addvendorlist, updatevendorlist, image } from "../../constant";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {/* {onClose ? ( */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      {/* ) : null} */}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Vendordetails(props) {

  const [vendorObject, setVendorObject] = React.useState({
    image: "",
    state: "",
    phone: "",
    name: "",
    city: "",
    address: "",
    pincode: "",
  });
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [errorType, setErrorType] = React.useState("");
  const [message, setMessage] = React.useState("");

  const {
    openModel,
    handleModelClose,
    getVendor,
    Login,
    Vendorlist,
    selected,
  } = props;
  const vertical = "bottom";
  const horizontal = "center";
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    Vendorlist.data.map((it) => {
      if (it._id === selected[0]) {
        setVendorObject(it);
      }
    });
  }, [Vendorlist, selected]);

  const handleChange = (name, event) => {
    setVendorObject({ ...vendorObject, [name]: event.target.value });
  };

  const handleSave = async () => {
    setBackdropOpen(true);
    if (vendorObject._id) {
      try {
        const headers = {
          "Content-Type": "application/json",
          token: Login.data.response.token,

        };
        console.log("Vendorid", vendorObject._id)
        const dataObject = {
          email: vendorObject.email,
          pincode: vendorObject.pincode,
          phone: vendorObject.phone,
          name: vendorObject.name,
          state: vendorObject.state,
          city: vendorObject.city,
          address: vendorObject.address,
          id:vendorObject._id,
        };

        const editVendor = await axios({
          method: "put",
          url: updatevendorlist,
          data: dataObject,
          headers: headers,

        });
        if (editVendor.data.status === 200) {
          getVendor({ token: Login.data.response.token });
          setBackdropOpen(false);
          handleClose();
          setErrorType("success");
          setMessage(editVendor.data.message);
          setAlert(true);
        } else if (editVendor.data.status === 401) {
          setBackdropOpen(false);
          handleClose();
          setErrorType("error");
          setMessage(editVendor.data.message);
          setAlert(true);
        }
        else if (editVendor.data.status === 201) {
          setBackdropOpen(false);
          handleClose();
          setErrorType("error");
          setMessage(editVendor.data.message);
          setAlert(true);
        } else {
          setBackdropOpen(false);
          setErrorType("error");
          setMessage("Error!, Please contact your Administrator!!");
          setAlert(true);
        }
      } catch (error) {
        setBackdropOpen(false);
        setErrorType("error");
        setMessage(error.response.data.message);
        setAlert(true);
      }
    } else {
      try {
        const headers = {
          "Content-Type": "application/json",
          token: Login.data.token,
        };
        const dataObject = {
          email: vendorObject.email,
          pincode: vendorObject.pincode,
          phone: vendorObject.phone,
          name: vendorObject.name,
          password: vendorObject.password,
          state: vendorObject.state,
          city: vendorObject.city,
          address: vendorObject.address,
          image: vendorObject.patient_image,
        };
        const addvendor = await axios({
          method: "post",
          url: addvendorlist,
          data: dataObject,
          headers: headers,
        });

        if (addvendor.data.status === 201) {
          getVendor({ token: Login.data.response.token });
          setBackdropOpen(false);
          handleClose();
          setErrorType("success");
          setMessage(addvendor.data.message);
          setAlert(true);
        } else if (addvendor.data.status === 401) {
          setBackdropOpen(false);
          handleClose();
          setErrorType("error");
          setMessage(addvendor.data.message);
          setAlert(true);
        } else {
          setBackdropOpen(false);
          setErrorType("error");
          setMessage("Error!, Please contact your Administrator!!");
          setAlert(true);
        }
      } catch (error) {
        setBackdropOpen(false);
        setErrorType("error");
        setMessage(error.response.data.message);
        setAlert(true);
      }
    }
  };
  const onImageUpload = async (event) => {
    setBackdropOpen(true);
    let files = Object.values(event.target.files);
    if (files[0] && files[0].size > 1000000) {
      setErrorType("error");
      setMessage("This image size is more than 1mb.");
      setAlert(true);
      setBackdropOpen(false);
    } else {
      let bodyFormData = new FormData();
      bodyFormData.append("multiple_images", files[0]);
      // bodyFormData.getAll("multiple_images")
      try {
        let imageUpload = await axios({
          method: "post",
          url: image, //"http://107.180.105.183:8445/uploadimage",
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (!imageUpload)
          throw "Unable to Lists from database. API error, try again";
        if (200 === imageUpload.status) {
          console.log(imageUpload);
          let splitArray = imageUpload.data.split(",");
          let url = splitArray[0];
          console.log(url);
          setVendorObject({ ...vendorObject, patient_image: url });
          setBackdropOpen(false);
        }
        if (502 === imageUpload.status)
          throw "Server Error. Please reload and try again!!";
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleClose = () => {
    handleModelClose(false);
    setVendorObject({
      email: "",
      password: "",
      image: "",
      state: "",
      phone: "",
      name: "",
      city: "",
      address: "",
      pincode: "",
    });
  };

  const themeColor = createTheme({
    palette: {
      neutral: {
        main: "#424242",
        contrastText: "#fff",
      },
    },
  });

  return (
    <div>
      <BootstrapDialog
        fullWidth
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openModel}
        maxWidth="md"
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        fullScreen={fullScreen}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModel}>
          <BootstrapDialogTitle onClose={handleClose}>
            Vendor Details
          </BootstrapDialogTitle>

          <DialogContent>
            <Box style={{ margin: 10 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="outlined-textarea"
                    label="Name"
                    placeholder="Enter Name"
                    multiline
                    fullWidth
                    value={vendorObject.name}
                    onChange={(e) => handleChange("name", e)}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Address"
                    placeholder="Enter Address"
                    multiline
                    fullWidth
                    rows={4.4}
                    value={vendorObject.address}
                    onChange={(e) => handleChange("address", e)}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Pincode"
                    placeholder="Enter Pincode"
                    fullWidth
                    value={vendorObject.pincode}
                    onChange={(e) => handleChange("pincode", e)}
                    style={{ margin: 10 }}
                  />
                  <input
                    style={{
                      marginTop: 15,
                      marginLeft: 10,
                    }}
                    type="file"
                    accept="image/*"
                    onChange={(evt) => onImageUpload(evt)}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="outlined-textarea"
                    label="Phone number"
                    placeholder="Enter Phone number"
                    multiline
                    fullWidth
                    value={vendorObject.phone}
                    onChange={(e) => handleChange("phone", e)}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="State"
                    placeholder="Enter state"
                    multiline
                    fullWidth
                    value={vendorObject.state}
                    onChange={(e) => handleChange("state", e)}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="city"
                    placeholder="Enter city"
                    multiline
                    fullWidth
                    value={vendorObject.city}
                    onChange={(e) => handleChange("city", e)}
                    style={{ margin: 10 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <ThemeProvider theme={themeColor}>
              <Button onClick={handleClose} variant="contained" color="neutral">
                Close
              </Button>
            </ThemeProvider>
            <Button
              onClick={handleSave}
              autoFocus
              variant="contained"
              color="success"
            >
              Save
            </Button>
          </DialogActions>
          <Backdrop
            // sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 3 }}
            open={backdropOpen}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Fade>
      </BootstrapDialog>

      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={() => setAlert(false)} severity={errorType}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = ({ Login, Vendorlist }) => ({
  Login,
  Vendorlist,
});

const mapDispatchToProps = (dispatch) => ({
  getVendor: (object) => dispatch(loadVendors(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Vendordetails);
