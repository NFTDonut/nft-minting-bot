import styles from '../styles/Home.module.css'

export default function Instructions() {
    return(
        <div className={styles.instructions}>
            <h3>Purpose:</h3>
            <p className={styles.instructionText}>This demonstration allows you to deploy an ERC721 NFT smart contract and test an NFT minting bot that will mint 
                from the contract once the mintActive state is true.</p>
            <h3>Instructions:</h3>
            <p className={styles.instructionText}><strong>Step 1: </strong>Connect your wallet to the website.</p>
            <p className={styles.instructionText}><strong>Step 2: </strong>Press DEPLOY to deploy the ERC721 contract.</p>
            <p className={styles.instructionText}><strong>Step 3: </strong>Enter your desired mint bot parameters (max of 20 mints @ 0.0001 ETH each).</p>
            <p className={styles.instructionText}><strong>Step 4: </strong>Press TOGGLE and select Confirm to toggle the mintActive bool state on the smart contract.</p>
            <p className={styles.instructionText}><strong>Step 5: </strong>While the toggle function is pending, press MINT.</p>
            <p className={styles.instructionText}><strong>Step 6: </strong>Once the mintActive state is set to true, you will immediately be prompted to sign a transaction to mint your NFT!</p>
        </div>
    );
}