const { ethers, network, run } = require("hardhat")
const { networks } = require("../hardhat.config")
const config = require("../config/uris.json")
const dotenv = require("dotenv")
const fs = require("fs")
const path = require("path")

const mainPath = path.join(__dirname, "../config/tokens.json")

dotenv.config()

async function main() {
    const YUSDCContract = await ethers.getContractFactory("YUSDC")
    const YNFTContract = await ethers.getContractFactory("YNFT")

    const yUSDC = await YUSDCContract.deploy()

    await yUSDC.waitForDeployment()
    await yUSDC.deploymentTransaction().wait(6)
    const yUSDCAddress = await yUSDC.getAddress()

    console.log("Deployed on", network.name, "at", yUSDCAddress)
    console.log("Verifying...")
    await run("verify:verify", {
        address: yUSDCAddress,
        constructorArguments: []
    })
    console.log("Verified!")

    let i = 1
    const deployments = {}

    for (const { name, symbol, uri } of Object.values(config)) {
        const yNFT = await YNFTContract.deploy(name, symbol, uri)

        await yNFT.waitForDeployment()
        const yNFTAddress = await yNFT.getAddress()
        await yNFT.deploymentTransaction().wait(6)

        console.log("YNFT deployed on", network.name, "at", yNFTAddress)
        console.log("Verifying...")
        await run("verify:verify", {
            address: yNFTAddress,
            constructorArguments: [
                name,
                symbol,
                uri
            ]
        })
        console.log("Verified!")
        deployments[i] = yNFTAddress

        i += 1
    }

    const fileContents = JSON.parse(fs.readFileSync(mainPath))
    const data = {
        erc20: {
            [network.name]: yUSDCAddress,
            ...fileContents.erc20,
        },
        erc721: {
            [network.name]: {
                ...deployments
            },
            ...fileContents.erc721
        }
    }

    fs.writeFileSync(mainPath, JSON.stringify(data))
}

main()