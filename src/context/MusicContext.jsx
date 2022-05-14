import React, {useEffect, useState} from "react"

export const MusicContext = React.createContext()

export const MusicProvider = ({children}) => {


    useEffect(() =>{

    }, [])

    return(
        <MusicContext.Provider value={{}}>
            {children}
        </MusicContext.Provider>
    )
}