import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "./router";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
