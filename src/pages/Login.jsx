import React from 'react'
import {Checkbox, Input, Button} from "@nextui-org/react";

const Login = () => {
  return (
    <div className='flex gap-32 items-center justify-center h-screen px-32'>
      <div className='w-4/12'>
        <h1 className='text-4xl font-semibold'>Welcome Back!</h1>
        <p className='text-gray-500'>Log in to Access and Manage Intern Registrations</p>
        <div className='mt-10 mb-4 flex flex-col gap-6'>
          <Input variant='bordered' size='lg' labelPlacement='outside' label="Email" placeholder="Enter your email" type="email" />
          <Input variant='bordered' size='lg' labelPlacement='outside' label="Password" placeholder="Enter your password" type="password" />
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Checkbox defaultSelected size="sm" color="default" radius="sm">Remember me</Checkbox>
          </div>
          <a href="" className='text-sm font-light text-gray-500 underline'>Forgot password?</a>
        </div>
        <div className='mt-8'>
          <a href="/"><Button className='w-full bg-blue font-bold text-white'>Log in</Button></a>
        </div>
      </div>

      <div className='w-8/12'>
        <a href="/"><img src="logo.png" alt="logo" /></a>
      </div>
    </div>
  )
}

export default Login