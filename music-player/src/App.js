// import './App.css';
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard, Home, Login } from "./components";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { AnimatePresence } from 'framer-motion';
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import { motion } from "framer-motion";
import MusicPlayer from "./components/MusicPlayer";
import MusicsPage from "./components/MusicsPage";
import Layout from "./components/Layout";
import Premium from "./components/Premium";
import ContactUs from "./components/ContactUs";
import Favorites from "./components/Favorites";
import UserProfile from "./components/UserProfile";

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{user, isSongPlaying, song}, dispatch] = useStateValue();
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === 'true');

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      console.log("user: ", userCred);
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log("token: ", token);
          validateUser(token).then((data) => {
            console.log(data);
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          })
        })
      }
      else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        navigate("/login");
      }
    })
  }, [])
  return (
    <AnimatePresence 
    //exitBeforeEnter
    mode="wait"
    >
      <div className='h-auto min-w-[680px] bg-primary flex justify-center items-center'>
        <Routes>
          <Route path='/login' element={<Login setAuth={setAuth} />} />

          <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path="/musics" element={<MusicsPage/>}/>
          <Route path="/premium" element={<Premium/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/userProfile" element={<UserProfile/>}/>
          </Route>

          <Route path='/dashboard/*' element={<Dashboard/>}/>
        </Routes>

        {
          isSongPlaying && (
            <motion.div
            initial={{opacity : 0 , y : 50}}
            animate={{opacity : 1, y: 0}}
            className={`fixed min-w-[700px] h-28 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}>
              <MusicPlayer/>
            </motion.div>
          )
        }
      </div>
    </AnimatePresence>
  );
}

export default App;
