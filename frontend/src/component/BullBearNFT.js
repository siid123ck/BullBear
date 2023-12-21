import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const BullBearNFT = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [nftImage, setNFTImage] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      // Connect to the local Ethereum provider (e.g., MetaMask)
      if (window.ethereum) {
        const ethProvider = new ethers.BrowserProvider(window.ethereum)
        setProvider(ethProvider);
      }
    };

    initProvider();
  }, []);

  const mintNFT = async () => {
    if (!provider) {
      console.error("Ethereum provider not initialized");
      return;
    }

    const signer = await provider.getSigner();
    const contractWithSigner = contract.connect(signer);

    try {
      const result = await contractWithSigner.mintNFT(); // Change to your actual mint function
      console.log("NFT Minted:", result);
      updateNFTImage(); // Update the displayed NFT after minting
    } catch (error) {
      console.error("Error Minting NFT:", error.message);
    }
  };

  const updateTokenUris = async () => {
    if (!provider) {
      console.error("Ethereum provider not initialized");
      return;
    }

    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);

    try {
      const result = await contractWithSigner.updateAllTokenUris("bull");
      console.log("Token URIs Updated:", result);
      updateNFTImage(); // Update the displayed NFT after updating URIs
    } catch (error) {
      console.error("Error Updating Token URIs:", error.message);
    }
  };

  const updateNFTImage = async () => {
    // Fetch the random NFT image URI from your smart contract
    if (contract) {
      const tokenId = Math.floor(Math.random() * 10); // Adjust the range based on your total NFTs
      const tokenURI = await contract.tokenURI(tokenId);
      setNFTImage(tokenURI);
    }
  };

  useEffect(() => {
    const initContract = async () => {
      // Replace with your actual contract address and ABI
      const contractAddress = "0x203BC8b69e2F1457F7dC7d2CCf64E276f32FA06d";
      const abi = [/* Your ABI here */];

      const contractInstance = new ethers.Contract(contractAddress, abi, provider)
      setContract(contractInstance);
    //   updateNFTImage(); // Initial update of the NFT image
    };

    if (provider) {
      initContract();
    }
  }, [provider]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>BullBear NFT</h1>
      <button style={styles.button} onClick={mintNFT}>
        Mint NFT
      </button>
      <button style={styles.button} onClick={updateTokenUris}>
        Update Token URIs
      </button>
      <div>
      {/* {nftImage && <img style={styles.image} src={nftImage} alt="NFT" />} */}
      <img src='https://ipfs.io/ipfs/QmSHyHr3kHKza3YRMfNz5HFatotSvLSa17YHJPzXJow1gU?filename=beanie_bear.png'
      style={styles.image} alt="NFT" />
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    margin: '10px',
  },
  image: {
    maxWidth: '300px',
    maxHeight: '300px',
    margin: '20px',
  },
};

export default BullBearNFT;
