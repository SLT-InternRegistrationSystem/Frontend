import React, { useEffect, useState } from "react";
 
const InternList = () => {
  const [interns, setInterns] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredInterns, setFilteredInterns] = useState([]);
 
 
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await fetch("/api/trainees");
        const data = await response.json();
        setInterns(data);
        setFilteredInterns(data);
      } catch (error) {
        console.error("Error fetching interns:", error);
      }
    };
    fetchInterns();
  }, []);
 
 
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    if (value === "") {
      setFilteredInterns(interns);
    } else {
      setFilteredInterns(
        interns.filter((intern) =>
          intern.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };
 
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">All Trainees</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-1/3"
          value={search}
          onChange={handleSearch}
        />
        <div>
          <button className="btn btn-primary mr-2">
            Export All Trainees to Excel
          </button>
          <button className="btn btn-secondary">Export Active Trainees</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Trainee_ID</th>
              <th>Name</th>
              <th>Mobile / Email / City</th>
              <th>NIC</th>
              <th>Training Ends</th>
              <th>Institute</th>
              <th>Field of Specialization</th>
              <th>Supervisor</th>
            </tr>
          </thead>
          <tbody>
            {filteredInterns.length > 0 ? (
              filteredInterns.map((intern) => (
                <tr key={intern.traineeId}>
                  <td>{intern.traineeId}</td>
                  <td>{intern.name}</td>
                  <td>
                    {intern.mobile} / {intern.email} / {intern.city}
                  </td>
                  <td>{intern.nic}</td>
                  <td>{intern.trainingEnds}</td>
                  <td>{intern.institute}</td>
                  <td>{intern.specialization}</td>
                  <td>{intern.supervisor}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No trainees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default InternList;