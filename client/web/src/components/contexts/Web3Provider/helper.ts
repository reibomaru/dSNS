import {
  MUMBAI_CONTRACT_ADDRESS,
  MUMBAI_WEBSOCKET_HOST,
  LOCAL_CONTRACT_ADDRESS,
} from "../../../helpers/config";

/**
 * Select contract address by network
 * @param chainId network chain id
 * @returns contract address
 */
export const selectContractAddress = (chainId: number) => {
  if (chainId === 80001) {
    return MUMBAI_CONTRACT_ADDRESS;
  } else if (chainId === 31337) {
    return LOCAL_CONTRACT_ADDRESS;
  }
};

/**
 * Select websocket host by network
 * @param chainId network chain id
 * @returns websocket host
 */
export const selectWebSocketHost = (chainId: number) => {
  if (chainId === 80001) {
    return MUMBAI_WEBSOCKET_HOST;
  } else if (chainId === 31337) {
    return "ws://127.0.0.1:8545";
  }
};
