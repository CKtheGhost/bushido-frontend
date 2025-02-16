import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [userNFTs, setUserNFTs] = useState([]);
  const [votingPower, setVotingPower] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [lastVoteTimestamp, setLastVoteTimestamp] = useState(null);

  // Sample NFT contract ABI - Replace with your actual contract ABI
  const nftContractABI = [
    {
      "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
      "name": "tokenURI",
      "outputs": [{"internalType": "string", "name": "", "type": "string"}],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  // Replace with your NFT contract address
  const NFT_CONTRACT_ADDRESS = '0xYourContractAddress';

  const calculateVotingPower = (nfts) => {
    return nfts.reduce((power, nft) => {
      // Base voting power
      let nftPower = 1;

      // Bonus for rarity
      if (nft.traits.rarity === 'Legendary') nftPower += 3;
      else if (nft.traits.rarity === 'Epic') nftPower += 2;
      else if (nft.traits.rarity === 'Rare') nftPower += 1;

      // Bonus for specific traits
      if (nft.traits.clan === 'Dragon') nftPower += 1;
      if (nft.traits.weapon === 'Legendary Katana') nftPower += 1;

      return power + nftPower;
    }, 0);
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Please install MetaMask to connect your wallet');
      }

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      setAccount(accounts[0]);

      // Initialize contract
      const nftContract = new web3Instance.eth.Contract(
        nftContractABI,
        NFT_CONTRACT_ADDRESS
      );

      // Get user's NFTs
      const balance = await nftContract.methods.balanceOf(accounts[0]).call();
      const nfts = [];

      // Fetch each NFT's metadata
      for (let i = 0; i < balance; i++) {
        const tokenId = await nftContract.methods.tokenOfOwnerByIndex(accounts[0], i).call();
        const tokenURI = await nftContract.methods.tokenURI(tokenId).call();
        const metadata = await fetch(tokenURI).then(res => res.json());
        nfts.push({
          tokenId,
          ...metadata
        });
      }

      setUserNFTs(nfts);
      setVotingPower(calculateVotingPower(nfts));

    } catch (err) {
      console.error('Wallet connection error:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWeb3(null);
    setAccount(null);
    setUserNFTs([]);
    setVotingPower(0);
  };

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  // Additional voting-related methods
  const recordVote = (voteDetails) => {
    // Implement vote tracking logic
    setLastVoteTimestamp(Date.now());
    // You might want to add more sophisticated vote tracking here
  };

  return (
    <Web3Context.Provider value={{
      web3,
      account,
      userNFTs,
      votingPower,
      isConnecting,
      error,
      lastVoteTimestamp,
      connectWallet,
      disconnectWallet,
      recordVote
    }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);