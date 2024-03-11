import React, { useState } from 'react';
import {motion} from "framer-motion";
import { IoTrash } from 'react-icons/io5';
import { useStateValue } from '../context/StateProvider';
import { deleteSongById, getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import { storage } from '../config/firebase.config';
import { deleteObject, ref } from 'firebase/storage';
import { GrFavorite } from "react-icons/gr";

const SongCard = ({data, index}) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [addToFav, setAddToFav] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);
    const location = window.location.pathname;
  
    const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();

    const deleteSong = (id) => {
        console.log(id);
        const deleteRef = ref(storage, data.imageURL);

        deleteObject(deleteRef).then(() => {
            setAlert("success");
            setAlertMsg("File removed successfully");
            setTimeout(() => {
              setAlert(null);
            }, 4000);
        });

        deleteSongById(id).then((res) => {
          // console.log(res.data);
          if (res.data.success) {
            setAlert("success");
            setAlertMsg(res.data.msg);
            getAllSongs().then((data) => {
              dispatch({
                type: actionType.SET_ALL_SONGS,
                allSongs: data.song,
              });
            });
            setIsDeleted(false);
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

      const  addToContext = () => {
        if(!isSongPlaying) {
            dispatch({
                type: actionType.SET_SONG_PLAYING,
                isSongPlaying: true,
            });
        }

        if(song !== index) {
            dispatch({
                type: actionType.SET_SONG,
                song: index,
            });
        }
      }

      const addToFavorite = (id) => {
        console.log("to add to fav: ", id);

      }



  return (
    <motion.div 
    whileTap={{scale : 0.90}} 
    initial={{ opacity: 0, translateX: -50 }}
    animate={{ opacity: 1, translateX: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }} 
    className='relative overflow-hidden  w-44 h-72 min-w-180 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center'
    onClick={addToContext}
    >

    {isDeleted && (
            <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="absolute z-10 p-2 inset-0 bg-card backdrop-blur-md flex flex-col gap-6 items-center justify-center"
            >
            <p className="text-sm text-center text-textColor font-semibold">
                Are you sure do you want to delete this song?
            </p>

            <div className="flex items-center gap-3">
                <button
                className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-teal-400"
                onClick={(e) => {e.stopPropagation(); deleteSong(data._id);}}
                >
                Yes
                </button>
                <button
                className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-gray-400"
                onClick={(e) => { e.stopPropagation(); setIsDeleted(false); }}
                >
                No
                </button>
            </div>
            </motion.div>
        )}

{addToFav && (
            <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="absolute z-10 p-2 inset-0 bg-card backdrop-blur-md flex flex-col gap-6 items-center justify-center"
            >
            <p className="text-sm text-center text-textColor font-semibold">
                Add this song to Favorites?
            </p>

            <div className="flex items-center gap-3">
                <button
                className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-teal-400"
                onClick={(e) => {e.stopPropagation(); addToFavorite(data._id);}}
                >
                Yes
                </button>
                <button
                className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-gray-400"
                onClick={(e) => { e.stopPropagation(); setAddToFav(false); }}
                >
                No
                </button>
            </div>
            </motion.div>
        )}

        <div className='w-40 min-w-[160px] h-40 min-h-[160px]  rounded-lg drop-shadow-lg relative overflow-hidden'>
            <motion.img 
            whileHover={{scale : 1.05}} src={data.imageURL} className='w-full h-full rounded-lg object-cover'/>
        </div>

        <p className='flex flex-col justify-center items-center text-base text-headingColor  font-semibold my-2'>
           <span className='flex justify-center items-center flex-wrap text-center'> {data.name.length > 25 ? `${data.name.slice(0,25)}...` : data.name}</span>

          {
            data.artist && (
                <span className='block text-sm text-gray-400 my-1 text-center'>{data.artist.length > 16 ? `${data.artist.slice(0,16)}...` : data.artist}</span>
            )
          }
        </p>

        {
            location === "/dashboard/songs" && (
                <div className='w-full absolute bottom-2 right-2 flex items-center justify-between px-4'>
                    <motion.i 
                    whileTap={{scale: 0.75}}   className='text-base text-red-400 drop-shadow-md hover:text-red-600' onClick={(e) => { e.stopPropagation(); setIsDeleted(true); }}>
                        <IoTrash/>
                    </motion.i>
                </div>
            )
        }

        {
            location === "/musics" && (
                <div className='w-full absolute bottom-2 right-2 flex items-center justify-end'>
                    <motion.i 
                    whileTap={{scale: 0.75}}   className='text-base text-red-400 drop-shadow-md hover:text-red-600' onClick={(e) => { e.stopPropagation(); setAddToFav(true); }}>
                        <GrFavorite/>
                    </motion.i>
                </div>
            )
        }
    </motion.div>
  );
};

export default SongCard;