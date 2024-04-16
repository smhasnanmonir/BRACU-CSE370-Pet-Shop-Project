/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Vets.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const VetBox = ({ vet, sendDataToParent }) => {
  const { user } = useContext(AuthContext);
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
          `http://localhost:8080/api/vetUpdate/${vet?.h_id}`,
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

  return (
    <div>
      <Card style={{ width: "20rem" }}>
        <Card.Img className="" variant="top" src={vet?.img} />
        <Card.Body>
          <Card.Title>{vet?.hospital_name}</Card.Title>
          <Card.Text>{vet?.city}</Card.Text>
          <Card.Text>Contact: {vet?.phone_number}</Card.Text>
          {user == "admin" ? (
            <Button onClick={handleShow} variant="danger">
              Edit
            </Button>
          ) : (
            <>
              <Link>
                <Button variant="danger">Book</Button>
              </Link>
              <Link to={`/vet-details/${vet?.h_id}`}>
                <Button variant="danger ms-2">Details</Button>
              </Link>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Modal */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Updating {vet?.hospital_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="formPet" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <label htmlFor="hospital_name">Hospital name</label>
            <input className="inputForm" {...register("hospital_name")} />

            <label htmlFor="address">Address</label>
            <input
              className="inputForm"
              defaultValue={vet?.name}
              {...register("address", { required: false })}
            />
            <label htmlFor="city">City</label>
            <input
              className="inputForm"
              defaultValue={vet?.city}
              {...register("city", { required: false })}
            />
            <label htmlFor="phone_number">Phone number</label>
            <input
              className="inputForm"
              defaultValue={vet?.phone_number}
              {...register("phone_number", { required: false })}
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
    </div>
  );
};

export default VetBox;
