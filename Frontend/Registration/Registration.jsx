import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../src/Components/Provider/AuthProvider";
import { useForm } from "react-hook-form";

const Registration = () => {
  const { emailRegistration, updateInfo } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    emailRegistration(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        updateInfo(data.name)
          .then(() => {
            fetch("http://localhost:8080/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.insertedId) {
                  navigate(from, { replace: true });
                  Swal.fire("Registration Successful");
                }
              });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="lg:w-[575px] w-[375px] my-[45px] mx-auto">
      <h1 className="mb-[35px] text-3xl text-center">
        Please Enter Valid Information to Register.
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-cyan-200 bg-opacity-30 rounded-xl p-5 "
      >
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">User name</span>
            </label>
            <input
              type="text"
              name="username"
              {...register("username", { required: true })}
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-orange-400 mt-2">
                Please give a username.
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              {...register("name", { required: true })}
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-orange-400 mt-2">Please give a name.</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              {...register("email", { required: true })}
              placeholder="Example: summercamp@gmail.com"
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-orange-400 mt-2">
                You can not register without an email address.
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              placeholder="Enter password"
              className="input input-bordered"
            />
            {errors.password && (
              <span className="text-orange-400 mt-2" role="alert">
                Enter longer password.
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="phone"
              name="phone"
              {...register("phone", {
                required: true,
                minLength: 6,
              })}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <input className="btn btn-primary" type="submit" value="Register" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
