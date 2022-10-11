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
import { loadCourse } from "../../store/actions/course";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
// web.cjs is required for IE11 support
import { useSpring, animated } from "react-spring";
import { adduserApi } from "../../constant";
import { loadAdmin } from "../../store/actions/admin";

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

function Admindetails(props) {
  const [adminObject, setAdminObject] = React.useState({
    Email_ID: "",
    Password: "",
    Phone_Number: "",
    First_Name: "",
    Last_Name: "",
    City: "",
    Location: "",
    Address: "",
  });
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [errorType, setErrorType] = React.useState("");
  const [message, setMessage] = React.useState("");

  const { openModel, handleModelClose, getAdmin, Login } = props;
  const vertical = "bottom";
  const horizontal = "center";
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (name, event) => {
    setAdminObject({ ...adminObject, [name]: event.target.value });
  };

  const handleSave = async () => {
    setBackdropOpen(true);
    const headers = {
      "Content-Type": "application/json",
      token: Login.data.token,
    };
    const dataObject = {
      firstName: adminObject.firstName,
      lastName: adminObject.lastName,
      userType: adminObject.userType,
      roles: adminObject.roles,
      phoneNumber: adminObject.phoneNumber,
      email: adminObject.email,
      password: adminObject.password,
    };
    // console.log(adminObject);

    try {
      const addEmployee = await axios({
        method: "post",
        url: adduserApi,
        data: dataObject,
        headers: headers,
      });

      if (addEmployee.data.status === 200) {
        getAdmin({ token: Login.data.token });
        setBackdropOpen(false);
        handleClose();
        setErrorType("success");
        setMessage(addEmployee.data.message);
        setAlert(true);
      } else if (addEmployee.data.status === 401) {
        setBackdropOpen(false);
        handleClose();
        setErrorType("error");
        setMessage(addEmployee.data.message);
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
  };

  // console.log(adminObject);

  const handleClose = () => {
    handleModelClose(false);
    setAdminObject({
      Email_ID: "",
      Password: "",
      Phone_Number: "",
      First_Name: "",
      Last_Name: "",
      City: "",
      Location: "",
      Address: "",
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
            Admin Details
          </BootstrapDialogTitle>
          <DialogContent>
            <Box style={{ margin: 10 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  {/* City: "", : "", Address: "", */}
                  <TextField
                    id="outlined-textarea"
                    label="First Name"
                    placeholder="Enter First Name"
                    multiline
                    fullWidth
                    value={setAdminObject.First_Name}
                    onChange={(e) => handleChange("First_Name", e)}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Email"
                    placeholder="Enter Email"
                    multiline
                    fullWidth
                    value={setAdminObject.Email_ID}
                    onChange={(e) => handleChange("Email_ID", e)}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Phone Number"
                    placeholder="Enter Phone Number"
                    multiline
                    fullWidth
                    value={setAdminObject.Phone_Number}
                    onChange={(e) => handleChange("Phone_Number", e)}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Address"
                    placeholder="Enter Address"
                    multiline
                    fullWidth
                    rows={4.4}
                    value={setAdminObject.Address}
                    onChange={(e) => handleChange("Address", e)}
                    style={{ margin: 10 }}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="outlined-textarea"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    multiline
                    fullWidth
                    value={setAdminObject.Last_Name}
                    onChange={(e) => handleChange("Last_Name", e)}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Password"
                    placeholder="Enter Password"
                    multiline
                    fullWidth
                    value={setAdminObject.Password}
                    onChange={(e) => handleChange("Password", e)}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="City"
                    placeholder="Enter City"
                    multiline
                    fullWidth
                    value={setAdminObject.City}
                    onChange={(e) => handleChange("City", e)}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Location"
                    placeholder="Enter Location"
                    multiline
                    fullWidth
                    value={setAdminObject.Location}
                    onChange={(e) => handleChange("Location", e)}
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

const mapStateToProps = ({ Login, Admin }) => ({ Login, Admin });

const mapDispatchToProps = (dispatch) => ({
  getAdmin: (object) => dispatch(loadAdmin(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admindetails);
