import React, {useEffect, useContext, useState} from 'react'
import { useParams } from 'react-router-dom';
import { UptuneContext } from '../context/UptuneContext'

export default function Artist() {
  const {getArtist, getMultipleAudio} = useContext(UptuneContext)
  const [artistData, setArtistData] = useState(false);
  const [artistSongs, setArtistSongs] = useState([]);

  const {id} = useParams()

  useEffect(()=>{
    async function fetchArtist() {
        let artistID = id
        let response = await getArtist(artistID)
        setArtistData(response)
    }
    fetchArtist()
  }, [])

  useEffect(()=>{
    async function fetchSongs() {
      let songs = await getMultipleAudio(artistData)
      setArtistSongs(songs)
    }
    artistData && fetchSongs()
  }, [artistData])

  return (
    <div>Artist</div>
  )
}
