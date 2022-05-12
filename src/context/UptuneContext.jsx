import React, {cloneElement, useEffect, useState} from "react"
import { ethers } from 'ethers'
import { Web3Storage } from 'web3.storage'

import {contractABI, contractAddress } from "../utils/constants"

export const UptuneContext = React.createContext()

const { ethereum } = window

const getEthereumContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const uptuneContract = new ethers.Contract(contractAddress, contractABI, signer)

    return uptuneContract
}

function makeGatewayURL(cid, path) {
    return `https://${cid}.ipfs.dweb.link/${encodeURIComponent(path)}`
}

export const UptuneProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [storage, setStorage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState('');
    const [transactions, setTransactions] = useState([]);

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
            }else{
                console.log('No Accounts Found')
            }
        } catch (error) {
            console.log(error)

            throw new Error("No Ethereum Object")
        }
    }

    const getAllAudio = async () =>{
        try {
            const transactionContract = getEthereumContract()
            const all = await transactionContract.getAllAudio()

            console.log(all)
        } catch (error) {
            console.log(error)
        }
    }

    const getOneAudio = async () =>{
        try {
            const transactionContract = getEthereumContract()
            const all = await transactionContract.getOneAudio(1)

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
                name: files.mainArtist.concat('-', files.title)
            })
            setLoadingStatus("Uploading Cover Art to IPFS")
            const coverarthash = await storage.put(files.art, {
                name: files.mainArtist.concat('-', files.title, '|coverart')
            })
            const audioGateway = makeGatewayURL(audiohash, files.audio.name)
            const coverartGateway = makeGatewayURL(coverarthash, files.art.name)

            //*send to blockchain
            setLoadingStatus("Uploading to the Blockchain")
            const transactionContract = getEthereumContract()
            const transactionHash = await transactionContract.uploadAudio(audioGateway, coverartGateway, files.mainArtist, files.title, files.moods, files.genres, files.supportArtist)

            setLoadingStatus("Waiting to confirm Transaction")
            const transactionReceipt = await transactionHash.wait();

            setLoadingStatus(1)

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please Install MetaMask")

            const accounts = await ethereum.request({method: "eth_requestAccounts"})

            setCurrentAccount(accounts[0])

        } catch (error) {
            console.log(error)


            throw new Error("No Ethereum Object")
        }
    }

    useEffect(() =>{
        connectToIPFS()
        checkIfWalletIsConnected()

    }, [])

    return(
        <UptuneContext.Provider value={{connectWallet, currentAccount, storage, uploadAudio, loading, loadingStatus, getAllAudio, getOneAudio}}>
            {children}
        </UptuneContext.Provider>
    )
}