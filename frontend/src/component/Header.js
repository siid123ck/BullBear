import React, { useState } from 'react';
import styles from '../css/Header';

const Header = () => {
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const connectWallet = async () => {
    try {
      // Check if the MetaMask provider is available
      if (window.ethereum) {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Set the wallet connection state to true
        console.log('Connect to wallet');
        setWalletConnected(true);
      } else {
        // MetaMask is not available
        console.error('MetaMask is not installed');
      }
    } catch (error) {
      // Handle errors, such as user rejection
      console.error('Error connecting wallet:', error.message);
    }
  };

  const openModal = (form) => {
    setActiveForm(form);
    setModalOpen(true);
  };

  const closeModal = () => {
    setActiveForm(null);
    setModalOpen(false);
  };

  const renderFormContent = () => {
    let heading = '';
    let formContent = null;

    switch (activeForm) {
      case 'priceFeed':
        heading = 'Update Price Feed';
        formContent = (
          <form style={styles.form}>
            <h2>{heading}</h2>
            {/* Price Feed form content */}
            <label htmlFor="newPriceFeed">New Price Feed:</label>
            <input type="text" id="newPriceFeed" name="newPriceFeed" />
            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        );
        break;
      case 'subscriptionId':
        heading = 'Set Subscription ID';
        formContent = (
          <form style={styles.form}>
            <h2>{heading}</h2>
            {/* Subscription ID form content */}
            <label htmlFor="subscriptionId">Subscription ID:</label>
            <input type="text" id="subscriptionId" name="subscriptionId" />
            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        );
        break;
      case 'mintNFT':
        heading = 'Mint NFT';
        formContent = (
          <form style={styles.form}>
            <h2>{heading}</h2>
            {/* Mint NFT form content */}
            <label htmlFor="mintNFT">Address:</label>
            <input type="text" id="mintNFT" name="mintNFT" />
            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        );
        break;
      default:
        return null;
    }

    return formContent;
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>BullBearNFT</h1>
        <nav style={styles.nav}>
          <span style={styles.navLink} onClick={() => openModal('priceFeed')}>PriceFeed</span>
          <span style={styles.navLink} onClick={() => openModal('subscriptionId')}>SubscriptionId</span>
          <span style={styles.navLink} onClick={() => openModal('mintNFT')}>Mint NFT</span>
          <span style={styles.navLink}> Balance</span>
          <span style={styles.navLink} >Help</span>
          {/* Other nav links */}
        </nav>
        {isWalletConnected ? (
          <button style={styles.connectButton}>Connected</button>
        ) : (
          <button style={styles.connectButton} onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal" style={styles.overlay}>
          <div className="modal-content" style={styles.content}>
            <span className="close" onClick={closeModal}>&times;</span>
            {/* Render the selected form content */}
            {renderFormContent()}
          </div>
        </div>
      )}
    </div>
  );
};


export default Header;
