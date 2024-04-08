import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import HomeContent from "../Components/Home/HomeContent/HomeContent";
import Pets from "../Components/Pets/Pets";

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
    ],
  },
]);

export default router;
