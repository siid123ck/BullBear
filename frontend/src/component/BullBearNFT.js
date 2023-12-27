import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { abi } from '../abi';


const BullBearNFT = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenUri, setTokenUri] = useState(null);
  const [URIData, setURIData] = useState(null);
  const [currentMarketTrend, setCurrentMarketTrend] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
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
        console.log("Minting NFT...");
        const result = await contractWithSigner.safeMint(signer); 
        console.log("NFT Minted:", result);
      
    } catch (error) {
      console.error("Error Minting NFT:", error.message);
    }
  };

  const getCurrentMarketTrend = async () => {
    if (contract) {
      const currentMarketTrend = await contract.currentMarketTrend();
      setCurrentMarketTrend(ethers.toNumber(currentMarketTrend)); 
    }
  };
  
  const getCurrentPrice = async () => {
    if (contract) {
      const currentPrice = await contract.currentPrice();
      setCurrentPrice(ethers.toNumber(currentPrice)/1000); 
    }
  };

//   const getInterval = async () => {
//     if (contract) {
//       const result = await contract.interval();
//       console.log("Update Interval:", result.toString());
//     }
//   };


  const updateTokenUri = async () => {
    if (contract) {
        const result = await contract.tokenURI(0);
        console.log(result)
        setTokenUri(result)
      }
  };

  const updateToken = () =>{
    updateTokenUri();
    getCurrentMarketTrend();
    getCurrentPrice();
  }

//   const updateNFTImage = async () => {
//     // Fetch the random NFT image URI from your smart contract
//     if (contract) {
//       const tokenId = Math.floor(Math.random() * 10); 
//       const tokenURI = await contract.tokenURI(tokenId);
//       setTokenUri(tokenURI);
//     }
//   };

  useEffect(() => {
    const initContract = async () => {
      // Replace with your actual contract address and ABI
      const contractAddress = "0x583ae2D06DcD37AA70FCf186f8CB99dC48573E18";
      

      const contractInstance = new ethers.Contract(contractAddress, abi, provider)
      setContract(contractInstance);
    };

    if (provider) {
      initContract();
    }
  }, [ provider]);

  useEffect(()=>{
    const fetchURIData = async ()=>{
        
        const response = await fetch(tokenUri);
        const jsonContent = await response.json();
  
        // Now 'jsonContent' contains all the data from the JSON file
        console.log("Metadata:", jsonContent);
  
        // Access specific values, for example:
        console.log("Name:", jsonContent.name);
        console.log("Description:", jsonContent.description);
        setURIData(jsonContent)
    }
    fetchURIData();
  },[tokenUri])


  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>BullBear NFT</h1>
      <button style={styles.button} onClick={mintNFT}>
        Mint NFT
      </button>
      <div>
        {URIData && <img src={URIData.image} style={styles.image} alt="NFT" />}
      </div>
      <div style={styles.infoContainer}>
        <p style={styles.info}>Current Market Trend: {currentMarketTrend===0?"Bull":"Bear"}</p>
        <p style={styles.info}>Current Price: ${currentPrice}</p>
        {URIData && (
          <>
            <p style={styles.info}>Name:{URIData.name} </p>
            <p style={styles.info}>Description: {URIData.description}</p>
          </>
         )}
      </div>
      <button style={styles.button} onClick={updateToken}>
        Update NFT
      </button>
    </div>
  );
};

const styles = {
    container: {
      textAlign: 'center',
      padding: '50px',
      backgroundColor: '#f9f7ff',  // Light purple background color
      borderRadius: '10px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      color: '#5e2bff', 
    },
    heading: {
      fontSize: '36px',
      marginBottom: '30px' // Purple heading color
    },
    button: {
      padding: '15px 20px',
      fontSize: '18px',
      margin: '20px',
      backgroundColor: '#5e2bff',  // Purple button color
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#4c26a9',  // Darker purple on hover
    },
    image: {
      maxWidth: '100%',
      maxHeight: '400px',
      margin: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
    },
    infoContainer: {
      marginTop: '40px',
    },
    info: {
      fontSize: '20px',
      margin: '15px',
    },
  };
  

export default BullBearNFT;
