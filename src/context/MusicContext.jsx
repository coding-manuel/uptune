import React, {useEffect, useState, useContext} from "react"
import { UptuneContext } from "./UptuneContext";

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function shuffleObject(obj) {
    Object.keys(obj).forEach(function(key) {
        console.log(obj[key])
        obj[key] = obj[key].sort(() => Math.random() - 0.5);
    });

    return obj
}

export const MusicContext = React.createContext()

export const MusicProvider = ({children}) => {
    const {getAllAudio} = useContext(UptuneContext);
    const [AllSongs, setAllSongs] = useState([]);

    const [mostTipped, setMostTipped] = useState([]);
    const [genreList, setGenreList] = useState({})
    const [moodList, setMoodList] = useState({});

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
        let moodListSongs = {}

        if(AllSongs.length !== 0){
            AllSongs.map((song) => {
                if(parseInt(song.amount) > 3){
                    mostTippedSongs.push(song)
                }

                // Making the list of genre
                for(let i = 0; i < song.genres.length; i++){
                    let x = genreListSongs[song.genres[i].toLowerCase()]
                    if(x)
                    genreListSongs[song.genres[i].toLowerCase()].push(song)
                    else
                    genreListSongs[song.genres[i].toLowerCase()] = [song]
                }

                // Making the list of mood
                for(let i = 0; i < song.moods.length; i++){
                    let x = moodListSongs[song.moods[i]]
                    if(x)
                        moodListSongs[song.moods[i]].push(song)
                    else
                        moodListSongs[song.moods[i]] = [song]
                }

            })

            mostTippedSongs = shuffle(mostTippedSongs)
            genreListSongs = shuffleObject(genreListSongs)
            moodListSongs = shuffleObject(moodListSongs)

            setMostTipped(mostTippedSongs)
            setGenreList(genreListSongs)
            setMoodList(moodListSongs)

        }
    }

    useEffect(()=>{
        createFilter()
    }, [AllSongs])

    useEffect(()=>{
        fetchSongs()
    }, [])

    return(
        <MusicContext.Provider value={{songData, setSongData, modalOpen, setModalOpen, commentDrawer, setCommentDrawer, AllSongs, mostTipped, fetchSongs, genreList, moodList}}>
            {children}
        </MusicContext.Provider>
    )
}