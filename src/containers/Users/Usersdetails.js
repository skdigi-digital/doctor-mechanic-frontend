import React, { useEffect,useState } from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { loadUsers } from "../../store/actions/users";
// import { loadExams } from "../../store/actions/exam";
import DialogActions from "@mui/material/DialogActions";
import { FormControl, InputLabel,InputAdornment } from "@mui/material";
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

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
// web.cjs is required for IE11 support
import { useSpring, animated } from "react-spring";

import { createUser, updateUser } from "../../constant";

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

function Examdetails(props) {
  const [usersObject, setUsersObject] = React.useState({
    email: "",
    password: "",
    phone: "",
    first_name: "",
    last_name: "",
    showPassword: false,
  });

  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [errorType, setErrorType] = React.useState("");
  const [message, setMessage] = React.useState("");
  const {
    openModel,
    handleModelClose,
    getUsersList,
    Vendorlogin,
    selected,
    Users,
    token,

  } = props;
  console.log("Im inside the delete button",props)


  const vertical = "bottom";
  const horizontal = "center";
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    Users.data.map((it) => {
      if (it._id === selected[0]) {
        setUsersObject(it);
      }
    });
  }, [Users, selected]);

  const handleSave = async () => {
    setBackdropOpen(true);

    if (usersObject._id) {

      const dataObject = {
        email: usersObject.email,
        password: usersObject.password,
        phone: usersObject.phone,
        first_name: usersObject.first_name,
        last_name: usersObject.last_name,
        addresses: usersObject.addresses,

      };

      const headers = {
        "Content-Type": "application/json",
        token: token,


      };
      try {
        const edituser = await axios({
          method: "put",
          url: updateUser + "/" + usersObject._id,
          data: dataObject,
          headers: headers,
        });
        console.log(headers, "head");
        console.log(edituser.data, "eded");
        //console.log("logrok",Login.data.response.token );
        if (edituser.data.status === 200) {
          //getUsersList({ token: Login.data.response.token });
          //   Vendorlogin.data.token 

          setBackdropOpen(false);
          handleClose();
          setErrorType("success");
          setMessage(edituser.data.message);
          setAlert(true);
          console.log(getUsersList, "getuser");
        } else if (edituser.data.status === 401) {
          setBackdropOpen(false);
          handleClose();
          setErrorType("error");
          setMessage(edituser.data.message);
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
        //setMessage(error.response.data.message);
        setAlert(true);
      }
    } else {
      try {
        const dataObject = {
          email: usersObject.email,
          password: usersObject.password,
          phone: usersObject.phone,
          first_name: usersObject.first_name,
          last_name: usersObject.last_name,
          addresses: usersObject.addresses,
        };

        const headers = {
          "Content-Type": "application/json",
        };

        const adduser = await axios({
          method: "post",
          url: createUser,
          data: dataObject,
          headers: headers,
        });
        console.log(adduser.data, "adduser");
        if (adduser.data.status === 200) {
          //getUsersList({ token: Vendorlogin.data.token });
          setBackdropOpen(false);
          handleClose();
          setErrorType("success");
          setMessage(adduser.data.message);
          setAlert(true);
        } else if (adduser.data.status === 401) {
          setBackdropOpen(false);
          handleClose();
          setErrorType("error");
          setMessage(adduser.data.message);
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

  const handleChange = (name, event) => {
    setUsersObject({ ...usersObject, [name]: event.target.value });
  };

  const handleClose = () => {
    handleModelClose(false);
    setUsersObject({
      email: "",
      password: "",
      phone: "",
      first_name: "",
      last_name: "",
      addresses: "",
    });

  };
  console.log(usersObject);
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
            Users Details
          </BootstrapDialogTitle>
          <DialogContent>
            <Box style={{ margin: 10 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="outlined-textarea"
                    label="First Name"
                    placeholder="Enter First Name"
                    multiline
                    fullWidth
                    value={usersObject.first_name}
                    onChange={(e) => handleChange("first_name", e)}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Email"
                    placeholder="Enter Email"
                    multiline
                    fullWidth
                    value={usersObject.email}
                    onChange={(e) => handleChange("email", e)}
                    style={{ margin: 10 }}
                  />

                  {/* <TextField
                    id="outlined-textarea"
                    label="Address"
                    placeholder="Enter Address"
                    multiline
                    fullWidth
                    rows={4.4}
                    value={setUsersObject.addresses}
                    onChange={(e) => handleChange("addresses", e)}
                    style={{ margin: 10 }}
                  /> */}
                  <TextField
                    id="outlined-textarea"
                    label="Password"
                    placeholder="Enter password"
                    type={usersObject.showPassword ? "text" : "password"}
                    fullWidth
                    value={usersObject.password}
                    onChange={(e) => handleChange("password", e)}
                    style={{ margin: 10 }}
                    endAdornment={
                      <InputAdornment position="end">
                        {usersObject.showPassword ? <VisibilityOff /> : <Visibility />}
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="outlined-textarea"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    multiline
                    fullWidth
                    value={usersObject.last_name}
                    onChange={(e) => handleChange("last_name", e)}
                    style={{ margin: 10 }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Phone Number"
                    placeholder="Enter Phone Number"
                    multiline
                    fullWidth
                    value={usersObject.phone}
                    onChange={(e) => handleChange("phone", e)}
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

const mapStateToProps = ({ Users, Vendorlogin }) => ({
  Users,
  Vendorlogin,
});

const mapDispatchToProps = (dispatch) => ({
  getUsersList: (object) => dispatch(loadUsers(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Examdetails);
