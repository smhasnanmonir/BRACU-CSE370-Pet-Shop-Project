import { useEffect, useState } from "react";

import "./Vets.css";
import VetBox from "./VetBox";

const Vets = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dataFromChild, setDataFromChild] = useState("");

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/vets")
      .then((res) => res.json())
      .then((data) => {
        setVets(data);
        setLoading(false);
      });
  }, [dataFromChild]);

  return (
    <div className="mostOuterDiv1">
      <div className="vetsContentDiv mb-4">
        {vets?.map((vet) => (
          <VetBox
            sendDataToParent={handleDataFromChild}
            key={vet?.hospital_id}
            vet={vet}
          ></VetBox>
        ))}
      </div>
    </div>
  );
};

export default Vets;
