import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
          <div>
            <h1>Hello</h1>
          </div>
        ),
      },
    ],
  },
]);

export default router;
