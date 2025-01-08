import React from 'react'
import {Button} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const ThankYouForApply = () => {
    const navigate = useNavigate();
  
    const handleBack = () => {
        navigate('/');
    };

  return (
    <div className='flex flex-col items-center mt-16'>
        <img src="logo.png" alt="logo" className='w-96' />
        <div className='flex flex-col mt-20 justify-center mx-auto items-center mb-6'>
            <h1 className='text-2xl font-bold'>Thank You!</h1>
            <h2 className='text-gray-500'>Your application was successfully submitted.</h2>
        </div>
        <Button color="default" variant="bordered" className="text-gray-400 font-bold" onPress={handleBack}>
            Back to Home
        </Button>
    </div>
  )
}

export default ThankYouForApply