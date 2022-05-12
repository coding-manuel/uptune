import React, {cloneElement, useEffect, useState} from "react"
import {ethers } from 'ethers'
import { Web3Storage, getFilesFromPath } from 'web3.storage'

import {contractABI, contractAddress } from "../utils/constants"

export const UptuneContext = React.createContext()

const { ethereum } = window

const getEthereumContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const uptuneContract = new ethers.Contract(contractAddress, contractABI, signer)

    return uptuneContract
}

export const UptuneProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [storage, setStorage] = useState('');
    const [transactions, setTransactions] = useState([]);

    // const getAllTransactions = async () =>{
    //     try {
    //         if(!ethereum) return alert("Please Install MetaMask")
    //         const transactionContract = getEthereumContract()

    //         const availibleTransactions = await transactionContract.getAllTransactions()

    //         const structuredTransactions = availibleTransactions.map((transaction) =>({
    //             addressTo: transaction.reciever,
    //             addressFrom: transaction.sender,
    //             timestamp: new Date(transaction.timestamp.toNumber() * 100).toLocaleString(),
    //             message: transaction.message,
    //             keyword: transaction.keyword,
    //             amount: parseInt(transaction.amount._hex) / (10 ** 18)
    //         }))

    //         setTransactions(structuredTransactions)
    //     }catch(error){
    //         console.log(error)
    //     }
    // }

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
                console.log(accounts)
                setCurrentAccount(accounts[0])

                // getAllTransactions()
            }else{
                console.log('No Accounts Found')
            }
        } catch (error) {
            console.log(error)

            throw new Error("No Ethereum Object")
        }
    }

    const uploadAudio = async (files) =>{
        try {
            if(!ethereum) return alert("Please Install MetaMask")
            // art: File {path: 'Screenshot 2022-04-29 101029.jpg', name: 'Screenshot 2022-04-29 101029.jpg', lastModified: 1651207231323, lastModifiedDate: Fri Apr 29 2022 10:10:31 GMT+0530 (India Standard Time), webkitRelativePath: '', …}
            // audio: File {path: 'Y2Mate.is - (FREE) Lo-fi Type Beat - Rain-pdYJtRBPlTw-128k-1645826259361.mp3', name: 'Y2Mate.is - (FREE) Lo-fi Type Beat - Rain-pdYJtRBPlTw-128k-1645826259361.mp3', lastModified: 1648666015752, lastModifiedDate: Thu Mar 31 2022 00:16:55 GMT+0530 (India Standard Time), webkitRelativePath: '', …}
            // genres: ['Dubstep']
            // mainArtist: "RawJaw"
            // moods: (2) ['Happy', 'Energetic']
            // supportArtist: "gautam "
            // title: "chokemen returns"
            // wallet: ""

            const transactionContract = getEthereumContract()


            const cid = await storage.put(files)
            console.log(cid)

            //add to blockchain

        } catch (error) {
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
        <UptuneContext.Provider value={{connectWallet, currentAccount, storage, uploadAudio}}>
            {children}
        </UptuneContext.Provider>
    )
}