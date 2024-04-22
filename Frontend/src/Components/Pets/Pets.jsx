import { useContext, useEffect, useState } from "react";
import "./Pets.css";
import PetBox from "./PetBox";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const Pets = () => {
  const { userInfo } = useContext(AuthContext);
  const [petData, setPetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [dataFromChild, setDataFromChild] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/pets")
      .then((res) => res.json())
      .then((data) => {
        setPetData(data);
        setLoading(false);
      });
  }, [dataFromChild, reload]);
  console.log(petData);
  console.log(loading);

  const {
    register,
    handleSubmit,
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
        const response = await fetch(`http://localhost:8080/api/pets`, {
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
          setReload("reloaded");
          setShow(false);
          Swal.fire({
            title: "Added",
            text: "Your Pet has been added to adoption.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <>
      <div className="text-center mt-4">
        <Button variant="warning" onClick={handleShow}>
          Post an adoption
        </Button>
      </div>
      <div className="mainDiv">
        <div className="petContentDiv">
          {petData?.map((pet, i) => (
            <PetBox
              sendDataToParent={handleDataFromChild}
              setPetData={setPetData}
              key={i}
              pet={pet}
            ></PetBox>
          ))}
        </div>

        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Post about adoption</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="formPet" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <label htmlFor="description">Description</label>
                <input className="inputForm" {...register("description")} />

                <label htmlFor="name">Name</label>
                <input
                  className="inputForm"
                  {...register("name", { required: false })}
                />
                <label htmlFor="img">Photo URL</label>
                <input
                  className="inputForm"
                  {...register("img", { required: false })}
                />
                <label htmlFor="owner_id">Owner Account ID</label>
                <input
                  className="inputForm"
                  value={userInfo?.[0]?.user_id}
                  {...register("owner_id", { required: false })}
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
    </>
  );
};

export default Pets;
