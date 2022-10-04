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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { loadService } from "../../store/actions/service";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import DialogActions from "@mui/material/DialogActions";
import { FormControl, InputLabel } from "@mui/material";
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

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { updateservice, addservice, image } from "../../constant";
import { ContactsOutlined } from "@mui/icons-material";

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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
  const [serviceObject, setServiceObject] = React.useState({
    category_type_id: 2,
  });
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [errorType, setErrorType] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [stack, setStack] = React.useState([]);
  const [options, setOptions] = React.useState("");
  const {
    openModel,
    handleModelClose,
    getService,
    Vendorlogin,
    selected,
    Servicelist,
  } = props;
  const vertical = "bottom";
  const horizontal = "center";
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    Servicelist.data.map((it) => {
      if (it._id === selected[0]) {
        console.log(it);
        setServiceObject(it);
      }
    });
  }, [Servicelist, selected]);
  const handleSave = async () => {
    setBackdropOpen(true);

    //console.log(dataObject, "hello this you buddy");
    if (serviceObject._id) {
      const headers = {
        "Content-Type": "application/json",
        token: Vendorlogin.data.token,
      };
      const dataObject = {
        Category_type_id: serviceObject.Category_type_id,
        text: serviceObject.text,
        cities: serviceObject.cities,
        is_super_service: serviceObject.is_super_service,
      };
      try {
        const editexam = await axios({
          method: "post",
          url: updateservice,
          data: dataObject,
          headers: headers,
        });

        if (editexam.data.status === 200) {
          getService({ token: Vendorlogin.data.token });
          setBackdropOpen(false);
          handleClose();
          setErrorType("success");
          setMessage(editexam.data.message);
          setAlert(true);
        } else if (editexam.data.status === 401) {
          setBackdropOpen(false);
          handleClose();
          setErrorType("error");
          setMessage(editexam.data.message);
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
      const headers = {
        "Content-Type": "application/json",
        token: Vendorlogin.data.token,
      };
      const dataObject = {
        Category_type_id: serviceObject.Category_type_id,
        text: serviceObject.text,
        cities: serviceObject.cities,
        is_super_service: serviceObject.is_super_service,
      };
      try {
        const addservices = await axios({
          method: "post",
          url: addservice,
          data: dataObject,
          headers: headers,
        });

        if (addservices.data.status === 201) {
          //getService({ token: Vendorlogin.data.token });
          setBackdropOpen(false);
          handleClose();
          setErrorType("success");
          setMessage(addservices.data.message);
          setAlert(true);
        } else if (addservices.data.status === 401) {
          setBackdropOpen(false);
          handleClose();
          setErrorType("error");
          setMessage(addservices.data.message);
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
          setServiceObject({ ...serviceObject, patient_image: url });
          setBackdropOpen(false);
        }
        if (502 === imageUpload.status)
          throw "Server Error. Please reload and try again!!";
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleChange = (name, event) => {
    setServiceObject({ ...serviceObject, [name]: event.target.value });
  };
  const handleChangecheckbox = (name, event) => {
    setServiceObject({ ...serviceObject, [name]: event.target.checked });
  };

  const handleDelete = (item, i) => {
    let updatedList = serviceObject.questions.map((item, index) => {
      if (index === i) {
        const temp = [...item.choices];
        temp.splice(i, 1);
        return { ...item, choices: temp }; //gets everything that was already in item, and updates “done”
      }
      return item; // else return unmodified item
    });
    setServiceObject({ ...serviceObject, questions: updatedList });
  };

  const handleKeyDown = (evt) => {
    if (["Enter", ","].includes(evt.key)) {
      evt.preventDefault();

      let value = options.trim();
      setStack(stack.push(value));
    }
  };



  const isValid = (tag, item) => {
    let error = null;
    if (isInList(tag, item)) {
      error = `${tag} has already been added.`;
    }
    if (error) {
      setErrorType("error");
      setMessage(error);
      setAlert(true);
      return false;
    }
    return true;
  };
  const isInList = (tag, item) => {
    return item.cities.includes(tag);
  };

  const handleClose = () => {
    handleModelClose(false);
    setServiceObject({
      Category_type_id: 1,
      text: "",
      cities: [],
      is_super_service: false,
      super_sub_service_ids: [],
      sub_types: {},
    });
  };
  console.log(serviceObject);
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
        {/* Title• About• Description• Type• Type ID• Vendor ID• Locations
• City• Price */}
        <Fade in={openModel}>
          <BootstrapDialogTitle onClose={handleClose}>
            Service
          </BootstrapDialogTitle>
          <DialogContent>
            <Box style={{ margin: 10 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="outlined-textarea"
                    label="text"
                    placeholder="Enter Text"
                    multiline
                    fullWidth
                    value={serviceObject.text}
                    onChange={(e) => handleChange("text", e)}
                    style={{ margin: 10 }}
                  />
                  <>
                    <TextField
                      id="outlined-textarea"
                      label="Cities"
                      placeholder="Enter cities"
                      multiline
                      fullWidth
                      value={options}
                      onKeyDown={(e) => handleKeyDown(e)}
                      onChange={(e) => setOptions(e.target.value)}
                      style={{ margin: 10 }}
                    />

                    <Stack direction="row" spacing={1} style={{ margin: 10 }}>
                      <Chip label="hello"></Chip>
                    </Stack>
                  </>
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
                  <FormControl
                    fullWidth
                    style={{
                      margin: 10,
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Service Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={serviceObject.Category_type_id}
                      label="Course"
                      onChange={(e) => handleChange("Category_type_id", e)}
                    >
                      <MenuItem value={1}>Personal Service</MenuItem>
                      <MenuItem value={2}>Home Service</MenuItem>
                      <MenuItem value={3}>Products</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl
                    style={{
                      margin: 12,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Checkbox
                      checked={serviceObject.is_super_service}
                      onChange={(e) =>
                        handleChangecheckbox("is_super_service", e)
                      }
                    ></Checkbox>
                    <label style={{ marginTop: 10, marginLeft: 10 }}>
                      Super Service
                    </label>
                  </FormControl>

                  {/* {serviceObject.questionType === 1 && (
                    <>
                      <TextField
                        id="outlined-textarea"
                        label="Choices"
                        placeholder="Enter Choices"
                        fullWidth
                        value={options}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onChange={(e) => setOptions(e.target.value)}
                        style={{ margin: 10 }}
                      />
                      <Stack direction="row" spacing={1} style={{ margin: 10 }}>
                        {it.choices.map((it) => (
                          <Chip label={it} onDelete={() => handleDelete(it)} />
                        ))}
                      </Stack>
                    </>
                  )} */}
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

const mapStateToProps = ({ Vendorlogin, Servicelist }) => ({
  Vendorlogin,
  Servicelist,
});

const mapDispatchToProps = (dispatch) => ({
  getService: (object) => dispatch(loadService(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Examdetails);
