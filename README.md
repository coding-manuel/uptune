# quickbuck

**Quickbuck** is a fast, safe, and easy to use app that allows you to transfer ethereum from one account to another. Simply enter the amount of ethereum you want to transfer, the address of the recipient, and confirm the transaction.

<img src="images/home.jpg" alt="home" >

## Description

Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of fraud or third party interference.

Ethereum is a public blockchain-based platform that utilizes the cryptocurrency Ether for fuel. It is an open source project created by Vitalik Buterin in 2014.

The app would be used to transfer ethereum from one account to another. The app would be similar to other cryptocurrency wallets, but would be specific to ethereum. The user would need to input their account information, as well as the account they wish to send the ethereum to. The user would also need to input the amount of ethereum they wish to send. Once all of the information is inputted, the user would simply need to hit the “send now” button and the ethereum would be transferred from their account to the other account.

## Getting Started

### Dependencies

* [React.js](https://reactjs.org/) - v18.0.0
* [Mantine](https://mantine.dev/) - v4.2.2

 ### Dev Dependancies
 
 * [hardhat](https://hardhat.org/) - v2.9.3
 * [ethers](https://docs.ethers.io/v5/) - v5.6.5

### Installing

- Install the MetaMask extension on your browser

- Install all the dependancies using npm or yarn
```
  npm i
```

### Executing program

1. Create 2 terminals
2. Run this command to start the Ethereum Test Network 
```
  $ npx hardhat node
```
3. Run this command to deploy the Smart Contract on the blockchain 
```
  $ npx hardhat run scripts/deploy.js --network localhost
```
4. Start the frontend application 
```
  $ npm run dev
```
