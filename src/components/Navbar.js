import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const location = useLocation();

    const activeLinkStyle = {
        color: location.pathname === "/" ? "#ff2121" : "#808080",
    };

    const cartLinkStyle = {
        color: location.pathname === "/cart" ? "#ff2121" : "#808080",
    };

    return (
        <nav className="navbar navbar-expand">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <Link
                            to="/"
                            className="nav-link"
                            style={activeLinkStyle}
                        >
                            Home
                        </Link>
                    </div>
                    <div className="col-auto">
                        <Link
                            to="/cart"
                            className="nav-link"
                            style={cartLinkStyle}
                        >
                            Cart
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
