import Head from 'next/head'
import abi from '../utils/NFT.json';
import { ContractFactory, ethers } from "ethers";
import React, { useState } from 'react';
import Image from 'next/image'
import Instructions from '../components/Instructions';
import Card from '../components/Card'
import DeployCard from '../components/DeployCard'
import MintStateCard from '../components/MintStateCard'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'

export default function Home() {

  const IPFS_IMAGE_METADATA_URI = `ipfs://QmQdPYTY8yArgVmMJK319e75rsi91bwtUF5JsSF9CLnEYe/`
  const contractABI = abi.abi;
  const contractBytecode = abi.bytecode;

  // let contractAddress = '0xEF14116F2A56B92Fb7826cDD79470506d5567365';

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let connectedAddress = await signer.getAddress();
    console.log("Account:", connectedAddress);
    document.getElementById("walletButton").innerHTML = shortenAddress(connectedAddress);

    // display mintActive state from contract
    const nft = new ethers.Contract('0xEF14116F2A56B92Fb7826cDD79470506d5567365', contractABI, signer);
    document.getElementById("mintActive").innerHTML = await nft.mintActive();
  }

  function shortenAddress(connectedAddress) {
    let addressStart = connectedAddress.slice(0, 5);
    let addressEnd = connectedAddress.slice(38, 42);
    let shortenedAddress = addressStart + "..." + addressEnd;
    return shortenedAddress;
  }

  async function deploy() {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        // get contract to deploy and deploy
        // const NFT = await hre.ethers.getContractFactory("NFT");
        let NFT = new ContractFactory(contractABI, contractBytecode, signer);
        const nft = await NFT.deploy("Famous Paintings", "PAINT", IPFS_IMAGE_METADATA_URI);
        await nft.deployed();
        contractAddress = nft.address;
        console.log("NFT Contract deployed to ", contractAddress);
        document.getElementById("contractAddress").innerHTML = contractAddress;
        return contractAddress;
        // document.getElementById("mintActive").innerHTML = nft.mintActive;
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  async function scanMint() {
    // set initial inputs to bad
    let addressInputGood = false;
    let quantityInputGood = false;
    let costInputGood = false;
    let gasInputGood = false;

    // if any input is bad, require new inputs
    if (addressInputGood === false || quantityInputGood === false || costInputGood === false || gasInputGood === false) {
      document.getElementById("contractError").innerHTML = "";
      document.getElementById("quantityError").innerHTML = "";
      document.getElementById("costError").innerHTML = "";
      document.getElementById("gasError").innerHTML = "";
      let contractAddressInput = document.getElementById("contractAddressInput").value;
      let quantityInput = document.getElementById("quantityInput").value;
      let costInput = document.getElementById("costInput").value;
      let gasInput = document.getElementById("gasInput").value;
      if (contractAddressInput.length != 42 || contractAddressInput.substring(0, 2) != "0x") {
        console.log("Please input a contract address.");
        document.getElementById("contractError").innerHTML = "Please input a contract address.";
      }
      else {
        let addressInputGood = true;

        if (quantityInput <= 0) {
          console.log("Please enter a positive integer.");
          document.getElementById("quantityError").innerHTML = "Please enter a positive integer.";
        }
        else {
          let quantityInputGood = true;

          if (costInput <= 0) {
            console.log("Please enter a value greater than 0.");
            document.getElementById("costError").innerHTML = "Please enter a value greater than 0.";
          }
          else {
            let costInputGood = true;

            if (gasInput < 21000) {
              console.log("Please enter at least 21000.");
              document.getElementById("gasError").innerHTML = "Please enter at least 21000.";
            }
            else {
              let gasInputGood = true;

              // if all inputs are good, run mint logic
              if (addressInputGood === true && quantityInputGood === true && costInputGood === true && gasInputGood === true) {
                document.getElementById("scanButton").innerHTML = "SCANNING...";

                if (window.ethereum) {
                  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                  const signer = provider.getSigner();
                  const nft = new ethers.Contract(contractAddressInput, contractABI, signer);

                  // if mintActive is true, mint right away
                  if (await nft.mintActive() === true) {
                    console.log("mintActive is already true");

                    // assign inputs to transaction and mint
                    let tx = {
                      from: signer.address,
                      value: (ethers.utils.parseUnits(costInput.toString(), "ether")),
                      gasLimit: gasInput
                    }
                    await nft.mint(quantityInput, tx);
                  }
                  // if mintActive is false, wait until true, then mint.
                  else if (await nft.mintActive() === false) {
                    while (await nft.mintActive() === false) {
                      console.log("waiting for mintActive to be true...");
                    }
                    console.log("mintActive is TRUE!");
                    // assign inputs to transaction and mint
                    let tx = {
                      from: signer.address,
                      value: (ethers.utils.parseUnits(costInput.toString(), "ether")),
                      gasLimit: gasInput
                    }
                    await nft.mint(quantityInput, tx);
                  }
                  else {
                    console.log("Can't access mintActive from contract");
                  }
                }
              }
              else {
                console.log("Bad Inputs.");
              }
            }
          }
        }
      }
    }
    document.getElementById("scanButton").innerHTML = "SCAN";
  }

  async function toggleMintActive() {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        const nft = new ethers.Contract('0xEF14116F2A56B92Fb7826cDD79470506d5567365', contractABI, signer);
        if (await nft.mintActive() === true) {
          await nft.setMintActive(false);
          while (await nft.mintActive() === true) {
            document.getElementById("mintActive").innerHTML = "waiting...";
          }
          document.getElementById("mintActive").innerHTML = await nft.mintActive();
        }
        else if (await nft.mintActive() === false) {
          await nft.setMintActive(true);
          while (await nft.mintActive() === false) {
            document.getElementById("mintActive").innerHTML = "waiting...";
          }
          document.getElementById("mintActive").innerHTML = await nft.mintActive();
        }
        else {
          console.log("Cannot read mintActive from smart contract.");
        }
        document.getElementById("mintActive").innerHTML = await nft.mintActive();
      }
    } 
    catch (error) {
        console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar connectWallet={connectWallet}/>
      <div className={styles.column}>
        <Instructions />
      </div>
      <div className={styles.column}>
        <DeployCard deploy={deploy}/>
        <MintStateCard toggleMintActive={toggleMintActive}/>
      </div>
      <div className={styles.column}>
        <Card scanMint={scanMint}/>
      </div>
    </div>
  )
}
