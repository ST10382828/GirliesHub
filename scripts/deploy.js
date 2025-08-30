const hre = require("hardhat");

async function main() {
  const EmpowerHubRequests = await hre.ethers.getContractFactory("EmpowerHubRequests");
  const empowerHubRequests = await EmpowerHubRequests.deploy();

  await empowerHubRequests.waitForDeployment();

  console.log("EmpowerHubRequests deployed to:", await empowerHubRequests.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
