/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";

const ProductBox = ({ product, sendDataToParent }) => {
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
          `http://localhost:8080/api/productUpdate/${product?.p_id}`,
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
          setShow(false);
          sendDataToParent(data);
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
      product_id: product?.p_id,
    };
    console.log(orderData);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to buy this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Please!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:8080/api/userOrders`, {
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
            title: "Added to cart",
            text: "Order placed successfully",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <>
      <Card style={{ width: "20rem" }}>
        <Card.Img className="" variant="top" src={product?.img} />
        <Card.Body>
          <Card.Title>{product?.name}</Card.Title>
          <Card.Text>{product?.description}</Card.Text>
          <Card.Text>Price: {product?.price} BDT</Card.Text>
          {user == "admin" ? (
            <Button onClick={handleShow} variant="danger">
              Edit
            </Button>
          ) : (
            <Button onClick={handleBuy} variant="danger">
              Buy
            </Button>
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
          <Modal.Title>{product?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="formPet" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <label htmlFor="description">Description</label>
            <input
              className="inputForm"
              defaultValue={product?.description}
              {...register("description")}
            />

            <label htmlFor="price">Price</label>
            <input
              className="inputForm"
              defaultValue={product?.price}
              {...register("price", { required: false })}
            />

            <label htmlFor="name">Category</label>
            <input
              className="inputForm"
              defaultValue={product?.cate}
              {...register("cate", { required: false })}
            />

            <label htmlFor="name">Name</label>
            <input
              className="inputForm"
              defaultValue={product?.name}
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
    </>
  );
};

export default ProductBox;
