const fs = require("fs")
const path = require("path")
const erc20Abi = require("../artifacts/contracts/YUSDC.sol/YUSDC.json")
const erc721Abi = require("../artifacts/contracts/YNFT.sol/YNFT.json")

const mainPath = path.join(__dirname, "../config/tokens.json")

async function main() {
    const data = {
        erc20: {
            abi: erc20Abi.abi
        },
        erc721: {
            abi: erc721Abi.abi
        }
    }

    fs.writeFileSync(mainPath, JSON.stringify(data))
}

main()