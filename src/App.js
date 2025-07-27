import React, { Component } from "react";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";
import Footer from "./components/footer/footer";
import Login from "./components/login/login";
import Register from "./components/register/register";

import { BrowserRouter as Router, Route, Redirect , Switch } from "react-router-dom"; //Routes,

export default class App extends Component {
  redirectToLogin = () => {
    return <Redirect to="/login" />;
  };
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Menu />

          {/* <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes> */}

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="*" render={() => <Redirect to="/login" />} />
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}
