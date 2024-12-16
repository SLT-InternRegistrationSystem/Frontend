import { Input } from "@nextui-org/react";
import { DateInput } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import {Select, SelectItem} from "@nextui-org/react";

//---------------------------- for the select field---------------------
export const SelectorIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M8 9l4 -4l4 4" />
      <path d="M16 15l-4 4l-4 -4" />
    </svg>
  );
};

export const fieldOfSpecialization = [
  {key: "QA", label: "Quality assurance"},
  {key: "SE", label: "Software Engineering"},
  {key: "CS", label: "Computer Science"},
  {key: "UI/UX", label: "UI/UX"},
  
];
//---------------------------- end of the select field---------------------

export default function App() {
  return (
    <div className="flex flex-col gap-4 p-5 ">
      <h1 className="text-center text-2xl">Intern Registration Form</h1>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          label="Name"
          labelPlacement="outside"
          placeholder="Enter your name"
          type="text"
        />
        <Input
          label="NIC"
          labelPlacement="outside"
          placeholder="Enter your NIC number"
          type="text"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          label="Mobile"
          labelPlacement="outside"
          placeholder="Enter your mobile number"
          type="tel"
        />
        <Input
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
          type="email"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          label="Home Address/City"
          labelPlacement="outside"
          placeholder="Enter your address"
          type="text"
        />
        <Input
          label="Institute"
          labelPlacement="outside"
          placeholder="Enter your Institute"
          type="text"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <DateInput
          label="Training Start Date"
          labelPlacement="outside"
          placeholderValue={new CalendarDate(1995, 11, 6)}
        />
        <DateInput
          label="Training End Date"
          labelPlacement="outside"
          placeholderValue={new CalendarDate(1995, 11, 6)}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
         <Select
              disableSelectorIconRotation
              className="max-w-xs"
              label="Field of Specialization"
              labelPlacement="outside"
              placeholder="Select the field of specialization"
              selectorIcon={<SelectorIcon />}
            >
              {fieldOfSpecialization.map((fieldOfSpecialization) => (
                <SelectItem key={fieldOfSpecialization.key}>{fieldOfSpecialization.label}</SelectItem>
              ))}
            </Select>
        
      </div>
    </div>
  );
}
