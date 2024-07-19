const { ethers } = require("hardhat")
const dotenv = require("dotenv")
dotenv.config()

const { PRIVATE_KEY } = process.env

async function main() {
    const tx = {
        to: "0x623Bc4F96d9a1C186002754a2A0a8Ca59d3ce81d",
        value: 1e13,
    }

    const provider = new ethers.JsonRpcProvider("")
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

    for (let i = 0; i < 1; i++) {
        const txn = await wallet.sendTransaction(tx)
        await txn.wait()
    }
}

main()