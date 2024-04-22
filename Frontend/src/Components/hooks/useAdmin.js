/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const [admin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  console.log(user?.email);

  let filterAdmin = users.find((singleUser) => user?.email == singleUser.email);

  useEffect(() => {
    if (filterAdmin?.userType == "admin") {
      setAdmin(true);
      console.log(admin);
    }
  }, [users]);

  console.log(filterAdmin);
  console.log(admin);

  return [filterAdmin, admin];
};

export default useAdmin;
