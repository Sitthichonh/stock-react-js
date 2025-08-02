import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "./../../actions/register.action";
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  // Arrow Function to register
  // onClickRegister = () => {
  //   // Axios.post("http://localhost:8085/api/v2/authen/register", this.state).then(
  //   //   (response) => {
  //   //     alert(JSON.stringify(response.data));
  //   //   }
  //   // );

  //   HttpClient.post(server.REGISTER_URL, this.state).then(response=>{
  //     alert(JSON.stringify(response.data));
  //   })

  // };

  showError = ()=>{
    return (
      <div className="alert alert-danger alert-dismissible">
      <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
      <h4><i className="icon fa fa-ban" /> Error!</h4> Incorrect information
    </div>
    )
  }

  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index.html">
            <b>CMStock</b>Register
          </a>
        </div>
        {/* /.login-logo */}
        <div
          style={{ background: "whitesmoke", borderRadius: 10 }}
          className="login-box-body"
        >
          <p className="login-box-msg">Sign in to start your session</p>
          <form>
            <div className="form-group has-feedback">
              <input
                onChange={(e) => this.setState({ username: e.target.value })}
                name="username"
                type="email"
                className="form-control"
                placeholder="Email"
              />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input
                onChange={(e) => this.setState({ password: e.target.value })}
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>

              {/* Ternery condition */}
            {this.props.registerReducer.isError ? this.showError() : null }

            {/* Register */}
            <div className="row">
              <div className="col-xs-12">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.register(this.props.history, this.state);
                  }}
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                >
                  Register
                </button>
              </div>
              {/* /.col */}
            </div>

            {/* Cancel */}
            <div className="row">
              <div className="col-xs-12">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.history.push("/login");
                  }}
                  style={{ marginTop: 8 }}
                  className="btn btn-block btn-default"
                >
                  Cancel
                </button>
              </div>
              {/* /.col */}
            </div>
          </form>
        </div>
        {/* /.login-box-body */}
      </div>
    );
  }
}

const mapStateToProps = ({ registerReducer }) => ({ registerReducer });

const mapDispatchToProps = {
  register,
};

// export default connect(mapStateToProps, mapDispatchToProps)(Register)
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
