const { expect } = require("chai");

describe("DAO Governance", function () {
  let token, governor, owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("GovernanceToken");
    token = await Token.deploy();
    await token.waitForDeployment();

    const Governor = await ethers.getContractFactory("MyGovernor");
    governor = await Governor.deploy(await token.getAddress());
    await governor.waitForDeployment();
  });

  it("Token deployed successfully", async function () {
    expect(await token.name()).to.equal("GovernanceToken");
  });

  it("Should allow vote delegation", async function () {
    await token.delegate(owner.address);
    expect(await token.getVotes(owner.address)).to.not.equal(0);
  });
});
