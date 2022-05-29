import React, {useEffect, useState, useContext} from "react"
import { UptuneContext } from "./UptuneContext";

export const MusicContext = React.createContext()

export const MusicProvider = ({children}) => {
    const {getAllAudio} = useContext(UptuneContext);
    const [AllSongs, setAllSongs] = useState([]);

    const [mostTipped, setMostTipped] = useState([]);

    const [songData, setSongData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [commentDrawer, setCommentDrawer] = useState(false);

    const fetchSongs = async () => {
        let response = await getAllAudio()
        setAllSongs(response)
    }

    const createFilter = async () => {
        let mostTippedSongs = []

        if(AllSongs.length !== 0){
            AllSongs.map((song) => {
                if(parseInt(song.amount) > 3){
                    mostTippedSongs.push(song)
                }
            })
            setMostTipped(mostTippedSongs)
        }
    }

    useEffect(()=>{
        createFilter()
    }, [AllSongs])

    useEffect(()=>{
        fetchSongs()
    }, [])

    return(
        <MusicContext.Provider value={{songData, setSongData, modalOpen, setModalOpen, commentDrawer, setCommentDrawer, AllSongs, mostTipped, fetchSongs}}>
            {children}
        </MusicContext.Provider>
    )
}