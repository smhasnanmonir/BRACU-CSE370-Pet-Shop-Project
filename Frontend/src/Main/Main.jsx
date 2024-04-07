import { Outlet } from "react-router-dom";
import NavBarComp from "../Components/Home/NavBarComp/NavBarComp";

const Main = () => {
  return (
    <div>
      <NavBarComp></NavBarComp>
      <Outlet />
    </div>
  );
};

export default Main;
