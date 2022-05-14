import React, {useEffect, useState} from "react"

export const MusicContext = React.createContext()

export const MusicProvider = ({children}) => {
    const [songData, setSongData] = useState([]);



    return(
        <MusicContext.Provider value={{songData, setSongData}}>
            {children}
        </MusicContext.Provider>
    )
}