import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

(async () => {
  try {
    // This is our governance contract.
    const vote = await sdk.getContract("0x58bE0DFe2823459096459Cfb02729617e71B619B", "vote");
    // This is our ERC-20 contract.
    const token = await sdk.getContract("0x4245B269Dc5fC9d81d127178a7188da417B189E1", "token");
    // Create proposal to transfer ourselves 10 tokens for being awesome.
    const amount = 10;
    const description = "[Demo purposes] Should the club transfer " + amount + " tokens from the treasury to " +
      process.env.WALLET_ADDRESS + " for being awesome?";
    const executions = [
      {
        // Again, we're sending ourselves 0 MATIC. Just sending our own token.
        nativeTokenValue: 0,
        transactionData: token.encoder.encode(
          // We're doing a transfer from the treasury to our wallet.
          "transfer",
          [
            process.env.WALLET_ADDRESS,
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
        toAddress: token.getAddress(),
      },
    ];

    await vote.propose(description, executions);

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create second proposal", error);
  }
})();