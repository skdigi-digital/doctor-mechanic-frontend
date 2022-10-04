import React from "react";
import image from "../../assets/login/Project_72-09.jpg";
import logo from "../../assets/logos/skdigi-logo.png";

function Welcome() {
  return (
    <div style={styles.card}>
      <img src={logo} alt="logo" style={styles.imagelogo} />
      <div style={styles.welcome}>Hi, Welcome Back</div>
      <img src={image} alt="welcome" style={styles.imagewelcome} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1.5%",
  },
  card: {
    padding: "25px 10px",
    borderRadius: 20,
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
  },
  imagelogo: {
    height: 100,
    padding: "0px 30px",
  },
  imagewelcome: {
    height: 330,
  },
  welcome: {
    padding: "55px 30px",
    fontSize: 30,
    fontWeight: "600",
  },
};

export default Welcome;
