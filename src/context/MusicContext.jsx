import React, {useEffect, useState} from "react"

export const MusicContext = React.createContext()

export const MusicProvider = ({children}) => {
    const [songData, setSongData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);



    return(
        <MusicContext.Provider value={{songData, setSongData, modalOpen, setModalOpen}}>
            {children}
        </MusicContext.Provider>
    )
}