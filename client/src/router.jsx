import { createBrowserRouter, redirect } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import BookingForm from "./pages/bookingForm";
import Approval from "./pages/approval";
import App from "./App";

function checkToken() {
  if (!localStorage.getItem("access_token")) {
    return redirect("/login");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/dashboard");
      }
      return null;
    },
  },
  {
    path: "/",
    element: <App />,
    loader: checkToken,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "booking",
        element: <BookingForm />,
      },
      {
        path: "approval",
        element: <Approval />,
      },
    ],
  },
]);

export default router;
