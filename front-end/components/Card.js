import styles from '../styles/Home.module.css'

export default function Card() {
    return(
        <div className={styles.card}>
            <input placeholder='Contract Address'></input>
            <input placeholder='Quantity'></input>
            <input placeholder='Gas Limit'></input>
            <button className={styles.btn}>Mint</button>
        </div>
    );
}