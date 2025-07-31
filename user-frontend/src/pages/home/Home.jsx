import Header from "../../components/header/Header";
import DepartmentList from "../../components/departmentList/DepartmentList";
import DepartmentDetails from "../../components/departmentDetails/DepartmentDetails";
import Footer from "../../components/footer/Footer";

function Home() {
  return (
    <div className="Home">
      <Header />
      <DepartmentList />
      <Footer />
    </div>
  );
}

export default Home;
