import { Transaction, PublicKey, SystemProgram, sendAndConfirmTransaction, Connection } from "@solana/web3.js";

import "dotenv/config";

import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// const receiverPublicKey = process.argv[3] || null;

const receiverPublicKey = "2ChZ2yN5kKpyCVLk44monFHuajPW43fBrUyUBrEJQkwY";


if (!receiverPublicKey) {
    console.log(`plz provide a public key to send to`);
    process.exit(1)
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`receiver public key ${receiverPublicKey}`);

const toAddress = new PublicKey(receiverPublicKey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

//make a transaction

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer(
    {
        fromPubkey: senderKeypair.publicKey,
        toPubkey: toAddress,
        lamports: LAMPORTS_TO_SEND
    }
);

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair])


console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toAddress}. `
);

console.log(`Transaction signature is ${signature}!`);