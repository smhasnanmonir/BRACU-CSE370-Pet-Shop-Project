import "./VetDetails.css";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const VetDetails = () => {
  const { id } = useParams();
  const [vet, setVet] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/vetDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVet(data);
        setLoading(false);
      });
  }, []);
  console.log(vet);
  return (
    <div className="vetOuterDiv">
      <div className="vetDetails">
        <h4>{vet?.[0]?.hospital_name}</h4>
        <img src={vet?.[0]?.img} alt="" />
        <p>City: {vet?.[0]?.city}</p>
        <p>Address: {vet?.[0]?.address}</p>
        <p>Contact: {vet?.[0]?.phone_number}</p>
      </div>
      <div className="linkDiv">
        <Link className="link">
          <Button variant="warning"> Book us now</Button>
        </Link>
        <Link to="/" className="link">
          <Button variant="warning"> Back to home</Button>
        </Link>
      </div>
    </div>
  );
};

export default VetDetails;
