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
import { loadExams } from "../../store/actions/exam";
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
import { addexamApi, editexamApi } from "../../constant";

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
  const [examsObject, setExamsObject] = React.useState({
    title: "",
    body: "",
    user_Id: [],
    user_type: [],
  });
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [errorType, setErrorType] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [subCourse, setSubCourse] = React.useState([]);
  const [options, setOptions] = React.useState("");
  const {
    openModel,
    handleModelClose,
    getExamsList,
    Login,
    Course,
    selected,
    Exam,
  } = props;
  const vertical = "bottom";
  const horizontal = "center";
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // useEffect(() => {
  //   Exam.data.map((it) => {
  //     if (it._id === selected[0]) {
  //       setExamsObject(it);
  //     }
  //   });
  // }, [Course, selected]);
  useEffect(() => {
    getExamsList({ token: Login.data.token });
  }, [getExamsList, Login]);

  // const onImageUpload = async (event) => {
  //   let files = Object.values(event.target.files);

  //   if (files[0] && files[0].size > 1000000) {
  //     this.setState({
  //       errorType: "error",
  //       message: "This image size is more than 1mb.",
  //       alert: true,
  //       backDrop: false,
  //     });
  //   } else {
  //     let bodyFormData = new FormData();
  //     bodyFormData.append("files", files[0]);
  //     setStoresObject({ ...storesObject, category_img: bodyFormData });
  //   }
  // };
  const handleSave = async () => {
    setBackdropOpen(true);
    const headers = {
      "Content-Type": "application/json",
      token: Login.data.token,
    };
    const dataObject = {
      title: examsObject.title,
      courseId: examsObject.courseId,
      subCourseId: examsObject.subCourseId,
      questions: examsObject.questions,
      _id: examsObject._id,
    };
    console.log(dataObject, "hello this you buddy");
    if (examsObject._id) {
      try {
        const editexam = await axios({
          method: "post",
          url: editexamApi,
          data: dataObject,
          headers: headers,
        });
        if (editexam.data.status === 200) {
          getExamsList({ token: Login.data.token });
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
      try {
        const addexam = await axios({
          method: "post",
          url: addexamApi,
          data: dataObject,
          headers: headers,
        });

        if (addexam.data.status === 200) {
          getExamsList({ token: Login.data.token });
          setBackdropOpen(false);
          handleClose();
          setErrorType("success");
          setMessage(addexam.data.message);
          setAlert(true);
        } else if (addexam.data.status === 401) {
          setBackdropOpen(false);
          handleClose();
          setErrorType("error");
          setMessage(addexam.data.message);
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
    setExamsObject({ ...examsObject, [name]: event.target.value });
  };

  console.log(examsObject);

  const handleClose = () => {
    handleModelClose(false);
    setExamsObject({
      title: "",
      body: "",
      user_Id: [],
      user_type: [],
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
            Exam Details
          </BootstrapDialogTitle>
          <DialogContent>
            <Box style={{ margin: 10 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="outlined-textarea"
                    label="Title"
                    placeholder="Enter Title"
                    multiline
                    fullWidth
                    value={examsObject.title}
                    onChange={(e) => handleChange("title", e)}
                    style={{ margin: 10 }}
                  />
                  <FormControl
                    fullWidth
                    style={{
                      margin: 10,
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      user_Id
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={examsObject.user_Id}
                      label="Course Id"
                      onChange={(e) => handleChange("user_Id", e)}
                    >
                      {/* <MenuItem value={it._id}>{it.title}</MenuItem> */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="outlined-textarea"
                    label="body"
                    placeholder="Enter body"
                    multiline
                    fullWidth
                    value={examsObject.body}
                    onChange={(e) => handleChange("body", e)}
                    style={{ margin: 10 }}
                  />
                  <FormControl
                    fullWidth
                    style={{
                      margin: 10,
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      User Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={examsObject.user_type}
                      label="Course"
                      onChange={(e) => handleChange("user_type", e)}
                    >
                      <MenuItem value={1}>admin</MenuItem>
                      <MenuItem value={2}>vendor</MenuItem>
                      <MenuItem value={3}>user</MenuItem>
                    </Select>
                  </FormControl>
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

const mapStateToProps = ({ Login, Course, Exam }) => ({ Login, Course, Exam });

const mapDispatchToProps = (dispatch) => ({
  getExamsList: (object) => dispatch(loadExams(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Examdetails);
