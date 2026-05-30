import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Teachers from "./pages/Teachers/Teachers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Спільний каркас (Header + Outlet)
    children: [
      {
        index: true, // Головна сторінка за замовчуванням (шлях "/")
        element: <Home />,
      },
      {
        path: "teachers", // Шлях "/teachers"
        element: <Teachers />,
      },
    ],
  },
]);
