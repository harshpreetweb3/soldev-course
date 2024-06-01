import { LAMPORTS_PER_SOL, Connection, PublicKey} from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];

console.log(`less see what m getting ${suppliedPublicKey}`)

if (!suppliedPublicKey) {
    throw new Error("plz provide a public key to check balance of!}");
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const publicKey = new PublicKey(suppliedPublicKey);

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);
