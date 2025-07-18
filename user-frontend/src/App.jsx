import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css'
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
