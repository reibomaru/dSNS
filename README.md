# dSNS(Decentralized social network service)
A decentralized social network service (SNS) where data is stored on the blockchain
## Quickstart
Build a blockchain locally and deploy the contract to it. In addition, launch a web application that will be the client.
### 1. install packages
```
make init
```
### 2. start bloackchain node
```
make start-local-blockchain
```
### 3. deploy the contract to local blockchain
```
make deploy-local
```
### 4. migrate abi to client-web
```
make migrate-client-web
```
### 5. set environment valiables for client-web
Create .env file in the client-web directory
```
cd client/web
touch .env
```
Set the address of the deployed contract on the localhost
```
REACT_APP_LOCAL_CONTRACT_ADDRESS=<deployed-contract-address-on-localhost>
```
### 6. start the client-web
```
start-client-web
```
You can use dSNS on localhost:3000!!

## How to deploy dSNS (to Mumbai; testnet of Polygon layer2 network)
### 1. set environmental variables for deploying settings
Create .env file
```
cd blockchain
touch .env
```
Set environmental variables
```
MUMBAI_URL=https://polygon-mumbai.g.alchemy.com/v2/<YOUR ALCHEMY KEY>
PRIVATE_KEY=abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1
```
- MUMBAI_URL: api endpoints of the infrastructure you are deploying to (e.g. Alchemy, infura, etc.)  
  If you have not created it yet, [click here](https://www.alchemy.com/).
- PRIVATE_KEY: your private key of the wallet **(Never disclose this information to the public!!)**
### 2. deploy the contract
Deployment costs gas, so you need to have some amount of MATIC in advance. mumbai's MATIC is distributed [here](https://mumbaifaucet.com/)
```
make deploy-mumbai
```