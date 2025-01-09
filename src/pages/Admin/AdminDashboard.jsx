import React from 'react';
import { Card, CardBody, CardHeader, Calendar } from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";
import InternStatusOverview from '../../components/Admin/Dashboard/InternStatusOverview';
import SpecializationWiseInternDistribution from '../../components/Admin/Dashboard/SpecializationWiseInternDistribution';
import NewInternRegistrationOverview from '../../components/Admin/Dashboard/NewInternRegistrationOverview';

const AdminDashboard = () => {
  return (
    <div className='bg-[#f9f9f9]'>
      <div className='flex flex-col'>
        <div className='flex gap-2 mx-6 my-2'>
          <Card className='h-80 flex-shrink-0'>
            <CardHeader>
              <h1 className='text-lg font-semibold text-gray-600'>Intern Status Overview</h1>
            </CardHeader>
            <CardBody>
              <InternStatusOverview />
            </CardBody>
          </Card>

          <Card className='h-80 flex-grow'>
            <CardHeader>
              <h1 className='text-lg font-semibold text-gray-600'>New Intern Registration Overview</h1>
            </CardHeader>
            <CardBody>
              <NewInternRegistrationOverview />
            </CardBody>
          </Card>
        </div>
        <div className='flex gap-2 mx-6'>
          <Card className='h-80 flex-shrink-0'>
            <CardHeader>
              <h1 className='text-lg font-semibold text-gray-600'>Specialization-Wise Intern Distribution</h1>
            </CardHeader>
            <CardBody>
              <SpecializationWiseInternDistribution />
            </CardBody>
          </Card>
          <Card className='h-80 flex-grow'>
            <CardHeader className='pb-0'>
              <h1 className='text-lg font-semibold text-gray-600'>Calendar</h1>
            </CardHeader>
            <CardBody className='flex items-center justify-center pt-0'>
              <Calendar color='success' showMonthAndYearPickers aria-label="Date (Show Month and Year Picker)" value={today(getLocalTimeZone())} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
