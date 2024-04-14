/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Vets.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
const VetBox = ({ vet }) => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Card style={{ width: "20rem" }}>
        <Card.Img className="" variant="top" src={vet?.img} />
        <Card.Body>
          <Card.Title>{vet?.hospital_name}</Card.Title>
          <Card.Text>{vet?.city}</Card.Text>
          <Card.Text>Contact: {vet?.phone_number}</Card.Text>
          {user == "admin" ? (
            <Button variant="danger">Edit</Button>
          ) : (
            <>
              <Link>
                <Button variant="danger">Book</Button>
              </Link>
              <Link to={`/vet-details/${vet?.h_id}`}>
                <Button variant="danger ms-2">Details</Button>
              </Link>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default VetBox;
