import React, {useEffect, useState} from "react"
import { BigNumber, ethers } from 'ethers'
import { Web3Storage } from 'web3.storage'
import { useLocation } from 'react-router-dom';

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
    const [tipLoading, setTipLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState('');
    const [error, setError] = useState([]);
    const [upload, setUpload] = useState(false);

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
            }else{
                setError([true, "Connect Wallet"])
            }
        } catch (error) {
            console.log(error)

            throw new Error("No Ethereum Object")
        }
    }

    const getAllAudio = async () =>{
        try {
            setLoading(true)

            const transactionContract = getEthereumContract()
            const AllAudio = await transactionContract.getAllAudio()

            console.log(AllAudio)

            const structuredAudio = AllAudio.map((audio) =>({
                id: Number(audio.id),
                amount: ethers.utils.formatEther(audio.amount),
                timestamp: new Date(audio.timestamp.toNumber() * 100).toLocaleString(),
                wallet: audio.wallet,
                mainArtist: audio.mainAuthor,
                supportArtist: audio.authors,
                title: audio.title,
                moods: audio.tags,
                genres: audio.genres,
                coverartgateway: audio.coverartgateway,
                audiogateway: audio.audiogateway,
                comments: audio.comments
            }))

            setLoading(false)

            return structuredAudio;
        } catch (error) {
            setLoading(false)
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
            const audioGateway = makeGatewayURL(audiohash, files.audio[0].path)
            const coverartGateway = makeGatewayURL(coverarthash, files.art[0].path)

            //*send to blockchain
            setLoadingStatus("Uploading to the Blockchain")
            const transactionContract = getEthereumContract()
            const transactionHash = await transactionContract.uploadAudio(audioGateway, coverartGateway, files.mainArtist, files.title, files.moods, files.genres, files.supportArtist, [])

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

            const transactionContract = getEthereumContract()
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

            console.log(transactionContract)
            const transactionHash = await transactionContract.sendTip(id, parsedAmount, message)
            const transactionReceipt = await transactionHash.wait();
            setTipLoading(1)
        } catch (error) {
            console.log(error)

            setTipLoading(false)
            throw new Error("No Ethereum Object")
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


            throw new Error("No Ethereum Object")
        }
    }

    const checkIfUpload = () => {
        if(location.pathname === '/upload')
            setUpload(true)
        else
            setUpload(false)
    }

    useEffect(() =>{
        checkIfUpload()
        connectToIPFS()
        checkIfWalletIsConnected()

    }, [])

    return(
        <UptuneContext.Provider value={{checkIfUpload, upload, connectWallet, currentAccount, storage, uploadAudio, loading, loadingStatus, getAllAudio, getOneAudio, error, setError, sendTip, tipLoading, setTipLoading}}>
            {children}
        </UptuneContext.Provider>
    )
}