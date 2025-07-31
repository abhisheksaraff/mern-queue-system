import Header from "../../components/header/Header";
import DepartmentList from "../../components/departmentList/DepartmentList";
import DepartmentDetails from "../../components/departmentDetails/DepartmentDetails";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Home;
