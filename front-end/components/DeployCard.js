import styles from '../styles/Home.module.css'

export default function DeployCard({deploy}) {
    return(
        <div className={styles.deploy}>
            <h3>NFT Contract Address:</h3>
            <p id='contractAddress'>Contract address</p>
            <button onClick={deploy} className={styles.btn}>DEPLOY</button>
        </div>
    );
}