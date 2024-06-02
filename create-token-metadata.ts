import "dotenv/config";
import {
    getKeypairFromEnvironment,
    getExplorerLink,
} from "@solana-developers/helpers";

import {
    Connection,
    clusterApiUrl,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";

import { createCreateMetadataAccountInstruction, createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

const user = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));

console.log(
    `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

console.log(`token metadata program id : ${TOKEN_METADATA_PROGRAM_ID}`);

const tokenMintAccount = new PublicKey("F4g3VWny3u3arBSG8yMUsk1SemwB1FdJArmBByRPifzN");

console.log(`tokenMintAccount : ${tokenMintAccount}`);

const metadataData = {
    name: "Solana Training Token",
    symbol: "TRAINING",
    // Arweave / IPFS / Pinata etc link using metaplex standard for off-chain data
    uri: "https://arweave.net/1234",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
};

const metadataPDAAndBump = PublicKey.createProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer()
    ],
    TOKEN_METADATA_PROGRAM_ID
)

console.log(`metadataPDAAndBump : ${metadataPDAAndBump}`);

// const metadataPDA = metadataPDAAndBump[0];



const transaction = new Transaction();

const createMetadataAccountInstruction =
    createCreateMetadataAccountV3Instruction(
        {
            metadata: metadataPDAAndBump,
            mint: tokenMintAccount,
            mintAuthority: user.publicKey,
            payer: user.publicKey,
            updateAuthority: user.publicKey,
        },
        {
            createMetadataAccountArgsV3: {
                collectionDetails: null,
                data: metadataData,
                isMutable: true,
            },
        }
    );

console.log(`createMetadataAccountInstruction : ${createMetadataAccountInstruction}`);

transaction.add(createMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [user]
);

console.log(`transactionSignature : ${transactionSignature}`);

const transactionLink = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet"
);

console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);

const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet"
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);
