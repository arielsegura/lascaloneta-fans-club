import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    // This is our governance contract.
    const vote = await sdk.getContract("0x58bE0DFe2823459096459Cfb02729617e71B619B", "vote");
    // This is our ERC-20 contract.
    const token = await sdk.getContract("0x4245B269Dc5fC9d81d127178a7188da417B189E1", "token");
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // This is our governance contract.
    const vote = await sdk.getContract("0x58bE0DFe2823459096459Cfb02729617e71B619B", "vote");
    // This is our ERC-20 contract.
    const token = await sdk.getContract("0x4245B269Dc5fC9d81d127178a7188da417B189E1", "token");
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent40 = Number(ownedAmount) / 100 * 40;

    // Transfer 90% of the supply to our voting contract.
    await token.transfer(
      vote.getAddress(),
      percent40
    ); 

    console.log("✅ Successfully transferred " + percent40 + " tokens to vote contract");
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();