import { Link } from "react-router-dom";
import "./NavBarComp.css";
import logo from "../../../assets/logo/logo.png";

const NavBarComp = () => {
  return (
    <div className="mostOuterDiv">
      <div className="outerNavDiv">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="navigationDiv">
          <Link className="navLink">Home</Link>
          <Link className="navLink">Adoptions</Link>
          <Link className="navLink">Vets</Link>
          <Link className="navLink">Profile</Link>
        </div>
        <div className="searchBox">
          <input type="text" />
          <Link className="searchButton">Search</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBarComp;
