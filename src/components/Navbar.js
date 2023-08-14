import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid bg-dark">
          <a className="navbar-brand text-light" href="/">
            NewsBar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <a className="nav-link active text-light" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/business">
                  Business
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/cricket">
                  Cricket
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/entertainment">
                  Entertainment
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/health">
                  Health
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/science">
                  Science
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/sports">
                  Sports
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link text-light" href="/technology">
                  Technology
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
