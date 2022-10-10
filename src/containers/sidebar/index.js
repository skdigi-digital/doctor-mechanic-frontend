import * as React from "react";
import "./sidebar.css"
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import {
  Icon,
  ListItem,
  Toolbar,
  List,
  CssBaseline,
  Box,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { deepOrange } from "@mui/material/colors";
import NotificationsIcon from "@mui/icons-material/Notifications";

import logo from "../../assets/logos/skdigi-logo.png";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "../dashboard";
// import Product from "../product";

import { vendor, admin } from "../../restriction";
import { connect } from "react-redux";
import Users from "../Users";
import Vendor from "../Vendor";
import Services from "../Service";
import Admin from "../Admin";

import Notification from "../notification";
import Orderslist from "../orderslist";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  margin: "3px 0px 0px 1px",
  border: "0.1px solid rgb(240, 240, 245)",
  background: "rgba(255, 255, 255, 0.51)",
  // boxShadow: "5px 6px 9px 4px #888888",
  // filter: "blur(0.5px) saturate(150%)",
  height: "99vh",
  overflowX: "hidden",
  borderRadius: "10px",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  height: "99vh",
  overflowX: "hidden",
  borderRadius: "10px",
  margin: "3px 0px 0px 1px",
  border: "0.1px solid rgb(240, 240, 245)",
  background: "rgba(255, 255, 255, 0.51)",
  // filter: "blur(0.5px) saturate(150%)",
  // height: "100vh",

  width: `calc(${theme.spacing(7)} + 18px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 18px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  //background color of top searchbar& notification
  backgroundColor: "transparent",
  paddingTop:15,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: drawerWidth,

    width: `calc(100% - ${90}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 10,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Sidebar(props) {
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sideBar, setSideBar] = React.useState([]);
  const openLogout = Boolean(anchorEl);

  const { Login, Vendorlogin } = props;

  console.log(props);

  React.useEffect(() => {
    console.log("login", Login);
    if (Login.data.response && Login.data.response.status === 200) {
      setSideBar(admin);

    } else if (Vendorlogin.data.status === 200) {
      setSideBar(vendor);
    }
  }, [Login.data, Vendorlogin.data]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlelogout = () => {
    sessionStorage.clear();

    window.location.pathname = "/";
  };

  return (
    <Box sx={{
      display: "flex",
    }} >
      <CssBaseline />
      <AppBar  open={open} elevation={0}>
        <Toolbar style={styles.toolbar}>
          <IconButton>
            <SearchIcon color="action" sx={{ fontSize: 30,ml :5}} />
          </IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "30%",
              background:"transparent",
            }}
          >
            <IconButton>
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon color="action" sx={{ fontSize: 30 }} />
              </Badge>
            </IconButton>
            <IconButton onClick={handleClick}>
              <Avatar sx={{ bgcolor: deepOrange[500], width: 30, height: 30 }}>
                N
              </Avatar>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openLogout}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handlelogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* <Drawer
        onMouseOver={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        open={open}
        variant="permanent"
        anchor="left"
      > */}
      <div style={{ border: "2px" }} className="main" >
        <Toolbar className="sizing" >
          <img src={logo} alt="logo" style={{ height: 80, zIndex: "2" }} />
        </Toolbar>
        <List style={{ marginLeft: 15, zIndex: "1" }}>
          {sideBar.map((text, index) => (
            <ListItem
              button
              key={text.id}
              style={styles.listItem}
              onClick={() => (window.location.pathname = text.path)}
            >
              <ListItemIcon>
                <Icon>{text.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItem>
          ))}
        </List>
        {/* </Drawer> */}
      </div>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 5 }}
      >
        <Router>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/vendor" component={Vendor} />
          <Route exact path="/service" component={Services} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/notification" component={Notification} />
          <Route exact path="/orders" component={Orderslist}/>
        </Router>
      </Box>
    </Box>
  );
}

const styles = {
  listItem: {
    paddingBottom: 30,
    paddingTop: 20,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    width: "98%",
  },
};

const mapStateToProps = ({ Login, Vendorlogin }) => ({ Login, Vendorlogin });

export default connect(mapStateToProps)(Sidebar);
