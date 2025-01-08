import { Input, RadioGroup, Select, SelectItem, Radio, Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const educationalInstitute = [
    { key: "UOC", label: "University of Colombo" },
    { key: "IIT", label: "IIT" },
    { key: "NIBM", label: "NIBM" },
    { key: "SLIIT", label: "SLIIT" },
    { key: "other", label: "Other" },
];

export const academicYear = [
    { key: "1", label: "1st Year" },
    { key: "2", label: "2nd Year" },
    { key: "3", label: "2rd Year" },
    { key: "4", label: "4th Year" },
];

export const specialization = [
    { key: "QA", label: "QA" },
    { key: "FULLSTACK", label: "FullStack" },
    { key: "CLOUD", label: "Cloud" },
    { key: "UI/UX", label: "UI/UX" },
  ];


const ApplicationForm = () => {
    const navigate = useNavigate();
    const [selectedInstitute, setSelectedInstitute] = useState(""); 
    const [selectedYear, setSelectedYear] = useState(""); 
    const [selectedSpecialization, setSelectedSpecialization] = useState(""); 
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSelectInstitute = (value) => {
        setSelectedInstitute(value);
    };

    const handleSelectYear= (value) => {
        setSelectedYear(value);
    };

    const handleSelectSpecialization= (value) => {
        setSelectedSpecialization(value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleSubmit = () => {
        navigate('/applicationSubmitted');
    };

    

  return (
    <div className="px-40 py-10 flex flex-col items-center">
      <Card className="w-2/3 p-8">
        <CardHeader className="flex justify-center mb-4">
          <h1 className="text-2xl font-semibold text-green">Apply for your internship with SLTMobitel - Digital Platforms</h1>
        </CardHeader>
        <CardBody>
            <ol className="list-decimal pl-4 text-sm text-gray-500 space-y-1 mb-12">
                <li>Complete all fields in the application form accurately before submitting.</li>
                <li>If selected, you will receive an email with further instructions and details about the process.</li>
                <li>The email will include a date for an in-person meeting. On that day, bring all required documents listed below.</li>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>National Identity Card (NIC) Copy</li>
                        <li>Police Report</li>
                        <li>Letter from the University Confirming the Eligibility to Undertake the Internship</li>
                    </ul>
            </ol>
          <div className="flex flex-col gap-y-8 md:container md:mx-auto">
            {/* Personal information Fields */}
                <Input
                    label={
                        <span>
                        1. Name<span className="text-red"> *</span>
                        </span>
                    }
                    labelPlacement="outside"
                    placeholder="Enter name"
                    type="text"
                    variant="bordered"
                />
                <Input
                    label={
                        <span>
                        2. NIC Number<span className="text-red"> *</span>
                        </span>
                    }
                    labelPlacement="outside"
                    placeholder="Enter NIC number"
                    type="text"
                    variant="bordered"
                />
                <Input
                    label={
                        <span>
                        3. Mobile Number<span className="text-red"> *</span>
                        </span>
                    }
                    labelPlacement="outside"
                    placeholder="Enter mobile number"
                    variant="bordered"
                    type="tel"
                />
                <Input
                    label={
                        <span>
                        4. Email Address<span className="text-red"> *</span>
                        </span>
                    }
                    labelPlacement="outside"
                    placeholder="Enter email address"
                    type="email"
                    variant="bordered"
                />
                <Input
                    label={
                        <span>
                        5. Home Address<span className="text-red"> *</span>
                        </span>
                    }
                    labelPlacement="outside"
                    placeholder="Enter address/city"
                    variant="bordered"
                />
            
            {/* educational information firelds */}
                <div className="flex w-full flex-wrap mt-12 md:flex-nowrap md:mb-0 gap-6">
                    <Select
                        disableSelectorIconRotation
                        label={
                        <span>
                            6. Educational Institute<span className="text-red"> *</span>
                        </span>
                        }
                        labelPlacement="outside"
                        placeholder="Select the educational institute"
                        variant="bordered"
                        onChange={(e) => handleSelectInstitute(e.target.value)} 
                    >
                        {educationalInstitute.map((item) => (
                        <SelectItem key={item.key} value={item.key}>
                            {item.label}
                        </SelectItem>
                        ))}
                    </Select>
                    <Input
                        label={<span>Other</span>}
                        labelPlacement="outside"
                        placeholder="Enter educational institute"
                        variant="bordered"
                        isDisabled={selectedInstitute !== "other"} 
                    />
                </div>

                <Input
                    label={
                        <span>
                        7. Degree/Course<span className="text-red"> *</span>
                        </span>
                    }
                    labelPlacement="outside"
                    placeholder="Enter degree/course"
                    variant="bordered"
                />
                
                <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-6">
                    <Select
                        disableSelectorIconRotation
                        label={
                        <span>
                            8. Current Academic Year<span className="text-red"> *</span>
                        </span>
                        }
                        labelPlacement="outside"
                        placeholder="Select the current academic year"
                        variant="bordered"
                        onChange={(e) => handleSelectYear(e.target.value)} 
                    >
                        {academicYear.map((item) => (
                        <SelectItem key={item.key} value={item.key}>
                            {item.label}
                        </SelectItem>
                        ))}
                    </Select>
                    <Input
                        label={
                            <span>
                            9. Internship Period(In Months)<span className="text-red"> *</span>
                            </span>
                        }
                        labelPlacement="outside"
                        placeholder="Enter internship period"
                        variant="bordered"
                    />
                </div>

            {/* field of specialization */}
                <div className="flex w-full flex-wrap mt-12 md:flex-nowrap md:mb-0 gap-6">
                    <Select
                        className="w-1/2"
                        disableSelectorIconRotation
                        label={
                        <span>
                            10. Field of Specialization<span className="text-red"> *</span>
                        </span>
                        }
                        labelPlacement="outside"
                        placeholder="Select the field of specialization"
                        variant="bordered"
                        onChange={(e) => handleSelectSpecialization(e.target.value)} 
                    >
                        {specialization.map((item) => (
                        <SelectItem key={item.key} value={item.key}>
                            {item.label}
                        </SelectItem>
                        ))}
                    </Select>
                    <RadioGroup 
                        label={
                            <span className="text-black text-sm">
                                10. Familiar with Programming Languages?<span className="text-red"> *</span>
                            </span>
                        } 
                        className="w-1/2"
                        orientation="horizontal">
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                    </RadioGroup>
                </div>

            {/* resume upload */}
                <div className="flex flex-col gap-4 w-1/2 mt-12">
                    <label htmlFor="file-upload" className="flex flex-col text-sm">
                        <span className="flex items-center">
                            11. Upload Resume<span className="text-red ml-1">*</span>
                        </span>
                        <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        />
                    </label>

                    <div className="flex gap-2 items-center">
                        <Button as="label" htmlFor="file-upload" variant="bordered">
                            Select File
                        </Button>

                        {selectedFile && (
                            <p className="text-sm text-gray-500">
                            Selected File: {selectedFile.name}
                            </p>
                        )}
                    </div>  
                </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-8">
              <Button className="font-bold text-white bg-green w-1/2" onPress={handleSubmit}>
                Submit Application
              </Button>
              <Button color="default" variant="bordered" className="text-gray-400 font-bold w-1/2" onPress={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default ApplicationForm