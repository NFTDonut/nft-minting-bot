import styles from '../styles/Home.module.css'

export default function Navbar() {

    return(
        <div className={styles.nav}>
            <h1>NFT Minting Bot</h1>
            <button className={styles.btn}>Connect Wallet</button>
        </div>
    );


}