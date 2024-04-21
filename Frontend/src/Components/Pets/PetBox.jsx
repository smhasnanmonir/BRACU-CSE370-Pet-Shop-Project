/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "./Pets.css";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../Provider/AuthProvider";
import { useForm } from "react-hook-form";

const PetBox = ({ pet, sendDataToParent }) => {
  const { user, user_id } = useContext(AuthContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Updated the Data!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:8080/api/petUpdate/${pet?.pet_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error(response.message);
        }

        const responseData = await response.json();
        console.log("Response:", responseData);

        if (responseData?.affectedRows === 1) {
          sendDataToParent(data);
          setShow(false);
          Swal.fire({
            title: "Updated",
            text: "Your Pet has been Updated.",
            icon: "success",
          });
        }
      }
    });
  };

  console.log(watch("example"));

  const handleBuy = async () => {
    let orderData = {
      user_id: user_id,
      pet_id: pet?.pet_id,
    };
    console.log(orderData);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to adopt?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Please!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:8080/api/adoptions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });
        if (!response.ok) {
          throw new Error(response.message);
        }

        const responseData = await response.json();
        console.log("Response:", responseData);

        if (responseData?.affectedRows === 1) {
          Swal.fire({
            title: "Adopted!",
            text: "You just adopted a pet!",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <Card cl style={{ width: "20rem" }}>
        <Card.Img className="petsImg" variant="top" src={pet?.img} />
        <Card.Body className="petDetails">
          <Card.Title>{pet?.name}</Card.Title>
          <Card.Text>{pet?.description}</Card.Text>
          {user == "admin" ? (
            <>
              <Button onClick={handleShow} variant="danger">
                Edit
              </Button>
            </>
          ) : (
            <Button onClick={handleBuy} variant="danger">
              Adopt
            </Button>
          )}
        </Card.Body>
      </Card>

      {/* Modal for admin starts*/}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{pet?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="formPet" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <label htmlFor="description">Description</label>
            <input className="inputForm" {...register("description")} />

            <label htmlFor="name">Name</label>
            <input
              className="inputForm"
              defaultValue={pet?.name}
              {...register("name", { required: false })}
            />
            <input className="inputForm" type="submit" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for admin Ends*/}
    </div>
  );
};

export default PetBox;
