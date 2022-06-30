import styles from '../styles/Home.module.css'

export default function DeployCard({deploy}) {
    return(
        <div className={styles.deploy}>
            <h3>NFT Contract Address:</h3>
            <p id='contractAddress'></p>
            <button id='deployButton' onClick={deploy} className={styles.btn}>DEPLOY</button>
        </div>
    );
}