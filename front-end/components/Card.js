import styles from '../styles/Home.module.css'

export default function Card() {
    return(
        <div className={styles.card}>
            <h3>Bot Parameters:</h3>
            <input placeholder='Contract Address'></input>
            <input placeholder='Quantity'></input>
            <input placeholder='Gas Limit'></input>
            <button className={styles.btn}>SCAN</button>
        </div>
    );
}