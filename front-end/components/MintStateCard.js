import styles from '../styles/Home.module.css'

export default function MintStateCard({toggleMintActive}) {
    return(
        <div className={styles.mintState}>
            <h3>Mint Active:</h3>
            <p id='mintActive'></p>
            <button onClick={toggleMintActive} className={styles.btn}>TOGGLE</button>
        </div>
    );
}