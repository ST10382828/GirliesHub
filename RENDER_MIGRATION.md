# GirliesHub: Move backend to Render + switch to BlockDAG Awakening

## 1) Deploy backend to Render

- **Service type**: Web Service
- **Repo**: your GirliesHub repo
- **Root directory**: `server`
- **Build command**: `npm install`
- **Start command**: `npm start`
- **Health check path**: `/health` (or `/api/health`)

### Render environment variables (backend)

Set these in Render (avoid trailing slashes):

- `NODE_ENV=production`
- `PORT=5001` (Render can also provide `PORT`; keeping is fine)
- `CORS_ORIGIN=https://<your-netlify-site>.netlify.app`
- `FIREBASE_PROJECT_ID=girlieshub-cb344`
- `FIREBASE_SERVICE_ACCOUNT_JSON=<minified-service-account-json>`
- `GEMINI_API_KEY=<your-gemini-key>`
- `BDAG_RPC_URL=https://rpc.awakening.bdagscan.com`
- `PRIVATE_KEY=<funded-awakening-wallet-private-key>`
- `CONTRACT_ADDRESS=<awakening-contract-address>`
- `RUN_QUEUE_WORKER=true`
- `DUAL_WRITE_MODE=false` (optional; keep false to use queue)
- `ENCRYPTION_KEY=<64-hex-chars>` (optional; only if you previously used encryption)

Notes:
- `server/server.js` accepts `CORS_ORIGIN` (and also supports `ALLOWED_ORIGIN`).
- The queue worker only starts if `RUN_QUEUE_WORKER=true`.

## 2) Deploy contract to Awakening

Your deployer wallet **must have testnet BDAG** on Awakening.

- Faucet docs: `https://docs.blockdagnetwork.io/block-explorer/evm/faucet`
- Fund this deployer address (from our last attempt): `0x7686b2590A99e4d0F39B6E3d98C304629694948e`

Then deploy from repo root:

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network blockdag
```

Copy the printed contract address and set it as:
- Render: `CONTRACT_ADDRESS`
- Netlify: `REACT_APP_CONTRACT_ADDRESS`

## 3) Update Netlify frontend env vars

In Netlify site settings → Environment variables:

- `REACT_APP_API_URL=https://<your-render-service>.onrender.com`
- `REACT_APP_BDAG_RPC_URL=https://rpc.awakening.bdagscan.com`
- `REACT_APP_BDAG_CHAIN_ID=1043`
- `REACT_APP_BLOCKDAG_EXPLORER=https://bdagscan.com/awakening`
- `REACT_APP_CONTRACT_ADDRESS=<awakening-contract-address>`

Keep your existing `REACT_APP_FIREBASE_*` values as they were (no backend migration needed for those).

## 4) Verify

- Backend health:
  - `GET https://<render>.onrender.com/health`
- Frontend:
  - Submit a request
  - Confirm it appears in Firestore
  - Confirm the worker updates it with `txHash` and explorer link opens on Awakening

