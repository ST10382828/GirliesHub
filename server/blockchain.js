// Mock blockchain functions (to be replaced later with ethers.js + real contracts)
module.exports = {
  async connectWallet() {
    return { address: "0xMockWalletAddress", status: "Connected (mock)" };
  },

  async storeRequestOnBlockchain(description) {
    console.log("Mock store:", description);
    return { txHash: "0xMockTxHash", status: "Pending" };
  },

  async getRequestsFromBlockchain() {
    return [
      { id: 0, description: "Mock request 1" },
      { id: 1, description: "Mock request 2" },
    ];
  },

  async storeHashOnBlockchain(requestData) {
    console.log('📦 [BLOCKCHAIN STUB] Storing request hash on blockchain...');
    const mockHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    const mockTransactionId = `0x${Math.random().toString(16).substr(2, 64)}`;
    
    return {
      success: true,
      transactionId: mockTransactionId,
      blockHash: mockHash,
      requestId: requestData.id,
      timestamp: new Date().toISOString(),
      gasUsed: '21000',
      blockNumber: Math.floor(Math.random() * 1000000),
      confirmations: 1,
      network: 'BlockDAG Testnet',
      message: 'Request hash successfully stored on blockchain'
    };
  },

  async getTransactionProof(requestId) {
    console.log(`🔍 [BLOCKCHAIN STUB] Getting transaction proof for request: ${requestId}`);
    
    return {
      success: true,
      requestId: requestId,
      transactionId: `0x${Math.random().toString(16).substr(2, 64)}`,
      blockHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      blockNumber: Math.floor(Math.random() * 1000000),
      merkleProof: [
        `0x${Math.random().toString(16).substr(2, 64)}`,
        `0x${Math.random().toString(16).substr(2, 64)}`,
        `0x${Math.random().toString(16).substr(2, 64)}`
      ],
      verified: true,
      confirmations: Math.floor(Math.random() * 100) + 1,
      timestamp: new Date().toISOString(),
      network: 'BlockDAG Testnet',
      message: 'Transaction proof verified on blockchain'
    };
  }
};


