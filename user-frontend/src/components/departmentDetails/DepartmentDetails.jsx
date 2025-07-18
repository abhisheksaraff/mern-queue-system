import "./DepartmentDetails.css";

const departmentDetails = (id) => {
  return {
    id: 1,
    name: "Reception",
    open_time_mon: "09:00",
    close_time_mon: "17:00",
    open_time_tue: "09:00",
    close_time_tue: "17:00",
    open_time_wed: "09:00",
    close_time_wed: "17:00",
    open_time_thu: "09:00",
    close_time_thu: "17:00",
    open_time_fri: "09:00",
    close_time_fri: "17:00",
    open_time_sat: null,
    close_time_sat: null,
    open_time_sun: null,
    close_time_sun: null,
    people_in_queue: 10,
    wait_time: 10,
  };
};

const weekdays = [
  ["Monday", "mon"],
  ["Tuesday", "tue"],
  ["Wednesday", "wed"],
  ["Thursday", "thu"],
  ["Friday", "fri"],
  ["Saturday", "sat"],
  ["Sunday", "sun"],
];

const DepartmentDetails = () => {
  const id = 1;
  const department = departmentDetails(id);

  return (
    <div className="DepartmentDetails">
      <div className="container">
        <div className="top">
          <c className="back">⇚ </c>
          <c className="name">{department.name}</c>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Open</th>
                <th>Close</th>
              </tr>
            </thead>
            <tbody>
              {weekdays.map(([label, key]) => (
                <tr key={key}>
                  <td>{label}</td>
                  <td>{department[`open_time_${key}`] || "Closed"}</td>
                  <td>{department[`close_time_${key}`] || "Closed"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="inQueue">
            People in Queue: {department.people_in_queue}
          </div>
          <div className="waitTime">
            Wait Time: about {department.people_in_queue * department.wait_time}{" "}
            mins.
          </div>
        </div>

        <div className="bottom">
          <div className="space"></div>
          {/* <div className="join">Join Queue</div> */}
          <div className="leave">Leave Queue</div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
