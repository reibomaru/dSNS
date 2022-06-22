import React, { createContext, useContext, useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import DSNS from "../../../contracts/DSNS.sol/DSNS.json";
import { selectContractAddress, selectWebSocketHost } from "./helper";

type web3Context = {
  web3: Web3;
  chainId: number;
  contract: Contract;
  account: string;
  balance: string;
  currencyUnit: string;
  events: any;
};

const Web3Context = createContext<web3Context | null>(null);

type web3ProviderProps = {
  children: React.ReactNode;
};

const Web3Provider = (props: web3ProviderProps) => {
  const [web3Obj, setWeb3Obj] = useState<web3Context | null>(null);

  useEffect(() => {
    // Reload when account is changed
    window.ethereum.on("accountsChanged", () => {
      // Handle the new accounts, or lack thereof.
      window.location.reload();
    });
    // Reload when chain is changed
    window.ethereum.on("chainChanged", () => {
      // Handle the new chain.
      window.location.reload();
    });
  }, []);

  // Initialize connection with contract and wallet
  useEffect(() => {
    (async () => {
      const provider = await detectEthereumProvider({ mustBeMetaMask: true });
      if (provider && window.ethereum?.isMetaMask) {
        console.log("Welcome to MetaMask User🎉");
        const web3 = new Web3(Web3.givenProvider);
        const chainId = await web3.eth.getChainId();
        const contractAddress = selectContractAddress(chainId);
        const webSocketHost = selectWebSocketHost(chainId);

        if (webSocketHost && contractAddress) {
          // connect with metamask wallet
          const accounts = await web3.eth.requestAccounts();
          const account = accounts[0];

          const balance = await web3.eth.getBalance(accounts[0]);

          // init contract via metamask
          const contract = new web3.eth.Contract(
            DSNS.abi as any,
            contractAddress
          );

          // init contract via websocket only for listening event
          const provider = new Web3.providers.WebsocketProvider(webSocketHost);
          const web3EventListner = new Web3(provider);

          const _contract = new web3EventListner.eth.Contract(
            DSNS.abi as any,
            contractAddress
          );

          //init currency unit
          const currencyUnit = chainId === 80001 ? "MATIC" : "ETH";

          setWeb3Obj({
            web3: web3,
            chainId,
            contract,
            account,
            balance: web3.utils.fromWei(balance),
            currencyUnit,
            events: _contract.events,
          });
        }
      } else {
        console.log("Please Install MetaMask🙇‍♂️");
      }
    })();
  }, []);

  return (
    <>
      {web3Obj ? (
        <Web3Context.Provider value={web3Obj}>
          {props.children}
        </Web3Context.Provider>
      ) : (
        <p>読み込み中です</p>
      )}
    </>
  );
};

export default Web3Provider;
export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context) {
    return context;
  } else {
    throw new Error(`web3との接続に失敗しました。context is ${context}`);
  }
};
