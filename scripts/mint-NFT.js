const { messagePrefix } = require("@ethersproject/hash");
const { formatUnits } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx++;
  }
}

const mintAmount = 1;
const gasLimit = 450000;

async function mintNFT() {
  const [account] = await hre.ethers.getSigners();

  //const baseCost = await nft.cost();

}


async function main() {
  // get test accounts
  const [owner, minter1, minter2] = await hre.ethers.getSigners();

  const IPFS_IMAGE_METADATA_URI = `ipfs://QmQdPYTY8yArgVmMJK319e75rsi91bwtUF5JsSF9CLnEYe/`

  // get contract to deploy and deploy
  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy("Famous Paintings", "PAINT", IPFS_IMAGE_METADATA_URI);
  await nft.deployed();
  console.log("NFT Contract deployed to ", nft.address);

  // check account balances
  const addresses = [owner.address, minter1.address, nft.address];
  console.log("== start ==");
  await printBalances(addresses);

  // check cost of 1 NFT in Ether
  const baseCost = await nft.cost();
  console.log(formatUnits(baseCost));
  const totalCost = baseCost * mintAmount;

  // mint NFT
  console.log("== Mint ==");

  tx = {
    from: addresses[0],
    value: (ethers.utils.parseUnits("1", "ether"))
  }

  await nft.mint(mintAmount, tx);
  await printBalances(addresses);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
