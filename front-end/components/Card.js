import styles from '../styles/Home.module.css'

export default function Card({scanMint}) {
    return(
        <div className={styles.card}>
            <h3>Bot Parameters:</h3>
            <input id='contractAddressInput' type="text" placeholder='Contract Address'></input>
            <p id='contractError' className={styles.error}></p>
            <input id='quantityInput' type="number" placeholder='Quantity'></input>
            <p id='quantityError' className={styles.error}></p>
            <input id='costInput' type="number" placeholder='Cost (ETH)'></input>
            <p id='costError' className={styles.error}></p>
            <input id='gasInput' type="number" placeholder='Gas Limit'></input>
            <p id='gasError' className={styles.error}></p>
            <button id='scanButton' type='submit' onClick={scanMint} className={styles.btn}>MINT</button>
        </div>
    );
}