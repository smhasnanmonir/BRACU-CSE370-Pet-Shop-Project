import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./UserProfile.css";
import Swal from "sweetalert2";
const UserProfile = () => {
  const { user_id } = useContext(AuthContext);
  const [userOrder, setUserOrder] = useState([]);
  const [petOrder, setPetOrder] = useState([]);
  const [vetOrder, setVetOrder] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:8080/api/userOrdersInnerJoin/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserOrder(data);
      });
  }, [load]);
  console.log(userOrder);

  useEffect(() => {
    fetch(`http://localhost:8080/api/adoptionInnerJoin/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setPetOrder(data);
      });
  }, [load]);
  console.log("Inner Join", petOrder);

  useEffect(() => {
    fetch(`http://localhost:8080/api/hospitalBookingInnerJoin/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setVetOrder(data);
      });
  }, [load]);
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
          setLoad(!load);
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
    <div className="mt-4 mb-4">
      <h5 className="text-center mt-4 mb-4">Ordered food</h5>
      <div className="gridDiv">
        {userOrder.map((order) => (
          <div key={order?.order_id}>
            <Card style={{ width: "12rem" }}>
              <Card.Img variant="top" src={order?.img} />
              <Card.Body>
                <Card.Title>{order?.name}</Card.Title>
                <Card.Text>{order?.description}</Card.Text>
                <Card.Text>BDT.{order?.price}</Card.Text>
                <Button
                  onClick={() => handleDelete("userOrders", order?.order_id)}
                  variant="danger"
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <h5 className="text-center mt-4 mb-4">Hospital Appointment</h5>
      <div className="gridDiv">
        {vetOrder?.map((order) => (
          <div key={order?.order_id}>
            <Card key={order?.order_id} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={order?.img} />
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
          </div>
        ))}
      </div>

      <h3 className="text-center mt-4 mb-4">Adoption request</h3>
      <div className="adoptionDiv">
        {petOrder?.map((order) => (
          <Card key={order?.order_id} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={order?.img} />
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
    </div>
  );
};

export default UserProfile;
