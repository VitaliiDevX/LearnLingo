import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Teachers from "./pages/Teachers/Teachers";
import NotFound from "./pages/NotFound/NotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Favorites from "./pages/Favorites/Favorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "teachers",
        element: <Teachers />,
      },
      {
        element: <PrivateRoute />,
        children: [{ path: "favorites", element: <Favorites /> }],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
