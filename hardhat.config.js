require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-foundry");
const dotenv = require("dotenv")

dotenv.config()
const { PRIVATE_KEY, ARBITRUM_TOKEN, AVALANCHE_TOKEN, BSC_TOKEN, POLYGON_TOKEN, SEPOLIA_TOKEN, INFURA_ID } = process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  etherscan: {
    apiKey: {
      arbitrumSepolia: ARBITRUM_TOKEN,
      avalanche: AVALANCHE_TOKEN,
      bscTestnet: BSC_TOKEN,
      sepolia: SEPOLIA_TOKEN,
      polygonAmoy: POLYGON_TOKEN
    },
    customChains: [
      {
        network: "avalanche",
        chainId: 43113,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://avalanche.testnet.localhost:8080"
        }
      }
    ]
  },
  networks: {
    arbitrum: {
      url: `https://arbitrum-sepolia.infura.io/v3/${INFURA_ID}`,
      chainId: 421614,
      accounts: [PRIVATE_KEY],
      allowUnlimitedContractSize: true,
    },
    avalanche: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      accounts: [PRIVATE_KEY],
      allowUnlimitedContractSize: true,
    },
    bsc: {
      url: "https://data-seed-prebsc-2-s3.bnbchain.org:8545",
      chainId: 97,
      accounts: [PRIVATE_KEY],
      allowUnlimitedContractSize: true,
    },
    polygon: {
      url: `https://polygon-amoy.infura.io/v3/${INFURA_ID}`,
      chainId: 80002,
      accounts: [PRIVATE_KEY],
      allowUnlimitedContractSize: true,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_ID}`,
      chainId: 11155111,
      accounts: [PRIVATE_KEY],
      allowUnlimitedContractSize: true,
    }
  }
};
