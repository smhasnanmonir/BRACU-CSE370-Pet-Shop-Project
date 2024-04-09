import { useEffect, useState } from "react";

import "./Vets.css";
import VetBox from "./VetBox";

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
          <VetBox key={vet?.hospital_id} vet={vet}></VetBox>
        ))}
      </div>
    </div>
  );
};

export default Vets;
