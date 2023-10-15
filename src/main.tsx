import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  ConnectionProvider,
  WalletProvider,
  
} from "@solana/wallet-adapter-react";
import {
  WalletDialogProvider,
} from "@solana/wallet-adapter-material-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import Home from './Home.tsx';

const endpoint = 'https://billowing-virulent-gas.solana-mainnet.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/';
const wallets = [new PhantomWalletAdapter(),  new SolflareWalletAdapter()];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>
    <App/>
        </WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  </React.StrictMode>,
)
