import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { deleteAlbumById, getAllAlbums } from "../api";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

const DashboardAlbums = () => {
  const [{ allAlbums }, dispatch] = useStateValue();
  const location = window.location.pathname;

  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.album });
      });
    }
  }, []);
  return (
    <div className="w-full 
    p-4
    flex items-center justify-center flex-col">
     {
      location === "/musics" && (
        <p className='text-xl font-bold text-left'>
        <span className='text-sm font-semibold text-textColor'>
          Albums
        </span>
        </p>
      )
     }
      <div className={`relative w-full gap-3  my-4 p-4 py-12 
      ${location !== "/musics" ? "border border-gray-300 rounded-md" : ""}
       flex flex-wrap justify-evenly`}>
        {allAlbums &&
          allAlbums.map((data, index) => (
            <>
              <AlbumCard key={index} data={data} index={index} />
            </>
          ))}
      </div>
    </div>
  );
};

export const AlbumCard = ({ data, index }) => {
  const [isDelete, setIsDelete] = useState(false);
  const location = window.location.pathname;
  // console.log("locc:",location);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [{ allAlbums, artist }, dispatch] = useStateValue();

  const deleteAlbum = (id) => {
    console.log(id);
    const deleteRef = ref(storage, data.imageURL);

    deleteObject(deleteRef).then(() => {
        setAlert("success");
        setAlertMsg("File removed successfully");
        setTimeout(() => {
          setAlert(null);
        }, 4000);
    });

    deleteAlbumById(id).then((res) => {
      // console.log(res.data);
      if (res.data.success) {
        setAlert("success");
        setAlertMsg(res.data.msg);
        getAllAlbums().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.album,
          });
        });
        setIsDelete(false);
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      } else {
        setAlert("error");
        setAlertMsg(res.data.msg);
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative  overflow-hidden w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
    >

{isDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4"
        >
          <p className="text-gray-100 text-base text-center">
            Are you sure do you want to delete this?
          </p>
          <div className="flex items-center w-full justify-center gap-3">
            <div className="bg-red-300 px-3 rounded-md"
             onClick={() => deleteAlbum(data._id)}
            >
              <p className="text-headingColor text-sm">Yes</p>
            </div>
            <div
              className="bg-green-300 px-3 rounded-md"
              onClick={() => setIsDelete(false)}
            >
              <p className="text-headingColor text-sm">No</p>
            </div>
          </div>
        </motion.div>
      )}

      <img
        src={data?.imageURL}
        className="w-full h-40 object-cover rounded-md"
        alt=""
      />

      <p className="text-base text-textColor mb-3 text-center">{data.name}</p>

     {
      location === "/dashboard/albums" && (
        <motion.i
        className="absolute bottom-2 right-2"
        whileTap={{ scale: 0.75 }}
        onClick={() => setIsDelete(true)}
      >
        <MdDelete className=" text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
      </motion.i>
      )
     }

    </motion.div>
  );
};

export default DashboardAlbums;