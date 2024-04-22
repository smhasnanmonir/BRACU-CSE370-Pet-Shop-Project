import { useContext, useEffect, useState } from "react";
/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./Vets.css";
import VetBox from "./VetBox";
import { AuthContext } from "../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Vets = () => {
  const { userInfo } = useContext(AuthContext);
  const [vets, setVets] = useState([]);
  const [reload, setReload] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [dataFromChild, setDataFromChild] = useState("");

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/vets")
      .then((res) => res.json())
      .then((data) => {
        setVets(data);
      });
  }, [dataFromChild, reload]);

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
        const response = await fetch(`http://localhost:8080/api/vets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(response.message);
        }
        const responseData = await response.json();
        console.log("Response:", responseData);
        if (responseData?.affectedRows === 1) {
          setReload("reload");
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

  return (
    <div className="mostOuterDiv1 mt-4">
      {userInfo?.[0]?.userType === "admin" ? (
        <>
          <div className="text-center mb-4">
            <Button variant="warning" onClick={handleShow}>
              Post new vet
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="vetsContentDiv mb-4">
        {vets?.map((vet) => (
          <VetBox
            sendDataToParent={handleDataFromChild}
            key={vet?.hospital_id}
            vet={vet}
          ></VetBox>
        ))}
      </div>

      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adding Vets</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="formPet" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="hospital_name">Hospital name</label>
              <input className="inputForm" {...register("hospital_name")} />

              <label htmlFor="address">Address</label>
              <input
                className="inputForm"
                {...register("address", { required: false })}
              />
              <label htmlFor="city">City</label>
              <input
                className="inputForm"
                {...register("city", { required: false })}
              />
              <label htmlFor="phone_number">Phone number</label>
              <input
                className="inputForm"
                {...register("phone_number", { required: false })}
              />
              <label htmlFor="img">Image</label>
              <input
                className="inputForm"
                {...register("img", { required: false })}
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
      </>
    </div>
  );
};

export default Vets;
