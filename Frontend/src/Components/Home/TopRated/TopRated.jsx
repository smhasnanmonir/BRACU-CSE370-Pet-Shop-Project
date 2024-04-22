import "./TopRated.css";

import ProductBox from "./ProductBox";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const TopRated = () => {
  const { userInfo } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dataFromChild, setDataFromChild] = useState("");

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  const [reload, setReload] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
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
        const response = await fetch(`http://localhost:8080/api/products`, {
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
            title: "Added",
            text: "Product Added",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="outerDiv mt-4">
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
      <div className="productContentDiv">
        {products?.map((product) => (
          <ProductBox
            sendDataToParent={handleDataFromChild}
            key={product?.id}
            product={product}
          ></ProductBox>
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
            <Modal.Title>Adding Products</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="formPet" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="description">Description</label>
              <input className="inputForm" {...register("description")} />

              <label htmlFor="price">Price</label>
              <input
                className="inputForm"
                {...register("price", { required: false })}
              />

              <label htmlFor="name">Category</label>
              <input
                className="inputForm"
                {...register("cate", { required: false })}
              />

              <label htmlFor="name">Name</label>
              <input
                className="inputForm"
                {...register("name", { required: false })}
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

export default TopRated;
