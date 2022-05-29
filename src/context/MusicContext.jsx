import React, {useEffect, useState, useContext} from "react"
import { UptuneContext } from "./UptuneContext";

export const MusicContext = React.createContext()

const genresList = ['Rock', 'Jazz', 'Dubstep', 'Techno', 'Pop', 'Classical']

export const MusicProvider = ({children}) => {
    const {getAllAudio} = useContext(UptuneContext);
    const [AllSongs, setAllSongs] = useState([]);

    const [mostTipped, setMostTipped] = useState([]);
    const [genreList, setGenreList] = useState({})

    const [songData, setSongData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [commentDrawer, setCommentDrawer] = useState(false);

    const fetchSongs = async () => {
        let response = await getAllAudio()
        setAllSongs(response)
    }

    const createFilter = async () => {
        let mostTippedSongs = []
        let genreListSongs = {}

        if(AllSongs.length !== 0){
            AllSongs.map((song) => {
                if(parseInt(song.amount) > 3){
                    mostTippedSongs.push(song)
                }

                for(let i = 0; i < song.genres.length; i++){
                    let x = genreListSongs[song.genres[i].toLowerCase()]
                    if(x)
                        genreListSongs[song.genres[i].toLowerCase()].push(song)
                    else
                        genreListSongs[song.genres[i].toLowerCase()] = [song]
                }

            })
            setMostTipped(mostTippedSongs)
            setGenreList(genreListSongs)

            console.log(genreListSongs)
        }
    }

    useEffect(()=>{
        createFilter()
    }, [AllSongs])

    useEffect(()=>{
        fetchSongs()
    }, [])

    return(
        <MusicContext.Provider value={{songData, setSongData, modalOpen, setModalOpen, commentDrawer, setCommentDrawer, AllSongs, mostTipped, fetchSongs, genreList}}>
            {children}
        </MusicContext.Provider>
    )
}