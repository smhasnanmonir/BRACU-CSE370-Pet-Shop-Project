import "./TopRated.css";

import ProductBox from "./ProductBox";
import { useEffect, useState } from "react";

const TopRated = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dataFromChild, setDataFromChild] = useState("");

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [dataFromChild]);

  return (
    <div className="outerDiv">
      <div className="productContentDiv">
        {products?.map((product) => (
          <ProductBox
            sendDataToParent={handleDataFromChild}
            key={product?.id}
            product={product}
          ></ProductBox>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
