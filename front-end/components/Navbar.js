import styles from '../styles/Home.module.css'

export default function Navbar({connectWallet}) {

    return(
        <div className={styles.nav}>
            <h1>NFT Minting Bot</h1>
            <button id='walletButton' onClick={connectWallet} className={styles.btn}>Connect Wallet</button>
        </div>
    );


}