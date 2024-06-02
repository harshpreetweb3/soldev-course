// A code for a token factory

import { createMint } from "@solana/spl-token";

import "dotenv/config";

import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";

import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
  );



