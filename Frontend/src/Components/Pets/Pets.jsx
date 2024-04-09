import { useEffect, useState } from "react";
import "./Pets.css";
import PetBox from "./PetBox";

const Pets = () => {
  const [petData, setPetData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:8080/api/pets")
      .then((res) => res.json())
      .then((data) => {
        setPetData(data);
        setLoading(false);
      });
  }, []);
  console.log(petData);
  console.log(loading);
  return (
    <div className="mainDiv">
      <div className="petContentDiv">
        {petData?.map((pet, i) => (
          <PetBox key={i} pet={pet}></PetBox>
        ))}
      </div>
    </div>
  );
};

export default Pets;
