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
import { loadDealer } from "../../store/actions/dealer";
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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

// web.cjs is required for IE11 support
import { useSpring, animated } from "react-spring";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { editdealer, adddealer, image, dealerListApi } from "../../constant";
import { ContactsOutlined } from "@mui/icons-material";
import { vendorlogin } from "../../store/api";

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

function Dealerdetails(props) {
    const [dealerObject, setDealerObject] = React.useState({
        first_name: "",
        last_name: "",
        password:"",
        address: "",
        latitude: "",
        longitude: "",
        phone: "",
        state: "",
        city: "",
        pincode: "",
        email:"",
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
        getDealer,
        Vendorlogin,
        selected,
        Dealer,
        token,
    } = props;
    const vertical = "bottom";
    const horizontal = "center";
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    useEffect(() => {
        Dealer.data.map((it) => {
            if (it._id === selected[0]) {
                console.log(it);
                setDealerObject(it);
            }
        });
    }, [Dealer, selected]);

    const handleSave = async () => {
        setBackdropOpen(true);

        //console.log(dataObject, "hello this you buddy");
        if (dealerObject._id) {
            const headers = {
                "Content-Type": "application/json",
                token: Vendorlogin.data.token,
            };
            const dataObject = {
                first_name: dealerObject.first_name,
                last_name: dealerObject.last_name,
                address: dealerObject.address,
                latitude: dealerObject.latitude,
                longitude: dealerObject.longitude,
                phone: dealerObject.phone,
                dealer_id: dealerObject._id,
                state: dealerObject.state,
                city: dealerObject.city,
                pincode: dealerObject.pincode,
                email:dealerObject.email,
            };
            // console.log("error messagessssssssssss",data)
            try {
                const updatedealer = await axios({

                    method: "put",
                    url: editdealer,
                    data: dataObject,
                    headers: headers,
                });
                if (updatedealer.data.status === 200) {
                    getDealer({ token: Vendorlogin.data.token });
                    setBackdropOpen(false);
                    handleClose();
                    setErrorType("success");
                    setMessage(updatedealer.data.message);
                    setAlert(true);
                } else if (updatedealer.data.status === 401) {
                    setBackdropOpen(false);
                    handleClose();
                    setErrorType("error");
                    setMessage(updatedealer.data.message);
                    setAlert(true);
                } else {
                    setBackdropOpen(false);
                    setErrorType("error");
                    setMessage("Error!, Please contact your Administrator!!");
                    setAlert(true);
                }
            } catch (error) {
                console.log("Catch error messagessss", error)
                setBackdropOpen(false);
                setErrorType("Error!, Please contact your Samuel!", error);
                //setMessage(error.response.data.message);
                setAlert(true);
            }
        } else {
            try {
                const headers = {
                    "Content-Type": "application/json",
                    token: Vendorlogin.data.token,
                };
                const dataObject = {
                    first_name: dealerObject.first_name,
                    last_name: dealerObject.last_name,
                    address: dealerObject.address,
                    latitude: dealerObject.latitude,
                    longitude: dealerObject.longitude,
                    phone: dealerObject.phone,
                    dealer_id: dealerObject._id,
                    state: dealerObject.state,
                    city: dealerObject.city,
                    pincode: dealerObject.pincode,
                    password:dealerObject.password,
                    email:dealerObject.email,

                };
                const adddealers = await axios({
                    method: "post",
                    url: adddealer,
                    data: dataObject,
                    headers: headers,
                });

                if (adddealers.data.status === 200) {
                    getDealer({ token: Vendorlogin.data.token });
                    setBackdropOpen(false);
                    handleClose();
                    setErrorType("success");
                    setMessage(adddealers.data.message);
                    setAlert(true);
                } else if (adddealers.data.status === 401) {
                    setBackdropOpen(false);
                    handleClose();
                    setErrorType("error");
                    setMessage(adddealers.data.message);
                    setAlert(true);
                } else {
                    console.log("im the image content")
                    setBackdropOpen(false);
                    setErrorType("error");
                    setMessage("Error!, Please ");
                    setAlert(true);
                }
            } catch (error) {
                setBackdropOpen(false);
                setErrorType("error");
                setMessage("Error!, Please contact your Administrator!!", error);
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
                    setDealerObject({ ...dealerObject, patient_image: url });
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
        setDealerObject({ ...dealerObject, [name]: event.target.value });
    };

    const handleClose = () => {
        handleModelClose(false);
        setDealerObject({
            first_name: "",
            last_name: "",
            address: "",
            latitude: "",
            longitude: "",
            phone: "",
            state: "",
            city: "",
            pincode: "",
            password:"",
            email:"",
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
                {/* Title• About• Description• Type• Type ID• Vendor ID• Locations
• City• Price */}
                <Fade in={openModel}>
                    <BootstrapDialogTitle onClose={handleClose}>
                        Dealers
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
                                        value={dealerObject.first_name}
                                        onChange={(e) => handleChange("first_name", e)}
                                        style={{ margin: 10 }}
                                    />
                                      <TextField
                                        id="outlined-textarea"
                                        label="email"
                                        placeholder="Enter Email"
                                        multiline
                                        fullWidth
                                        value={dealerObject.email}
                                        onChange={(e) => handleChange("email", e)}
                                        style={{ margin: 10 }}
                                    />
                                    <TextField
                                        id="outlined-textarea"
                                        label="phone"
                                        placeholder="Enter phone Number"
                                        multiline
                                        fullWidth
                                        value={dealerObject.phone}
                                        onChange={(e) => handleChange("phone", e)}
                                        style={{ margin: 10 }}
                                    />
                                    <TextField
                                        id="outlined-textarea"
                                        label="state"
                                        placeholder="Enter state"
                                        multiline
                                        fullWidth
                                        value={dealerObject.state}
                                        onChange={(e) => handleChange("state", e)}
                                        style={{ margin: 10 }}
                                    />
                                    <TextField
                                        id="outlined-textarea"
                                        label="Address"
                                        placeholder="Enter Address"
                                        multiline
                                        fullWidth
                                        rows={4.4}
                                        value={dealerObject.address}
                                        onChange={(e) => handleChange("address", e)}
                                        style={{ margin: 10 }}
                                    />
                                    <TextField
                                        id="outlined-textarea"
                                        label="pincode"
                                        placeholder="Enter pincode"
                                        multiline
                                        fullWidth
                                        value={dealerObject.pincode}
                                        onChange={(e) => handleChange("pincode", e)}
                                        style={{ margin: 10 }}
                                    />

                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <TextField
                                        id="outlined-textarea"
                                        label="last_name"
                                        placeholder="Enter last_name"
                                        multiline
                                        fullWidth
                                        value={dealerObject.last_name}
                                        onChange={(e) => handleChange("last_name", e)}
                                        style={{ margin: 10 }}
                                    />
                                    <TextField
                                        id="outlined-textarea"
                                        label="password"
                                        placeholder="Enter password"
                                        multiline
                                        fullWidth
                                        value={dealerObject.password}
                                        onChange={(e) => handleChange("password", e)}
                                        style={{ margin: 10 }}
                                    />
                                    <TextField
                                        id="outlined-textarea"
                                        label="city"
                                        placeholder="Enter city"
                                        multiline
                                        fullWidth
                                        value={dealerObject.city}
                                        onChange={(e) => handleChange("city", e)}
                                        style={{ margin: 10 }}
                                    />
                                    <TextField
                                        id="outlined-textarea"
                                        label="longitude"
                                        placeholder="Enter longitude"
                                        multiline
                                        fullWidth
                                        value={dealerObject.longitude}
                                        onChange={(e) => handleChange("longitude", e)}
                                        style={{ margin: 10 }}
                                    />
                                    <TextField
                                        id="outlined-textarea"
                                        label="latitude"
                                        placeholder="Enter latitude"
                                        multiline
                                        fullWidth
                                        value={dealerObject.latitude}
                                        onChange={(e) => handleChange("latitude", e)}
                                        style={{ margin: 10 }}
                                    />
                                    {/* {dealerObject.questionType === 1 && (
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

const mapStateToProps = ({ Vendorlogin, Dealer, }) => ({
    Vendorlogin,
    Dealer,
    
});

const mapDispatchToProps = (dispatch) => ({
    getDealer: (object) => dispatch(loadDealer(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dealerdetails);
