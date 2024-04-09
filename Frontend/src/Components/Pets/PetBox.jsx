/* eslint-disable react/prop-types */
import "./Pets.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const PetBox = ({ pet }) => {
  return (
    <div>
      <Card style={{ width: "20rem" }}>
        <Card.Img className="petsImg" variant="top" src={pet?.img} />
        <Card.Body>
          <Card.Title>{pet?.name}</Card.Title>
          <Card.Text>{pet?.description}</Card.Text>
          <Card.Text>Price: {pet?.price} BDT</Card.Text>
          <Button variant="danger">Buy</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PetBox;
