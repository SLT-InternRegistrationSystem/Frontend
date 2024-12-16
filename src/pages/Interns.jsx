import React, {useEffect, useState} from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; 
import "./InternList.css";
import {Button, Input, Pagination, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Interns = () => {
  // Modal state for "view more"
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const [selectedIntern, setSelectedIntern] = useState(null);

  const handleViewDetails = (intern) => {
    setSelectedIntern(intern);
    onViewOpen();
  };


  // Modal state for "edit"
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [editingIntern, setEditingIntern] = useState(null);

  const handleEditIntern = (intern) => {
    setEditingIntern(intern);
    onEditOpen();
  };


  // Modal state for "delete"
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [internToDelete, setInternToDelete] = useState(null);

  const handleDeleteInternModal = (intern) => {
    setInternToDelete(intern);
    onDeleteOpen();
  };


  //API call to edit intern
  const handleSaveEdit = () => {
    axios.put(`http://localhost:8080/api/interns/${editingIntern.internID}`, editingIntern)
      .then((response) => {
        setInterns((prev) =>
          prev.map((intern) =>
            intern.internID === editingIntern.internID ? response.data : intern
          )
        );
        setFilteredInterns((prev) =>
          prev.map((intern) =>
            intern.internID === editingIntern.internID ? response.data : intern
          )
        );
        onEditClose();
      }).catch((error) => {
        console.error("Error updating intern:", error);
      });
  };


  //API call to delete intern
  const confirmDeleteIntern = () => {
    axios
      .delete(`http://localhost:8080/api/interns/${internToDelete.internID}`)
      .then(() => {
        setInterns((prev) => prev.filter((item) => item.internID !== internToDelete.internID));
        setFilteredInterns((prev) => prev.filter((item) => item.internID !== internToDelete.internID));
        console.log(`${internToDelete.name} has been deleted successfully.`);
        onDeleteClose();
      })
      .catch((error) => {
        console.error("Error deleting intern:", error);
      });
  };



  //API call to display interns & filter by searching them
  const [interns, setInterns] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredInterns, setFilteredInterns] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/interns').then((response) => {
      console.log(response.data);
      const activeInterns = response.data.filter(intern => intern.state === 1);
      setInterns(activeInterns);
      setFilteredInterns(activeInterns);
    }).catch(error => {
      console.log(error);
    })
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase(); 
    const results = interns.filter((intern) =>
      Object.values(intern).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(lowerCaseQuery)
      )
    );
    setFilteredInterns(results);
    setCurrentPage(1); 
  }, [searchQuery, interns]);



  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(filteredInterns.length / rowsPerPage);
  const displayedInterns = filteredInterns.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  //Export All Trainees to Excel
  const exportAllTrainees = () => {
    const worksheet = XLSX.utils.json_to_sheet(interns); 
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Trainees");
    XLSX.writeFile(workbook, "All_Trainees.xlsx"); 
  };

  //Export Active Trainees to Excel
  const exportActiveTrainees = () => {
    const activeTrainees = interns.filter(intern => intern.state === 1); 
    const worksheet = XLSX.utils.json_to_sheet(activeTrainees); 
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Active Trainees");
    XLSX.writeFile(workbook, "Active_Trainees.xlsx"); 
  };



  return (
    <div className="px-8 py-16">
      <div className="flex justify-between items-center">
        <a href="/"><Button className="bg-green font-bold text-white">Create New Intern</Button></a>
        <Input
          size="md"
          startContent={<IoSearch className="text-default-400" />}
          isClearable
          className="max-w-xs"
          placeholder="Type here to search"
          type="text"
          variant="bordered"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          onClear={() => setSearchQuery("")} 
        />
        <Pagination
          classNames={{ cursor: "bg-green dark:from-default-300 text-white font-bold" }}
          loop
          showControls
          color="success"
          initialPage={1}
          total={totalPages}
          onChange={(page) => handlePageChange(page)}
        />
      </div>

      <div className="table_component mt-10" role="region" tabIndex="0">
        <table>
          <thead className="text-sm font-thin">
            <tr>
              <th>INTERN_ID</th>
              <th>NAME</th>
              <th>NIC</th>
              <th>TRAINING ENDS</th>
              <th>INSTITUTE</th>
              <th>SPECIALIZATION</th>
              <th>SUPERVISOR</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {
              displayedInterns.map((intern, index) =>
                <tr key={index}>
                  <td>{intern.internID}</td>
                  <td>{intern.name}</td>
                  <td>{intern.nic}</td>
                  <td>{intern.endDate}</td>
                  <td>{intern.institute}</td>
                  <td>{intern.specialization}</td>
                  <td>{intern.supervisor.name}</td>
                  <td>
                    <div className="relative flex items-center gap-2">
                      <Tooltip content="Details">
                        <span
                          className="text-lg text-default-400 cursor-pointer active:opacity-50"
                          onClick={() => handleViewDetails(intern)}
                        >
                          <FaRegEye />
                        </span>
                      </Tooltip>
                      <Tooltip content="Edit Intern">
                        <span 
                          className="text-lg text-default-400 cursor-pointer active:opacity-50"
                          onClick={() => handleEditIntern(intern)}
                        >
                          <FaRegEdit />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Delete user">
                        <span 
                          className="text-lg text-danger cursor-pointer active:opacity-50" 
                          onClick={() => handleDeleteInternModal(intern)}>
                          <MdDeleteOutline />
                        </span>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        <div className='flex gap-4 mt-10'>
          <Button onPress={exportAllTrainees} variant='bordered' className='bg-white border-blue font-bold text-blue'>Export All Trainees to Excel</Button>
          <Button onPress={exportActiveTrainees} variant='bordered' className='bg-white border-green font-bold text-green'>Export Active Trainees to Excel</Button>
        </div>
      </div>

      {/* view more modal */}
      <Modal scrollBehavior='inside' isOpen={isViewOpen} onOpenChange={onViewClose} size='5xl' style={{height:"600px"}}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-blue">
            {selectedIntern 
              ? `${selectedIntern.internID} - ${selectedIntern.name}` 
              : "Intern Details"}
          </ModalHeader>
          <ModalBody>
            {selectedIntern ? (
              <div>
                <div className='grid grid-cols-2 gap-y-5 gap-x-7 m-auto'>
                  <Input isDisabled label="Intern_ID" labelPlacement="outside" placeholder={selectedIntern.internID} type="text" />
                  <Input isDisabled label="Name" labelPlacement="outside" placeholder={selectedIntern.name} type="text" />
                  <Input isDisabled label="NIC" labelPlacement="outside" placeholder={selectedIntern.nic} type="text" />
                  <Input isDisabled label="Mobile" labelPlacement="outside" placeholder={selectedIntern.mobile} type="text" />
                  <Input isDisabled label="Email" labelPlacement="outside" placeholder={selectedIntern.email} type="email" />
                  <Input isDisabled label="Address" labelPlacement="outside" placeholder={selectedIntern.address} type="text" />
                  <Input isDisabled label="Institute" labelPlacement="outside" placeholder={selectedIntern.institute} type="text" />
                </div>
                <div className='grid grid-cols-2 mt-16 gap-y-5 gap-x-10 m-auto'>
                  <Input isDisabled label="Start Date" labelPlacement="outside" placeholder={selectedIntern.startDate} type="text" />
                  <Input isDisabled label="End Date" labelPlacement="outside" placeholder={selectedIntern.endDate} type="text" />
                  <Input isDisabled label="Field of Specialization" labelPlacement="outside" placeholder={selectedIntern.specialization} type="text" />
                  <Input isDisabled label="Languages Known" labelPlacement="outside" placeholder={selectedIntern.languages} type="text" />
                  <Input isDisabled label="Supervisor" labelPlacement="outside" placeholder={selectedIntern.supervisor.name} type="email" />
                  <Input isDisabled label="Target Date" labelPlacement="outside" placeholder={selectedIntern.targetDate} type="text" />
                </div>
                <div className='mt-16'>
                  <Textarea
                    isDisabled
                    className="w-full"
                    label="Assigned Work"
                    labelPlacement="outside"
                    placeholder={selectedIntern.assignedWork}
                  />
                </div>
              </div>
            ) : (
              <p>No details available</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button className='text-red font-bold border-red' variant="bordered" onPress={onViewClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* edit modal */}
      <Modal scrollBehavior="inside" isOpen={isEditOpen} onOpenChange={onEditClose} size="5xl">
        <ModalContent>
          <ModalHeader className='text-blue'>Edit Intern Details</ModalHeader>
          <ModalBody>
            {editingIntern ? (
              <div>
                <div className="grid grid-cols-2 gap-y-5 gap-x-7 m-auto">
                  <Input label="Intern_ID" labelPlacement="outside" value={editingIntern.internID} isDisabled type="text"/>
                  <Input label="Name" labelPlacement="outside" value={editingIntern.name} onChange={(e) => setEditingIntern({ ...editingIntern, name: e.target.value })} type="text"/>
                  <Input label="NIC" labelPlacement="outside" value={editingIntern.nic} onChange={(e) => setEditingIntern({ ...editingIntern, nic: e.target.value })} type="text"/>
                  <Input label="Mobile" labelPlacement="outside" value={editingIntern.mobile} onChange={(e) => setEditingIntern({ ...editingIntern, mobile: e.target.value })} type="text"/>
                  <Input label="Email" labelPlacement="outside" value={editingIntern.email} onChange={(e) => setEditingIntern({ ...editingIntern, email: e.target.value })} type="text"/>
                  <Input label="Address" labelPlacement="outside" value={editingIntern.address} onChange={(e) => setEditingIntern({ ...editingIntern, address: e.target.value })} type="text"/>
                  <Input label="Institute" labelPlacement="outside" value={editingIntern.institute} onChange={(e) => setEditingIntern({ ...editingIntern, institute: e.target.value })} type="text"/>
                </div>
                <div className="grid grid-cols-2 mt-16 gap-y-5 gap-x-7 m-auto">
                  <Input label="Start Date" labelPlacement="outside" value={editingIntern.startDate} onChange={(e) => setEditingIntern({ ...editingIntern, startDate: e.target.value })} type="text"/>
                  <Input label="End Date" labelPlacement="outside" value={editingIntern.endDate} onChange={(e) => setEditingIntern({ ...editingIntern, endDate: e.target.value })} type="text"/>
                  <Input label="Field of Specialization" labelPlacement="outside" value={editingIntern.specialization} onChange={(e) => setEditingIntern({ ...editingIntern, specialization: e.target.value })} type="text"/>
                  <Input label="Languages Known" labelPlacement="outside" value={editingIntern.languages} onChange={(e) => setEditingIntern({ ...editingIntern, languages: e.target.value })} type="text"/>
                  <Input label="Supervisor" labelPlacement="outside" value={editingIntern.supervisor.name} isDisabled type="text"/>
                  <Input label="Target Date" labelPlacement="outside" value={editingIntern.targetDate} onChange={(e) => setEditingIntern({ ...editingIntern, targetDate: e.target.value })} type="text"/>
                </div>
                <div className='mt-16'>
                  <Textarea className="w-full" label="Assigned Work" labelPlacement="outside" value={editingIntern.assignedWork} onChange={(e) => setEditingIntern({ ...editingIntern, assignedWork: e.target.value })}/>
                </div>
              </div>
            ) : (
              <p>No details available</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              className="text-red font-bold border-red"
              variant="bordered"
              onPress={onEditClose}
            >
              Cancel
            </Button>
            <Button
              className="bg-green text-white font-bold"
              onPress={handleSaveEdit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* delete modal */}
      <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteClose} size="sm">
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete {internToDelete?.name}?</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" className="text-red font-bold border-red" onPress={onDeleteClose}>
              Cancel
            </Button>
            <Button
              className="bg-red text-white font-bold"
              onPress={confirmDeleteIntern}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Interns;