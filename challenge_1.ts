import {Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js"

import "dotenv/config";

import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const key_pair = getKeypairFromEnvironment("SECRET_KEY");

const public_key = key_pair.publicKey.toBase58();

function check_public_key_validitity(address : String){
    try{
        new PublicKey(address)
        return true
    }catch(e){
        return false
    }
}

if (check_public_key_validitity(public_key)){
    console.log(`Valid! public key : ${public_key}`);
}else{
    console.error("Invalid public key!")
}


// const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

const connection = new Connection("https://api.devnet.solana.com", "confirmed");





