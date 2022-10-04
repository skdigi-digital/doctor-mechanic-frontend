import React from "react";
import Signin from "../../components/auth/signin";
import Welcome from "../../components/auth/welcome";

function Login(props) {
  return (
    <div style={styles.container}>
      <Welcome />
      <Signin navigation={props} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1.8%",
  },
};

export default Login;
