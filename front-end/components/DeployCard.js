import styles from '../styles/Home.module.css'

export default function DeployCard() {
    return(
        <div className={styles.deploy}>
            <button className={styles.btn}>DEPLOY</button>
        </div>
    );
}