import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider';
import { getAllUsers, getAllSongs, getAllArtists, getAllAlbums } from '../api';
import { bgColors } from "../utils/styles";
import { actionType } from '../context/reducer';
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { motion } from 'framer-motion';
import { TfiMoney } from "react-icons/tfi";
import { GrStatusGood } from "react-icons/gr";

export const Card = ({ name, description, price, buttonTitle, bgColor, features }) => {
  // console.log("count: ",name, price);

  const getSubscription = () => {
    console.log("Clicked!");
  };

  return (
  <motion.div 
  initial={{ y: -50, opacity: 0 }} // Initial position above the final position
  animate={{ y: 0, scale: [0.9, 1], opacity: [0, 1] }} // Animate to the final position
  transition={{ duration: 0.5, ease: "easeInOut" }}
  // whileHover={{scale: 1.02}}
  style={{ background: `${bgColor}`, transition: 'background-color 0.3s ease',}} 
  className={`p-4 w-64 h-420 rounded-lg shadow-md flex flex-col items-center hover:shadow-2xl`}>
    <p className='text-xl text-textColor font-semibold'>{name}</p>
    <div className='h-28 flex justify-center items-center'>
    <p className='text-md text-textColor text-center p-2'>{description}</p>
    </div>
    <div className='flex justify-center items-center'>
        <TfiMoney className='text-4xl text-textColor'/>
        <p className='text-5xl text-textColor'>{price}</p>
    </div>

    <div className=' text-textColor m-3 h-40 flex flex-col justify-center items-center'>
      {features && Array.isArray(features) && features.map((feature, index) => (
        <div key={index} className="">
          <GrStatusGood className=" absolute size-4 mt-1" />
          <p className="text-md ml-5">
          {feature}
          </p>
        </div>
      ))}
    </div>
    <div>
        <motion.button whileTap={{scale: 0.75}}
        className='p-2 m-3 rounded-md bg-primary hover:bg-yellow-200 shadow-md hover:shadow-lg w-36' onClick={() => {getSubscription();}}>
            {buttonTitle}
        </motion.button>
    </div>
  </motion.div>);
};

const Premium = () => {
  const text = "Right Plan For You!"
  const textVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };
  
  const letterVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <>
    <motion.p 
     variants={textVariants}
     initial="hidden"
     animate="visible"
    className='text-headingColor text-2xl p-4'>
      {text.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>{char}</motion.span>
        ))}
      </motion.p>
    <div className='w-full min-h-[480px] p-6 flex items-start justify-center gap-6 flex-wrap'>
       {/* prettier-ignore */}
      <Card name={"Free"} description = {"Unleash the rhythm, groove, and melody at one place -- all for free!"} price={0} buttonTitle={"Let's Go!"} bgColor={"lightgreen"} features={[
          "Access to basic music albums.",
          "Limited ad-supported experience."
        ]}/>

       {/* prettier-ignore */}
      <Card name={"Premium"} description = {"Upgrade to premium for an ad-free symphony with exclusive perks!"} price={6} buttonTitle={"Yes, Please!"} bgColor={"#FAE2FF"} features={[
        "Unlimited ad-free music streaming.",
        "Exclusive access to new releases and pre-release content.",
      ]} />

       {/* prettier-ignore */}
      <Card name={"Custom"} description = {"Craft your own sonic adventure with our custom version – where every beat is tailored to you! "} price={12} buttonTitle={"Call Us!"} bgColor={"#E9E2FF"} features={[
        "Ability to customize user interface.",
        "Customizable settings for audio playback.",
      ]}/>
    </div>
    </>
  )
}

export default Premium