const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EmpowerHubRequests", function () {
  let empowerHubRequests;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    
    const EmpowerHubRequests = await ethers.getContractFactory("EmpowerHubRequests");
    empowerHubRequests = await EmpowerHubRequests.deploy();
  });

  it("Should store a request", async function () {
    const description = "Test request description";
    await empowerHubRequests.storeRequest(description);
    
    const requests = await empowerHubRequests.getRequests();
    expect(requests.length).to.equal(1);
    expect(requests[0].description).to.equal(description);
  });

  it("Should emit RequestStored event", async function () {
    const description = "Test request description";
    
    await expect(empowerHubRequests.storeRequest(description))
      .to.emit(empowerHubRequests, "RequestStored")
      .withArgs(0, description);
  });
});
