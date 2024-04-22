import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import HomeContent from "../Components/Home/HomeContent/HomeContent";
import Pets from "../Components/Pets/Pets";
import Vets from "../Components/Vets/Vets";
import VetDetails from "../Components/Vets/VetDetails/VetDetails";
import AdminPanel from "../Components/AdminPanel/Admin/AdminPanel";
import UserProfile from "../Components/UserProfile/UserProfile";
import TopRated from "../Components/Home/TopRated/TopRated";
import Login from "../Components/Login/Login";
import Registration from "../../Registration/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <HomeContent></HomeContent>,
      },
      {
        path: "/adoption",
        element: (
          <>
            <h5 className="text-center mt-4">Pets to Adopt</h5>
            <Pets></Pets>
          </>
        ),
      },
      {
        path: "/products",
        element: (
          <>
            <h5 className="text-center mb-4 mt-4">Pet foods</h5>
            <TopRated></TopRated>
          </>
        ),
      },
      {
        path: "/vets",
        element: (
          <>
            <h5 className="text-center mt-4 mb-4">Our Vet Services</h5>
            <Vets></Vets>
          </>
        ),
      },
      {
        path: "/vet-details/:id",
        element: <VetDetails></VetDetails>,
      },
      {
        path: "/admin-dashboard",
        element: <AdminPanel></AdminPanel>,
      },
      {
        path: "/user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
    ],
  },
]);

export default router;
