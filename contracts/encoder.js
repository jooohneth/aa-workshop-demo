const { encodeFunctionData } = require("viem");
const { abi } = require("./artifacts/contracts/GasTank.sol/GasTank.json");

const data = encodeFunctionData({
  abi,
  functionName: "requestGas",
  args: [5000000000000000000n],
});

console.log(`Data: ${data}`);
