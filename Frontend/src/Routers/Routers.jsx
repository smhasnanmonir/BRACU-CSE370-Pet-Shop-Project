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
            <Pets></Pets>
          </>
        ),
      },
      {
        path: "/products",
        element: (
          <>
            <TopRated></TopRated>
          </>
        ),
      },
      {
        path: "/vets",
        element: (
          <>
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
