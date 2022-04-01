import React from "react"
 

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <h2 className="navbar-brand" href="#">
        Tickettttt
      </h2>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item"></li>
        </ul>

        <li className="btn btn-secondary">
          Balance:{props.balance}cUSD
        </li>
      </div>
    </div>
  </nav>
    
  );
};

export default Navbar