const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GasTankModule", (m) => {
  // const gasTank = m.contract("GasTank", {
  //   value: "100000000000000000000",
  // });

  const gasTank = m.contract("GasTank");
  m.call(gasTank, "refillGas", [], { value: 100000000000000000000n });

  return { gasTank };
});
