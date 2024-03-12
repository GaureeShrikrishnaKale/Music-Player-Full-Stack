import React from 'react';
import connectImage from "./../assets/image/connectImage2.jpeg";
import { motion } from 'framer-motion';
import { IoHelpBuoyOutline } from "react-icons/io5";
import { PiChatCircleDotsLight } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";

const ContactUs = () => {
  const text = "Let's Start a Conversation"
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
    <motion.div className='w-full h-510 flex justify-center items-center relative' 
    style={{ background: 'linear-gradient(to right, rgba(255, 192, 203, 0.7), rgba(218, 112, 214, 0.7), rgba(173, 216, 230, 0.7))' }}
    initial={{ y: -50, opacity: 0 }} // Initial position above the final position
    animate={{ y: 0, scale: [0.9, 1], opacity: [0, 1] }} // Animate to the final position
     transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className='absolute inset-0 flex items-end justify-center'
      // Background image with opacity
       style={{ backgroundImage: `url(${connectImage})`, opacity: 0.3, backgroundSize: "cover" }}
      >
        <p className='text-headingColor text-center text-5xl align-bottom text-black font-semibold p-3'  
        //Content
        >Get In Touch!</p>
      </div>
    </motion.div>

    <div>
      <motion.p 
      variants={textVariants}
      initial="hidden"
      animate="visible"
      className='text-headingColor text-center text-5xl text-black font-semibold p-7'>
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>{char}</motion.span>
        ))}
      </motion.p>
    </div>

    <div className='flex flex-col items-center gap-8 mb-10 '>
      <Card title={"HELP CENTER"} description={"Got questions? We have got answers"} icon={<IoHelpBuoyOutline/>} buttonTitle={"Visit Help Center"}/>

      <Card title={"CHAT"} description={"Typical reply time, within seconds Monday - Friday 10am 4pm IST"} icon={<PiChatCircleDotsLight/>} buttonTitle={"Chat With Us"}/>

      <Card title={"EMAIL"} description={"Typical reply time within a day or two Everyday 6am - 6pm IST"} icon={<MdAlternateEmail/>} buttonTitle={"Email Us"}/>
    </div>
    </>
  )
}

export const Card = ({title, description, icon, buttonTitle}) => {
// console.log(title, description, icon, buttonTitle);

const actionOnClick = () => {
  if(title === "HELP CENTER"){
    console.log("HELP CENTER Clicked !");
  }
  else if(title === "CHAT") {
    console.log("CHAT Clicked!");
  }
  else if(title === "EMAIL") {
    console.log("EMAIL Clicked!");
  }
  else {

  }
}
return (
  <motion.div
  initial={{ opacity: 0, translateX: -50 }}
  animate={{ opacity: 1, translateX: 0 }}
  transition={{ duration: 0.3, delay: 1 * 0.1 }} 
  className='border border-primary p-4 rounded-md shadow-2xl flex justify-items-center items-center w-656'
  >
    <div className='flex justify-center items-center text-5xl pr-4'>
    {icon}
    </div>
    <div className='flex flex-col justify-start items-start text-left w-460 mr-5'>
      <div className='font-semibold text-lg'>
      {title}
      </div>
      <div className='text-sm'>
        {description}
      </div>
    </div>
    <div className='flex justify-end items-end '>
      <motion.button
      whileTap={{scale: 0.75}} className='text-sm p-2 border bg-orange-500 rounded-md shadow-xl text-white hover:shadow-2xl hover:bg-orange-600 w-36'
      onClick={() => actionOnClick()}>
        {buttonTitle}
      </motion.button>
    </div>
  </motion.div>
);

}

export default ContactUs