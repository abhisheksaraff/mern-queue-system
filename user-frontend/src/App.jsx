import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import DepartmentList from "./components/departmentList/DepartmentList";
import DepartmentDetails from "./components/departmentDetails/DepartmentDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./components/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    // Optional: wrap in <ProtectedRoute>
    element: (
      //<ProtectedRoute>
      <Home />
      //</ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DepartmentList />,
      },
      {
        path: ":departmentid",
        element: <DepartmentDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <Login />,
  },
]);

const App = () => (
  <AuthProvider>
    <div className="App">
      <RouterProvider router={router} />
    </div>
  </AuthProvider>
);

export default App;
