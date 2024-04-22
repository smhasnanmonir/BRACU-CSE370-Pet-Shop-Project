import { Link } from "react-router-dom";
import "./NavBarComp.css";
import logo from "../../../assets/logo/logo.png";
import Button from "react-bootstrap/esm/Button";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const NavBarComp = () => {
  const { user, signOutFromWeb, userInfo } = useContext(AuthContext);
  console.log(user, "userInfo ", userInfo);
  console.log(userInfo?.[0]?.user_id);
  return (
    <div className="mostOuterDiv">
      <div className="outerNavDiv">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="navigationDiv">
          <Link to="/" className="navLink">
            Home
          </Link>
          <Link to="/adoption" className="navLink">
            Adoptions
          </Link>
          <Link to="/vets" className="navLink">
            Vets
          </Link>
          <Link to="/user-profile" className="navLink">
            Profile
          </Link>
        </div>
        <div className="searchBox">
          {user ? (
            <>
              <Button onClick={signOutFromWeb} variant="danger">
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* <Button variant="danger">
                <Link to="/login">Login</Link>
              </Button> */}
              <Link to="/login">
                <Button variant="danger">Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBarComp;
