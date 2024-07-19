const { ethers } = require("hardhat")
const { networks } = require("../hardhat.config")
const dotenv = require("dotenv")

dotenv.config()

const { PRIVATE_KEY } = process.env

const { address } = new ethers.Wallet(PRIVATE_KEY)

async function main() {
    for (const network of Object.keys(networks)) {
        const { url } = networks[network]
        const provider = new ethers.JsonRpcProvider(url)
        const nonce = await provider.getTransactionCount(address)

        console.log({ network, nonce })
    }
}

main()