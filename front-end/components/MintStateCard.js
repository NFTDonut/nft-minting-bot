import styles from '../styles/Home.module.css'

export default function MintStateCard() {
    return(
        <div className={styles.deploy}>
            <h3>Mint State:</h3>
            <button className={styles.btn}>STATE</button>
        </div>
    );
}