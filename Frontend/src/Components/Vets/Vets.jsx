import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./Vets.css";

const Vets = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/vets")
      .then((res) => res.json())
      .then((data) => {
        setVets(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="mostOuterDiv1">
      <h1 className="text-center vetH1">Our Top Rated Vets</h1>
      <div className="vetsContentDiv mb-4">
        {vets?.map((vet) => (
          <Card key={vet?.h_id} style={{ width: "20rem" }}>
            <Card.Img className="" variant="top" src={vet?.img} />
            <Card.Body>
              <Card.Title>{vet?.hospital_name}</Card.Title>
              <Card.Text>{vet?.city}</Card.Text>
              <Card.Text>Contact: {vet?.phone_number}</Card.Text>
              <Button variant="danger">Book</Button>
              <Button variant="danger ms-2">Details</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Vets;
