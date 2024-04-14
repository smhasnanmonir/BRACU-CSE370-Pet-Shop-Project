import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import HomeContent from "../Components/Home/HomeContent/HomeContent";
import Pets from "../Components/Pets/Pets";
import Vets from "../Components/Vets/Vets";
import VetDetails from "../Components/Vets/VetDetails/VetDetails";
import AdminPanel from "../Components/AdminPanel/Admin/AdminPanel";

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
        element: <Pets></Pets>,
      },
      {
        path: "/vets",
        element: <Vets></Vets>,
      },
      {
        path: "/vet-details/:id",
        element: <VetDetails></VetDetails>,
      },
      {
        path: "/admin-dashboard",
        element: <AdminPanel></AdminPanel>,
      },
    ],
  },
]);

export default router;
