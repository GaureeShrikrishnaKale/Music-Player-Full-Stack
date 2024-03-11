import React from 'react'
import { useStateValue } from '../context/StateProvider'
import { motion } from 'framer-motion';

const UserProfile = () => {
  const [{user}, dispatch] = useStateValue();
  console.log("useStateVAl:", user);
  return (
    <motion.div 
    initial={{ y: -50, opacity: 0 }} // Initial position above the final position
    animate={{ y: 0, scale: [0.9, 1], opacity: [0, 1] }} // Animate to the final position
    transition={{ duration: 0.5, ease: "easeInOut" }} 
    className={`w-full h-full flex flex-col 
    justify-center
    items-center h-65 min-h-72
    `}>
      <p className='flex justify-center items-center text-4xl font-semibold mb-5'>User Profile</p>
    <div
    className='flex justify-center items-center p-8 rounded-xl shadow-xl hover:shadow-2xl'>
      <div className='flex justify-center items-center'>
        <img src={user?.user?.imageURL} className='h-32 w-32 rounded-full shadow-xl hover:shadow-2xl'/>
      </div>
      <div className='text-xl  ml-10 font-serif'>
        <p>Name: {user?.user?.name}</p>
        <p>Email: {user?.user?.email}</p>
        <p>Email Verified: {user?.user?.email_verified ? "Yes" : "No"} </p>
        <p>Role: {user?.user?.role === "admin" ? "Admin" : "User"}</p>
      </div>
    </div>
    </motion.div>
  )
}

export default UserProfile