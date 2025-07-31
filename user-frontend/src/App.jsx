import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./components/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <Login /> },
]);

const App = () => (
  <AuthProvider>
    <div className="App">
      <RouterProvider router={router} />
    </div>
  </AuthProvider>
);

export default App;
