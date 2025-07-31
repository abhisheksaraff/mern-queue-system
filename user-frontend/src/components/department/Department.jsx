import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Department.css";

const Department = ({ department }) => {
  const [status, checkStatus] = useState("open");
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      //   const res = await fetch(`/api/departments/${department.id}/status`);
      //   const data = await res.json();
      //   checkStatus(data.isOpen ? "open" : "closed");
      return "closed";
    };
    checkStatus();
  }, [department.id]);

  return (
    <div className="department">
      <div className={`container ${status}`}>
        <div className="info">
          <div className="department-name">{department.name}</div>
          <div className="status">{status}</div>
        </div>
        <div
          className="details"
          onClick={() => navigate(`/home/${department.id}`)}
        >Details</div>
      </div>
    </div>
  );
};

export default Department;
