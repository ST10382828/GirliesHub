// Placeholder ethers.js integration
export async function connectWallet() {
  return { address: "0xMockWalletAddress", status: "Connected (mock)" };
}

export async function storeRequestOnChain(description) {
  console.log("Pretend storing on blockchain:", description);
  return { txHash: "0xMockTxHash" };
}

export async function getRequestsFromChain() {
  return [
    { id: 0, description: "Mock request 1" },
    { id: 1, description: "Mock request 2" },
  ];
}
