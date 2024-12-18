import { Input, DatePicker, Select, SelectItem, Textarea, Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import React, {useState, useEffect} from "react";
import axios from "axios";


export const fieldOfSpecialization = [
  { key: "QA", label: "QA" },
  { key: "FULLSTACK", label: "FullStack" },
  { key: "CLOUD", label: "Cloud" },
  { key: "UI/UX", label: "UI/UX" },
];


const initialFormState = {
  name: "",
  nic: "",
  mobile: "",
  email: "",
  address: "",
  institute: "",
  startDate: null,
  endDate: null,
  specialization: "",
  languages: "",
  supervisor: null,
  assignedWork: "",
  targetDate: null,
};

export default function App() {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [supervisors, setSupervisors] = useState([]);


  useEffect(() => {
    // Fetch supervisors from backend
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/supervisors');
        setSupervisors(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching supervisors:", error);
        setError("Failed to fetch supervisors. Please try again.");
      }
    };
    fetchSupervisors();
  }, []);



  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleCreateIntern = async () => {
    const hasEmptyFields = Object.values(formData).some(
      (value) => value === "" || value === null || (Array.isArray(value) && value.length === 0)
    );

    if (hasEmptyFields) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      console.log("Intern data:", formData);

      const formattedStartDate = formData.startDate
        ? `${formData.startDate.year}-${String(formData.startDate.month).padStart(2, '0')}-${String(formData.startDate.day).padStart(2, '0')}`
        : null;

      const formattedEndDate = formData.endDate
      ? `${formData.endDate.year}-${String(formData.endDate.month).padStart(2, '0')}-${String(formData.endDate.day).padStart(2, '0')}`
      : null;

      const formattedTargetDate = formData.targetDate
      ? `${formData.targetDate.year}-${String(formData.targetDate.month).padStart(2, '0')}-${String(formData.targetDate.day).padStart(2, '0')}`
      : null;

      const requestData = {
        ...formData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        targetDate: formattedTargetDate,
      };

      console.log(requestData)
      console.log(requestData.supervisor)
      console.log(requestData.specialization)

      setLoading(true);
      try {  
        const response = await axios.post('http://localhost:8080/api/interns', requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Intern created successfully:", response.data);
        alert("Intern created successfully!");
        setFormData(initialFormState);
      } catch (error) {
        console.error("Error creating intern:", error);
        setError("Failed to create intern. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setError(""); 
  };



  return (
    <div className="px-8 py-16 flex flex-col items-center">
      <Card className="w-2/3 p-8">
        <CardHeader className="flex justify-center mb-8">
          <h1 className="text-3xl font-semibold text-green">Intern Registration Form</h1>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-y-6 md:container md:mx-auto">
            {/* Input Fields */}
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10">
              <Input
                label="Name"
                labelPlacement="outside"
                placeholder="Enter name"
                type="text"
                variant="bordered"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <Input
                label="NIC"
                labelPlacement="outside"
                placeholder="Enter NIC number"
                type="text"
                variant="bordered"
                value={formData.nic}
                onChange={(e) => handleChange("nic", e.target.value)}
              />
            </div>
            {/* More Fields */}
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10">
              <Input
                label="Mobile"
                labelPlacement="outside"
                placeholder="Enter mobile number"
                variant="bordered"
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
              />
              <Input
                label="Email"
                labelPlacement="outside"
                placeholder="Enter email"
                type="email"
                variant="bordered"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10">
              <Input
                label="Home Address/City"
                labelPlacement="outside"
                placeholder="Enter address/city"
                variant="bordered"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
              <Input
                label="Institute"
                labelPlacement="outside"
                placeholder="Enter Institute"
                type="text"
                variant="bordered"
                value={formData.institute}
                onChange={(e) => handleChange("institute", e.target.value)}
              />
            </div>
            
            <div className="flex w-full flex-wrap md:flex-nowrap mt-12 mb-6 md:mb-0 gap-10">
              <DatePicker
                label="Training Start Date"
                labelPlacement="outside"
                variant="bordered"
                value={formData.startDate}
                onChange={(date) => handleChange("startDate", date)}
              />
              <DatePicker
                label="Training End Date"
                labelPlacement="outside"
                variant="bordered"
                value={formData.endDate}
                onChange={(date) => handleChange("endDate", date)}
              />
            </div>
            
            <div className="grid w-full grid-cols-2 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-x-10 gap-y-6">
              <Select
                disableSelectorIconRotation
                label="Field of Specialization"
                labelPlacement="outside"
                placeholder="Select the field of specialization"
                variant="bordered"
                value={formData.specialization}
                onChange={(e) => handleChange("specialization", e.target.value)}
              >
                {fieldOfSpecialization.map((fieldOfSpecialization) => (
                  <SelectItem key={fieldOfSpecialization.label}>
                    {fieldOfSpecialization.label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Languages"
                labelPlacement="outside"
                placeholder="Enter languages known"
                type="text"
                variant="bordered"
                value={formData.languages}
                onChange={(e) => handleChange("languages", e.target.value)}
              />
              <Select
                label="Supervisor"
                labelPlacement="outside"
                placeholder="Select the Supervisor"
                variant="bordered"
                items={supervisors}
                value={formData.supervisor}
                onChange={(e) => handleChange("supervisor", e.target.value)}
              >
                {supervisors.map((supervisor) => (
                  <SelectItem key={supervisor.name}>
                    {`${supervisor.name} - ${supervisor.specialization}`}
                  </SelectItem>
                ))}
              </Select>
              {/* <select onChange={(value) => handleChange("supervisor", value)}>
                <option>Select the Supervisor</option>
                {supervisors.map((supervisor, index) => {
                  return(
                    <option key={index}>{supervisor.name}</option>
                  )
                })}
              </select> */}
            </div>
            
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-12">
              <Textarea
                label="Assigned Work"
                labelPlacement="outside"
                placeholder="Enter assigned work"
                variant="bordered"
                value={formData.assignedWork}
                onChange={(e) => handleChange("assignedWork", e.target.value)}
              />
            </div>
          
            <div className="grid w-full grid-cols-2 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10">
              <DatePicker
                label="Target Date"
                labelPlacement="outside"
                value={formData.targetDate}
                variant="bordered"
                onChange={(date) => handleChange("targetDate", date)}
              />
            </div>
            
            {error && <p className="text-red font-bold">{error}</p>}
           
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Button className="font-bold text-white bg-blue" onPress={handleCreateIntern}>
                Create Intern
              </Button>
              <Button
                variant="bordered"
                className="border-blue font-bold text-blue"
                onPress={handleReset}
              >
                Reset Form
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
