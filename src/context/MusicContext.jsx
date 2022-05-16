import React, {useEffect, useState} from "react"

export const MusicContext = React.createContext()

export const MusicProvider = ({children}) => {
    const [songData, setSongData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [commentDrawer, setCommentDrawer] = useState(false);



    return(
        <MusicContext.Provider value={{songData, setSongData, modalOpen, setModalOpen, commentDrawer, setCommentDrawer}}>
            {children}
        </MusicContext.Provider>
    )
}