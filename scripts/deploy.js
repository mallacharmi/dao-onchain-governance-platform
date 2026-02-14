const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy Governance Token
  const Token = await hre.ethers.getContractFactory("GovernanceToken");
  const token = await Token.deploy();
  await token.waitForDeployment();

  console.log("GovernanceToken deployed at:", await token.getAddress());

  // Deploy Governor
  const Governor = await hre.ethers.getContractFactory("MyGovernor");
  const governor = await Governor.deploy(await token.getAddress());
  await governor.waitForDeployment();

  console.log("MyGovernor deployed at:", await governor.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
