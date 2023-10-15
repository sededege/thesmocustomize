import { WalletMultiButton } from '@solana/wallet-adapter-material-ui'
import { Metaplex, keypairIdentity, bundlrStorage, PublicKey } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import Home from './Home';
import Select from './Select';
import * as web3 from "@solana/web3.js"

const App = () => {

  const walletpub = useWallet()

  const walletphantom = walletpub.publicKey?.toBase58()

  const secret = JSON.parse(import.meta.env.VITE_PRIVATE_KEY ?? "")
  const secretKey = Uint8Array.from(secret)
  const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)

/*   const connection = new Connection('https://convincing-wiser-sponge.solana-mainnet.quiknode.pro/08e47135ea457ea8e50d350eb86f9b69bd43e227/');
 */  const connection = new Connection(clusterApiUrl('devnet'));

  const wallet = Keypair.generate();
  const [nfts, setNfts] = useState([])


  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(keypairFromSecretKey))
    .use(bundlrStorage({
      address: 'https://devnet.bundlr.network',
      providerUrl: clusterApiUrl('devnet'),
      timeout: 6000,
    }))

  useEffect(() => {

    start()


  }, [walletphantom])


  const start = async () => {
    const myNfts = await metaplex
      .nfts()
      .findAllByOwner({ owner: new PublicKey(walletphantom) })

    setNfts(myNfts.slice(0,8))




  }





  const uploadMetadataa = async () => {
    const uploadedMetadata = await metaplex.nfts().uploadMetadata({
      name: 'asd',
      symbol: 'asd',
      description: 'asd',
      image: './Solana.png',
    })
    
   
    console.log('Metadata upload result:', uploadedMetadata.uri);
  };

  return (
    <div className='w-full h-[100vh] items-center justify-center flex'>
      {
        walletphantom ? <Select nfts={nfts} /> : <WalletMultiButton />
      }

    </div>
  )
}

export default App