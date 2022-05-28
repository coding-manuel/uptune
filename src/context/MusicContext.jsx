import React, {useEffect, useState, useContext} from "react"
import { UptuneContext } from "./UptuneContext";

export const MusicContext = React.createContext()

export const MusicProvider = ({children}) => {
    const {getAllAudio} = useContext(UptuneContext);
    const [AllSongs, setAllSongs] = useState([]);
    const [songData, setSongData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [commentDrawer, setCommentDrawer] = useState(false);

    const fetchSongs = async () => {
        let response = await getAllAudio()
        setAllSongs(response)
    }

    useEffect(()=>{
        fetchSongs()
    }, [])

    return(
        <MusicContext.Provider value={{songData, setSongData, modalOpen, setModalOpen, commentDrawer, setCommentDrawer, AllSongs, fetchSongs}}>
            {children}
        </MusicContext.Provider>
    )
}