import "dotenv/config";
import { Hex, createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import {
  createSmartAccountClient,
  PaymasterMode,
  SupportedSigner,
} from "@biconomy/account";
import { mantleSepoliaTestnet } from "viem/chains";

const config = {
  biconomyPaymasterApiKey: process.env.PAYMASTER_API_KEY,
  bundlerUrl:
    "https://bundler.biconomy.io/api/v2/5003/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
  privateKey: process.env.PRIVATE_KEY,
};

export const requestGas = async (to: string, data: Hex) => {
  // ----- 1. Generate EOA from private key
  const account = privateKeyToAccount(config.privateKey as Hex);
  const client = createWalletClient({
    account,
    chain: mantleSepoliaTestnet,
    transport: http(),
  });
  const eoa = client.account.address;

  console.log(`EOA address: ${eoa}`);

  // ------ 2. Create biconomy smart account instance
  const smartAccount = await createSmartAccountClient({
    signer: client as SupportedSigner,
    bundlerUrl: config.bundlerUrl,
    biconomyPaymasterApiKey: config.biconomyPaymasterApiKey,
  });
  const scwAddress = await smartAccount.getAccountAddress();
  console.log("SCW Address", scwAddress);

  // ------ 3. Transaction data
  const txData = {
    to,
    data,
  };

  // ------ 4. Send user operation and get tx hash
  const userOpResponse = await smartAccount.sendTransaction(txData, {
    paymasterServiceData: { mode: PaymasterMode.SPONSORED },
  });

  const { transactionHash } = await userOpResponse.waitForTxHash();

  console.log("transactionHash", transactionHash);
};

requestGas(
  "0xF98F5336b4a6fdcD4bB620e00cF66Ef8101949E1",
  "0x6e1cdf890000000000000000000000000000000000000000000000004563918244f40000"
);
