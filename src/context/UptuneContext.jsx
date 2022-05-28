import React, {useEffect, useState} from "react"
import { ethers } from 'ethers'
import uuid from 'react-uuid'
import { Web3Storage } from 'web3.storage'
import { useLocation } from 'react-router-dom';

import {contractABI, contractAddress } from "../utils/constants"

export const UptuneContext = React.createContext()

const { ethereum } = window

const getEthereumContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const uptuneContract = new ethers.Contract(contractAddress, contractABI, signer)

    return uptuneContract
}

const structureSongData = (audio) => {
    const songData = {
        id: Number(audio.id),
        uuid: audio.uuid,
        amount: ethers.utils.formatEther(audio.amount),
        timestamp: new Date(audio.timestamp.toNumber() * 100).toLocaleString(),
        wallet: audio.wallet,
        mainArtist: audio.mainAuthor,
        artistID: audio.artistID,
        supportArtist: audio.authors,
        title: audio.title,
        moods: audio.tags,
        genres: audio.genres,
        coverartgateway: audio.coverartgateway,
        audiogateway: audio.audiogateway,
        comments: audio.comments
    }

    return songData
}

const structureArtistData = (artist) => {
    const artistData = {
        artistName: artist.artist,
        artistSongs: artist.songs,
        profilegateway: artist.profilegateway,
        artistID: artist.artistID
    }

    return artistData
}

function makeGatewayURL(cid, path) {
    return `https://${cid}.ipfs.dweb.link/${encodeURIComponent(path)}`
}

export const UptuneProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState(localStorage.getItem("currentAccount") || "")
    const [artistExist, setArtistExist] = useState(localStorage.getItem("artistExist") || false);
    const [artist, setArtist] = useState(localStorage.getItem("artist"), {});
    const [storage, setStorage] = useState('');
    const [error, setError] = useState([]);
    const [upload, setUpload] = useState(false);

    const [mainLoader, setMainLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tipLoading, setTipLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState('');
    const [commentLoading, setCommentLoading] = useState(false);

    const location = useLocation();

    const connectToIPFS = async () =>{
        const token = import.meta.env.VITE_WEB3API

        const storage = new Web3Storage({ token: token })
        setStorage(storage)
    }

    const checkIfWalletIsConnected = async () =>{
        try {

            if(!ethereum) return alert("Please Install MetaMask")

            const accounts = await ethereum.request({method: "eth_accounts"})

            if(accounts.length){
                setCurrentAccount(accounts[0])
                localStorage.setItem("currentAccount", accounts[0])
            }else{
                localStorage.setItem("artist", "")
                localStorage.setItem("currentAccount", "")
                localStorage.setItem("artistExist", false)
                setError([true, "Connect Wallet"])
            }

        } catch (error) {
            console.log(error)
        }
    }

    const checkIfArtistCreated = async () =>{
        try {
            if(!ethereum) return alert("Please Install MetaMask")

            const transactionContract = await getEthereumContract()
            const exists = await transactionContract.artistExists(currentAccount)

            console.log(currentAccount, exists)

            setArtistExist(exists)

            if(exists){
                const artist = await getArtist(currentAccount)
                setArtist(artist)
                localStorage.setItem("artist", artist)
                localStorage.setItem("artistExist", exists)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const getAllComments = async (id) => {
        try {
            setCommentLoading(true)

            const transactionContract = await getEthereumContract()
            const AllComments = await transactionContract.getAllComments(id)

            const structuredComments = {
                id: AllComments.id,
                amount: AllComments.amount,
                comment: AllComments.comment,
                timestamp: AllComments.timestamp
            }

            let arrayOfComments = [];

            for(let i = 0; i < structuredComments.comment.length; i++){
                arrayOfComments.push({comment: structuredComments.comment[i], amount: ethers.utils.formatEther(structuredComments.amount[i]), timestamp: new Date(structuredComments.timestamp[i].toNumber() * 1000).toLocaleString()})
            }

            setCommentLoading(false)

            return arrayOfComments
        } catch (error) {
            setCommentLoading(false)
            console.log(error)
        }
    }

    const createArtist = async (values) => {
        try {
            setLoading(true)

            //*upload to ipfs
            const profilehash = await storage.put(values.pf, {
                name: values.artist.concat('-', '|profile-picture', '|', currentAccount.slice(-5))
            })

            const profilegateway = makeGatewayURL(profilehash, values.pf[0].name)

            const transactionContract = await getEthereumContract()
            const transactionHash = await transactionContract.createArtist(uuid(), values.artist, profilegateway)

            const transactionReceipt = await transactionHash.wait();

            console.log("sdfgklhsdjlk")

            const artist = await checkIfArtistCreated();

            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const getArtist = async (address) => {
        try {
            const transactionContract = await getEthereumContract()
            const artist = await transactionContract.getArtist(address)

            const structuredArtist = structureArtistData(artist)

            return structuredArtist
        } catch (error) {
            console.log(error)
        }
    }

    const getAllAudio = async () =>{
        try {
            setLoading(true)

            const transactionContract = await getEthereumContract()
            const AllAudio = await transactionContract.getAllAudio()

            console.log(AllAudio)

            const structuredAudio = AllAudio.map((audio) => structureSongData(audio))

            console.log(AllAudio, structuredAudio)

            setLoading(false)

            return structuredAudio;
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const getOneAudio = async (uuid) =>{
        try {
            const transactionContract = await getEthereumContract()
            const all = await transactionContract.getOneAudio(uuid)

            const structuredAudio = structureSongData(all)

            return structuredAudio
        } catch (error) {
            console.log(error)
        }
    }

    const getMultipleAudio = async (artist) =>{
        try {
            const transactionContract = await getEthereumContract()
            const all = await transactionContract.getMultipleAudio(artist.artistSongs)

            const structuredAudio = all.map((audio) => structureSongData(audio))

            return structuredAudio
        } catch (error) {
            console.log(error)
        }
    }

    const getArtistSongs = async (address) =>{
        try {
            console.log(address)
            const transactionContract = await getEthereumContract()
            const all = await transactionContract.getArtistSongs(address)

            console.log(all)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadAudio = async (files) =>{
        try {
            setLoading(true)

            if(!ethereum) return alert("Please Install MetaMask")

            //*upload to ipfs
            setLoadingStatus("Uploading Audio to IPFS")
            const audiohash = await storage.put(files.audio, {
                name: files.mainArtist.concat('-', files.title, '|', currentAccount.slice(-5))
            })
            setLoadingStatus("Uploading Cover Art to IPFS")
            const coverarthash = await storage.put(files.art, {
                name: files.mainArtist.concat('-', files.title, '|', currentAccount.slice(-5), '|coverart')
            })
            const audioGateway = makeGatewayURL(audiohash, files.audio[0].name)
            const coverartGateway = makeGatewayURL(coverarthash, files.art[0].name)

            //*send to blockchain
            setLoadingStatus("Uploading to the Blockchain")
            const transactionContract = await getEthereumContract()
            const transactionHash = await transactionContract.uploadAudio(uuid(), audioGateway, coverartGateway, files.mainArtist, files.artistID, files.title, files.moods, files.genres, files.supportArtist)

            setLoadingStatus("Waiting to confirm Transaction")
            const transactionReceipt = await transactionHash.wait();

            setLoadingStatus(1)

            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const sendTip = async (values) => {
        try {
            if(!ethereum) return alert("Please Install MetaMask")

            setTipLoading(true)

            const {id, tip, wallet, message} = values

            const transactionContract = await getEthereumContract()
            let parsedAmount = ethers.utils.parseEther(tip.toString())

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: wallet,
                    gas: '0x5208',
                    value: parsedAmount._hex,
                }]
            })

            const transactionHash = await transactionContract.sendTip(id, parsedAmount, message)
            const transactionReceipt = await transactionHash.wait();

            setTipLoading(1)
        } catch (error) {
            console.log(error)

            setTipLoading(false)
        }
    }

    const connectWallet = async () => {
        try {
            setLoading(true)
            if(!ethereum) return alert("Please Install MetaMask")

            const accounts = await ethereum.request({method: "eth_requestAccounts"})

            setCurrentAccount(accounts[0])

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() =>{
        if(checkIfWalletIsConnected()){
            connectToIPFS()
            artistExist && checkIfArtistCreated()
        }
    }, [currentAccount])

    return(
        <UptuneContext.Provider value={{connectWallet, currentAccount, storage, uploadAudio, loading, loadingStatus, setLoadingStatus, getAllAudio, getOneAudio, getMultipleAudio, error, setError, sendTip, tipLoading, setTipLoading, setCommentLoading, commentLoading, getAllComments, getArtistSongs, getArtist, createArtist, artistExist, artist, mainLoader, setMainLoader}}>
            {children}
        </UptuneContext.Provider>
    )
}