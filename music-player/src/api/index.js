import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const validateUser = async (token) => {
    try{
        const res = await axios.get(`${baseURL}api/users/login`,{
            headers: {
                Authorization : "Bearer " + token,
            },
        });
        return res.data;
    } catch (error) {

    }
};

export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}api/users/getUsers`);
        console.log("d",res.data);
        return res.data;
    }catch(error) {
        return null;
    }
}

export const getAllArtists = async () => {
    try {
      const res = await axios.get(`${baseURL}api/artists/getAll`);
      console.log("dd",res.data);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const removeUser = async (userId) => {
    try {
      const res = axios.delete(`${baseURL}api/users/deleteUser/${userId}`);
      console.log("ddd",res.data);
      return res;
    } catch (error) {
      return null;
    }
  };

  export const getAllSongs = async () => {
    try {
      const res = await axios.get(`${baseURL}api/songs/getAll`);
      console.log("dddd",res.data);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const getAllAlbums = async () => {
    try {
      const res = await axios.get(`${baseURL}api/albums/getAll`);
      console.log("ddddd",res.data.album);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const changingUserRole = async (userId, role) => {
    console.log("*************** Role 3:",role);
    try {
        console.log("*************** Role 4:",role);
      const res = axios.put(`${baseURL}api/users/updateRole/${userId}/${role}`);
      console.log("*************** Role 5:",role,res);
      return res;
    } catch (error) {
      return null;
    }
  };
  
  export const saveNewArtist = async (data) => {
    try {
      const res = axios.post(`${baseURL}api/artists/save`, { ...data });
      return (await res).data.artist;
    } catch (error) {
      return null;
    }
  };
  
  export const saveNewAlbum = async (data) => {
    try {
      const res = axios.post(`${baseURL}api/albums/save`, { ...data });
      return (await res).data.album;
    } catch (error) {
      return null;
    }
  };
  
  export const saveNewSong = async (data) => {
    try {
      const res = axios.post(`${baseURL}api/songs/save`, { ...data });
      return (await res).data.savedSong;
    } catch (error) {
      return null;
    }
  };
  
  export const deleteSongById = async (id) => {
    try {
      const res = axios.delete(`${baseURL}api/songs/delete/${id}`);
      return res;
    } catch (error) {
      return null;
    }
  };

  export const deleteArtistById = async (id) => {
    try {
      const res = axios.delete(`${baseURL}api/artists/delete/${id}`);
      return res;
    } catch (error) {
      return null;
    }
  };

  export const deleteAlbumById = async (id) => {
    try {
      const res = axios.delete(`${baseURL}api/albums/delete/${id}`);
      return res;
    } catch (error) {
      return null;
    }
  };
