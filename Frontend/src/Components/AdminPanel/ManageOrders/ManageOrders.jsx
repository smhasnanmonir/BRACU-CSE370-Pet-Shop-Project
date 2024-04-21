import { useEffect, useState } from "react";
import "./ManageOrders.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
const ManageOrders = () => {
  const [productOrder, setProductOrder] = useState([]);
  const [petOrder, setPetOrder] = useState([]);
  const [vetOrder, setVetOrder] = useState([]);
  const [reloadProduct, setReloadProduct] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8080/api/userOrdersInnerJoin")
      .then((response) => response.json())
      .then((data) => {
        setProductOrder(data);
      });
  }, [reloadProduct]);
  console.log("Inner Join", productOrder);

  useEffect(() => {
    fetch("http://localhost:8080/api/adoptionInnerJoin")
      .then((response) => response.json())
      .then((data) => {
        setPetOrder(data);
      });
  }, [reloadProduct]);
  console.log("Inner Join", petOrder);

  useEffect(() => {
    fetch("http://localhost:8080/api/hospitalBookingInnerJoin")
      .then((response) => response.json())
      .then((data) => {
        setVetOrder(data);
      });
  }, [reloadProduct]);
  console.log("Inner Join", vetOrder);

  const handleDelete = async (path, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Please!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:8080/api/${path}/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(response.message);
        }

        const responseData = await response.json();
        console.log("Response:", responseData);

        if (responseData?.affectedRows === 1) {
          setReloadProduct(!reloadProduct);
          Swal.fire({
            title: "Done!",
            text: "Deleted!",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="">
      <h3 className="text-center">Ordered Product</h3>
      <div className="adminOrder">
        {productOrder?.map((order) => (
          <Card key={order?.order_id} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Ordered by: {order?.username}</Card.Title>
              <Card.Text>Email: {order?.email}</Card.Text>
              <Card.Text>Address: {order?.address}</Card.Text>
              <Card.Text>{order?.name}</Card.Text>
              <Card.Text>Price: {order?.price}</Card.Text>
              <Button
                onClick={() => handleDelete("userOrders", order?.order_id)}
                variant="danger"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <h3 className="text-center mt-4 mb-4">Adoption request</h3>
      <div className="adminOrder">
        {petOrder?.map((order) => (
          <Card key={order?.order_id} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Ordered by: {order?.username}</Card.Title>
              <Card.Text>Email: {order?.email}</Card.Text>
              <Card.Text>Address: {order?.address}</Card.Text>
              <Card.Text>Phone: {order?.phone}</Card.Text>
              <Card.Text>Pet name: {order?.name}</Card.Text>
              <Button
                onClick={() => handleDelete("adoptions", order?.adoption_id)}
                variant="danger"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <h3 className="text-center mt-4 mb-4">Vet request</h3>
      <div className="adminOrder">
        {vetOrder?.map((order) => (
          <Card key={order?.order_id} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Ordered by: {order?.username}</Card.Title>
              <Card.Text>Email: {order?.email}</Card.Text>
              <Card.Text>Phone: {order?.phone}</Card.Text>
              <Card.Text>Vet name: {order?.hospital_name}</Card.Text>
              <Button
                onClick={() => handleDelete("hospitalBooking", order?.h_id)}
                variant="danger"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;
