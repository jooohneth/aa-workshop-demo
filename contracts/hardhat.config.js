require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    mantle: {
      url: "https://rpc.mantle.xyz", //mainnet
      accounts: [process.env.ACCOUNT_PRIVATE_KEY ?? ""],
    },
    mantleSepolia: {
      url: "https://rpc.sepolia.mantle.xyz", // Sepolia Testnet
      accounts: [process.env.ACCOUNT_PRIVATE_KEY ?? ""],
    },
  },
};
