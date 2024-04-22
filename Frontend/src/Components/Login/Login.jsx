import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import Form from "react-bootstrap/Form";
import "./Login.css";
import Button from "react-bootstrap/esm/Button";
const Login = () => {
  const { emailLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    emailLogin(email, password)
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
        Swal.fire("Login Successful");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Maybe you typed your email address or password incorrectly");
      });
  };
  return (
    <div>
      <div className="formDiv mt-4">
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <input className="btn btn-primary" type="submit" value="Login" />
        </Form>
        <div>
          <h5>No account?</h5>
          <Link to="/registration">
            <Button>Registration</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
