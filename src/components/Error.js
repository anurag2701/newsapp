import React, { Component } from "react";

export default class Error extends Component {
  render() {
    return (
      <>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6 mx-auto text-center">
              <h1 className="display-4">404</h1>
              <p className="lead">Page Not Found</p>
              <p>Oops! The page you are looking for doesn't exist.</p>
              <a href="/" className="btn btn-primary">
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
