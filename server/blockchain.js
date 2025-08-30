const { ethers } = require('ethers');
const path = require('path');
const fs = require('fs');

// Load contract ABI
const contractPath = path.join(__dirname, '../artifacts/contracts/EmpowerHubRequests.sol/EmpowerHubRequests.json');
const contractArtifact = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

// Initialize provider and contract
const provider = new ethers.JsonRpcProvider(process.env.BDAG_RPC_URL || 'https://rpc.primordial.bdagscan.com');
const contractAddress = process.env.CONTRACT_ADDRESS;

if (!contractAddress) {
  throw new Error('CONTRACT_ADDRESS environment variable is required');
}

const contract = new ethers.Contract(contractAddress, contractArtifact.abi, provider);

// Create wallet instance for transactions (using private key from env)
let wallet;
if (process.env.PRIVATE_KEY) {
  wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contractWithSigner = contract.connect(wallet);
}

module.exports = {
  async connectWallet() {
    return { 
      address: wallet ? wallet.address : "No wallet configured", 
      status: wallet ? "Connected" : "No private key configured" 
    };
  },

  async storeRequestOnBlockchain(requestData) {
    try {
      console.log('📦 [BLOCKCHAIN] Storing request on blockchain...');
      
      if (!wallet) {
        throw new Error('No wallet configured - PRIVATE_KEY required for transactions');
      }

      // Create request hash from request data
      const requestHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(requestData)));
      
      // Map request type to contract format
      const requestTypeMap = {
        'Finance': 'finance',
        'GBV Support': 'gbv', 
        'Sanitary Aid': 'sanitary'
      };
      
      const requestType = requestTypeMap[requestData.requestType] || 'finance';
      
      // Store on blockchain
      const contractWithSigner = contract.connect(wallet);
      const tx = await contractWithSigner.storeRequest(requestHash, requestType);
      const receipt = await tx.wait();
      
      console.log('✅ Request stored on blockchain:', receipt.hash);
      
      return {
        success: true,
        transactionId: receipt.hash,
        blockHash: receipt.blockHash,
        requestId: requestData.id,
        timestamp: new Date().toISOString(),
        gasUsed: receipt.gasUsed.toString(),
        blockNumber: receipt.blockNumber,
        confirmations: receipt.confirmations,
        network: 'BlockDAG Testnet',
        message: 'Request successfully stored on blockchain',
        requestHash: requestHash,
        requestType: requestType
      };
    } catch (error) {
      console.error('❌ Blockchain storage failed:', error);
      throw error;
    }
  },

  async getRequestsFromBlockchain() {
    try {
      console.log('🔍 [BLOCKCHAIN] Fetching requests from blockchain...');
      
      const requests = await contract.getRequests();
      
      return requests.map((request, index) => ({
        id: request.id.toString(),
        requestHash: request.requestHash,
        timestamp: new Date(parseInt(request.timestamp) * 1000).toISOString(),
        requestType: request.requestType,
        requester: request.requester
      }));
    } catch (error) {
      console.error('❌ Failed to fetch requests from blockchain:', error);
      throw error;
    }
  },

  async storeHashOnBlockchain(requestData) {
    // Alias for storeRequestOnBlockchain for backward compatibility
    return await module.exports.storeRequestOnBlockchain(requestData);
  },

  async getTransactionProof(requestId) {
    try {
      console.log(`🔍 [BLOCKCHAIN] Getting transaction proof for request: ${requestId}`);
      
      // Get request from blockchain
      const requests = await contract.getRequests();
      const request = requests.find(r => r.id.toString() === requestId);
      
      if (!request) {
        throw new Error('Request not found on blockchain');
      }
      
      return {
        success: true,
        requestId: requestId,
        transactionId: 'N/A', // Would need to track transaction hashes
        blockHash: 'N/A', // Would need to track block hashes
        blockNumber: 'N/A',
        merkleProof: [],
        verified: true,
        confirmations: 1,
        timestamp: new Date(parseInt(request.timestamp) * 1000).toISOString(),
        network: 'BlockDAG Testnet',
        message: 'Request verified on blockchain',
        requestData: {
          id: request.id.toString(),
          requestHash: request.requestHash,
          timestamp: new Date(parseInt(request.timestamp) * 1000).toISOString(),
          requestType: request.requestType,
          requester: request.requester
        }
      };
    } catch (error) {
      console.error('❌ Failed to get transaction proof:', error);
      throw error;
    }
  },

  async getRequestCount() {
    try {
      const count = await contract.getRequestCount();
      return count.toString();
    } catch (error) {
      console.error('❌ Failed to get request count:', error);
      throw error;
    }
  }
};


