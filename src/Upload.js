import { bundlrStorage, keypairIdentity, Metaplex, toMetaplexFile } from "@metaplex-foundation/js"
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js"
import base58 from "bs58"
import * as dotenv from "dotenv"
import * as fs from "fs"
dotenv.config()

// update these variables!
// Connection endpoint, switch to a mainnet RPC if using mainnet
const ENDPOINT = clusterApiUrl('devnet')

// Devnet Bundlr address
const BUNDLR_ADDRESS = "https://devnet.bundlr.network"

// Mainnet Bundlr address, uncomment if using mainnet
// const BUNDLR_ADDRESS = "https://node1.bundlr.network"

// NFT metadata
const NFT_NAME = "Golden Ticket"
const NFT_SYMBOL = "GOLD"
const NFT_DESCRIPTION = "A golden ticket that grants access to loyalty rewards"
// Set this relative to the root directory
const NFT_IMAGE_PATH = "./solana.png"
const NFT_FILE_NAME = "solana.png"


async function main() {
  // Get the shop keypair from the environment variable
  const shopPrivateKey = [253,140,140,133,71,40,40,61,8,231,111,204,104,81,235,192,44,181,91,54,4,217,49,241,174,79,118,154,20,207,243,242,114,121,201,141,179,142,229,120,203,5,201,247,19,219,221,213,108,143,165,176,204,241,84,69,139,248,70,231,210,156,217,24]
  const shopKeypair = Keypair.fromSecretKey(base58.decode(shopPrivateKey))

  const connection = new Connection(ENDPOINT)

  const nfts = Metaplex
    .make(connection, { cluster: 'devnet' })
    .use(keypairIdentity(shopKeypair))
    .use(bundlrStorage({
      address: BUNDLR_ADDRESS,
      providerUrl: ENDPOINT,
      timeout: 60000
    }))
    .nfts();

  const imageBuffer = fs.readFileSync(NFT_IMAGE_PATH)
  const file = toMetaplexFile(imageBuffer, NFT_FILE_NAME)

  const uploadedMetadata = await nfts.uploadMetadata({
    name: NFT_NAME,
    symbol: NFT_SYMBOL,
    description: NFT_DESCRIPTION,
    image: file,
  })

  console.log(`Uploaded metadata: ${uploadedMetadata.uri}`)
}

main()
  .then(() => {
    console.log("Done!")
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
