import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./TopRated.css";
import { AuthContext } from "../../Provider/AuthProvider";

const TopRated = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="outerDiv">
      <h3 className="productH1">Our top rated products</h3>
      <div className="productContentDiv">
        {products?.map((product, i) => (
          <Card key={i} style={{ width: "20rem" }}>
            <Card.Img className="" variant="top" src={product?.img} />
            <Card.Body>
              <Card.Title>{product?.name}</Card.Title>
              <Card.Text>{product?.description}</Card.Text>
              <Card.Text>Price: {product?.price} BDT</Card.Text>
              {user == "admin" ? (
                <Button variant="danger">Edit</Button>
              ) : (
                <Button variant="danger">Buy</Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
