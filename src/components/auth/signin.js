import React, { useEffect, useRef } from "react";
import {
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";
import { loadLogin } from "../../store/actions/login";
import { loadVendorLogin } from "../../store/actions/vendorlogin";
import { connect } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ConstructionOutlined } from "@mui/icons-material";
import { vendor } from "../../restriction";
import { vendorlogin } from "../../store/api";

const useStyles = makeStyles({
  root: {
    [`& fieldset`]: {
      borderRadius: 10,
    },
  },
});
function Signin(props) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    // user_type: "",
    showPassword: false,
  });
  const [alert, setAlert] = React.useState(false);
  const [errorType, setErrorType] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [backdropOpen, setBackdropOpen] = React.useState(false);

  const { Login, Vendorlogin } = props;

  const vertical = "bottom";
  const horizontal = "center";

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevLogin = usePrevious({ Login });
  const prevVendorLogin = usePrevious({ Vendorlogin });

  useEffect(() => {
    
    if (prevLogin && prevLogin.Login.loading !== Login.loading) {
      if (Login.data && Login.data.response.message === "Login Success") {
        setBackdropOpen(false);

        window.location.pathname = "/dashboard";
      } else if (!Login.data) {
        setBackdropOpen(false);
        setErrorType("error");
        setMessage("Email and password does not match!!");
        setAlert(true);
      }
    }
  }, [prevLogin, Login]);
  useEffect(() => {

    if (
      prevVendorLogin &&
      prevVendorLogin.Vendorlogin.loading !== Vendorlogin.loading
    ) {
      if (Vendorlogin.data && Vendorlogin.data.message === "Login success") {
        setBackdropOpen(false);
        localStorage.setItem('token', JSON.stringify(Vendorlogin));
      

        window.location.pathname = "/dashboard";
      } else if (!Vendorlogin.data) {
        setBackdropOpen(false);
        setErrorType("error");
        setMessage("Email and password does not match!!");
        setAlert(true);
      }
    }
  }, [prevVendorLogin, Vendorlogin]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
     if (values.user_type === 1) {
    setBackdropOpen(true);
    const { setLogin } = props;
    setLogin({
      email: values.email,
      password: values.password,
      user_type: values.user_type, 
    });
    } else if (values.user_type === 2) {
      setBackdropOpen(true);
      console.log("hello");
      const { setVendorLogin } = props;
      setVendorLogin({
        email: values.email,
        password: values.password,
    user_type: values.user_type,
      });
    } else {
      
    }
  };

  console.log(values);
  const classes = useStyles(props);
  return (
    <div style={styles.signIn}>
      <h2 style={styles.header}>Sign in to Dashboard</h2>
      <p style={styles.para}>Enter your details below.</p>
      <div style={styles.forgot}>
        <ErrorIcon style={styles.infoicon} />
        <p style={styles.forgotText}>
          Forgot password? Please contact the Adminstrator.
        </p>
      </div>
      {/* ------------ Login Form ------------- */}
      <div style={styles.login}>
        <TextField
          className={classes.root}
          id="inputRounded"
          label="Email address"
          variant="outlined"
          value={values.email}
          inputProps={{
            autoComplete: "new-password",
          }}
          onChange={handleChange("email")}
          fullWidth
        />
        <FormControl className={classes.root} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            inputProps={{
              autoComplete: "new-password",
            }}
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
         <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values.role}
            label="User Type"
            onChange={handleChange("user_type")}
          >
            <MenuItem value={1}>Admin</MenuItem>
            <MenuItem value={2}>vendor</MenuItem>
          </Select>
        </FormControl> 

        <Button variant="contained" style={styles.button} onClick={handleLogin}>
          Login
        </Button>
      </div>
      <Backdrop
        // sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 3 }}
        open={backdropOpen}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1.8%",
  },
  signIn: {
    width: "50%",
    textAlign: "left",
    margin: "6% 0% 10% 5%",
  },
  header: {
    margin: "0.6em 0em 0.4em 0em",
  },
  para: {
    margin: 1,
    color: "#83909B",
  },
  login: {
    padding: "20px 0px 50px 0px",
    width: "70%",
    height: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#002040",
    padding: 10,
    borderRadius: 10,
    fontWeight: "700",
  },
  admin: {
    fontSize: 15,
    textAlign: "right",
    fontWeight: "500",
  },
  adminclick: {
    color: "#ea5a35",
    fontWeight: "700",
  },
  forgot: {
    display: "flex",
    marginTop: 10,
    backgroundColor: "#d0f2ff",
    width: "70%",
    padding: 3,
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
  },
  forgotText: {
    color: "#002040",
    fontWeight: "600",
  },
  infoicon: {
    padding: "10px 20px",
    color: "#11b5c8",
  },
};

const mapStateToProps = ({ Login, Vendorlogin }) => ({ Login, Vendorlogin });

const mapDispatchToProps = (dispatch) => ({
  setLogin: (object) => dispatch(loadLogin(object)),
  setVendorLogin: (object) => dispatch(loadVendorLogin(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
