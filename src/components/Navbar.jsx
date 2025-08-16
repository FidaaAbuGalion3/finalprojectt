import "./NavbarStyles.css";
import { Component } from "react";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";

class Navbar extends Component {
    state = { clicked: false };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    };

    render() {
        return (
            <nav className="navbarItems">
                {/* Updated logo to use Link for navigation */}
                <Link to="/" className="navbarLogo">
                    Wander Quest
                </Link>

                <div className="menuIcon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>

                <ul className={this.state.clicked ? "navMenu active" : "navMenu"}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={item.url} className={item.cName}>
                                    <i className={item.icon}></i> {item.title}
                                </Link>
                            </li>
                        );
                    })}
                    <button>Sign Up</button>
                </ul>
            </nav>
        );
    }
}

export default Navbar;
