import { useEffect, useState } from "react";
import "./Pets.css";
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
          <div className="petsBox" key={i}>
            <img className="petsImg" src={pet.img} alt={pet.name} />
            <div className="petDetails">
              <h4>{pet.name}</h4>
              <p>{pet.description}</p>
              <button className="btn1">Adopt</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pets;
