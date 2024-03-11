import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {IoAdd, IoPause, IoPlay, IoTrash} from "react-icons/io5";
import {AiOutlineClear} from "react-icons/ai";
import { useStateValue } from '../context/StateProvider';
import { getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import SongCard from './SongCard';
import { LuFolderHeart } from "react-icons/lu";
import { motion } from 'framer-motion';

const Favorites = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocuse, setIsFocuse] = useState(false);
  const [{allSongs}, dispatch] = useStateValue();
  const [filteredSongs, setFilteredSongs] = useState(null);
  useEffect(() => {
    if(!allSongs) {
      getAllSongs().then(data => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        })
      });
    }
  },[]);

  useEffect(() => {
    if (songFilter.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(songFilter) ||
          data.language.toLowerCase().includes(songFilter) ||
          data.name.toLowerCase().includes(songFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [songFilter]);

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='w-full flex justify-center items-center gap-20'>
        <NavLink 
        to={"/favorites"} className={"cursor-pointer text-textColor text-2xl"}>
          <LuFolderHeart/>
        </NavLink>
        <input 
        className={`w-60 px-4 py-2 border ${isFocuse ? "border-gray-500 shadow-md" : "border-gray-300"} rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`} type="text" placeholder='Search Here...' value={songFilter} onChange={(e) => setSongFilter(e.target.value)}
        onBlur={() => {setIsFocuse(false)}}
        onFocus={() => setIsFocuse(true)}
        />

         {songFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setSongFilter("");
              setFilteredSongs(null);
            }}
          >
            <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
          </motion.i>
        )}
      </div>

      {/* main container */}
      <div className='relative w-full my-4 p-4 border border-gray-300 rounded-md'>
        {/* the count */}
        <div className=' top-4 left-4 '>
          <p className='text-xl font-bold'>
            <span className='text-sm font-semibold text-textColor'>
              Count : {" "}
            </span>
            {filteredSongs ? filteredSongs?.length : allSongs?.length}
          </p>
        </div>
        <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>
  )
}

export const SongContainer = ({data}) => {
  return(
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {
        data && data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i}/>
        ))
      }
    </div>
  );
};

export default Favorites