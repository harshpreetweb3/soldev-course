import { Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

const public_key = new PublicKey("F4g3VWny3u3arBSG8yMUsk1SemwB1FdJArmBByRPifzN");

const connection = new Connection("https://api.devnet.solana.com", "confirmed" );

const balanceInLampords = await connection.getBalance(public_key);

const balanceInSol = balanceInLampords / LAMPORTS_PER_SOL;

console.log(`balance of the address : ${public_key} is : ${balanceInSol}`);



