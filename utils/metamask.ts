import { BrowserProvider, JsonRpcSigner } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

export const getProvider = async (): Promise<BrowserProvider> => {
  const provider: any = await detectEthereumProvider();
  if (provider) {
    return new BrowserProvider(provider);
  } else {
    throw new Error('MetaMask is not installed');
  }
};

export const getSigner = async (): Promise<JsonRpcSigner> => {
  const provider = await getProvider();
  const signer = provider.getSigner();
  return signer;
};

export const connectWallet = async (): Promise<JsonRpcSigner> => {
  try {
    const provider = await getProvider();
    await provider.send('eth_requestAccounts', []);
    return getSigner();
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('User rejected the request.');
    }
    throw error;
  }
};
