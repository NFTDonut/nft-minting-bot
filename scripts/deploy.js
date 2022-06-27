const hre = require("hardhat");

const IPFS_IMAGE_METADATA_URI = `ipfs://QmQdPYTY8yArgVmMJK319e75rsi91bwtUF5JsSF9CLnEYe/`

async function main() {
    // get contract to deploy and deploy
    const NFT = await hre.ethers.getContractFactory("NFT");
    const nft = await NFT.deploy("Famous Paintings", "PAINT", IPFS_IMAGE_METADATA_URI);
    await nft.deployed();
    console.log("NFT Contract deployed to ", nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });