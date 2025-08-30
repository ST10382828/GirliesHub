
# 📝 Master Cursor Prompt for Blockchain Integration

**Context for Cursor:**
We are building a hackathon project called **GirliesHub: Integrated Support for Women**.

* ✅ **Frontend**: Already built in **React.js v18** with **Material-UI (MUI v5)**. Working screens + navigation exist.
* ✅ **Backend**: Node.js/Express server, currently contains **mock blockchain functions** in `server/blockchain.js`.
* ❌ **Smart contracts**: None exist yet. No `.sol` files or Hardhat setup.
* ❌ **Blockchain integration**: Not implemented (no ethers.js, no wallet, no BlockDAG connection).
* ❌ **Deployment**: Not yet deployed on BlockDAG testnet or hosted frontend.

**Hackathon Rule Requirements (must follow):**

1. Frontend must use **React.js** + allowed UI frameworks (MUI/Tailwind/Chakra).
2. Smart contracts must be written in **Solidity**, **EVM-compatible**, and deployable on the **BlockDAG Testnet**.
3. Blockchain integration must use **ethers.js** (or web3.js) + wallet connection (MetaMask/WalletConnect).
4. Contracts must be deployed to **BlockDAG Testnet** (RPC: `https://rpc.primordial.bdagscan.com`, Chain ID: `1043`).
5. Final project must be hosted (Vercel/Netlify/IPFS).

**Team workflow:**

* Teammates are building UI features separately (mock-only for now).
* My role: **Implement the blockchain backend end-to-end** so once they finish UI features, we can merge into a working dApp.

---

## 🔧 Instructions for Cursor

1. **Never create duplicate files**. Always check if a file exists → if yes, refactor/update; if no, create it.
2. **Follow steps in order**. After finishing a step, **validate/test** before moving to the next.
3. **Maintain modularity**: all blockchain logic should go into **contracts/**, **hardhat.config.js**, **server/blockchain.js**, and **client/src/blockchain/**.
4. **End Goal**: A working full-stack dApp where:

   * MetaMask connects
   * User submits a request (finance/GBV/sanitary aid)
   * Request hash is stored on BlockDAG via Solidity contract
   * Data can be read back from blockchain
   * Transactions visible in BlockDAG Explorer

---

## 🚀 Step-by-Step Build Plan

### **Step 0 — Setup**

* Ensure `.env` exists in root with:

  ```
  BDAG_RPC_URL=https://rpc.primordial.bdagscan.com
  PRIVATE_KEY=0xYOUR_TEST_PRIVATE_KEY
  ```
* Install missing dependencies in both **client** and **server**:

  ```json
  // client/package.json
  "ethers": "^6.7.0",
  "web3modal": "^2.4.0"

  // server/package.json
  "ethers": "^6.7.0",
  "hardhat": "^2.19.0",
  "@nomicfoundation/hardhat-toolbox": "^3.0.0",
  "@openzeppelin/contracts": "^5.0.0"
  ```

---

### **Step 1 — Smart Contract**

* Create `contracts/EmpowerHubRequests.sol` with Solidity code for storing/retrieving request metadata (hashes + timestamps).
* Run `npx hardhat compile` to confirm compilation.

✅ **Validation**: Contract compiles without errors.

---

### **Step 2 — Hardhat Config**

* Create/update `hardhat.config.js` with BlockDAG testnet.
* Add `scripts/deploy.js` to deploy the contract.
* Run deployment → output deployed address.
* Save contract address in `.env` as `CONTRACT_ADDRESS`.

✅ **Validation**: Contract deployed successfully, visible in BlockDAG Explorer.

---

### **Step 3 — Backend Integration**

* Refactor `server/blockchain.js` to replace mock functions with real **ethers.js** calls:

  * `storeRequestOnBlockchain()` → sends TX to contract.
  * `getRequestsFromChain()` → fetches stored requests.
* Use `ethers.Contract` with deployed contract ABI + address.

✅ **Validation**: Test API endpoints (`POST /api/request`, `GET /api/requests`) → confirm blockchain transactions.

---

### **Step 4 — Frontend Integration**

* Add `client/src/blockchain/contract.js` with functions for MetaMask wallet connection + signing.
* Add **Connect Wallet button** to navbar.
* Update **RequestForm**:

  * On submit, hash request description → call backend API → which stores it on blockchain.

✅ **Validation**: Submit request → MetaMask opens → TX confirmed → TX visible in BlockDAG Explorer.

---

### **Step 5 — Deployment**

* Frontend → deploy on **Vercel/Netlify**.
* Backend → deploy on **Render/Heroku** (must still connect to BlockDAG).
* Confirm end-to-end dApp works publicly.

✅ **Validation**: Open deployed app → connect wallet → submit request → see it on BlockDAG Explorer.

---

## 📌 Reminder for Cursor

* Always **reference this file (BLOCKCHAIN\_PLAN.md)** before making changes.
* Work **incrementally**: finish + test each step before continuing.
* Never overwrite teammate UI code. Keep blockchain logic isolated.

