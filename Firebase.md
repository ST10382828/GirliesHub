TASK: Implement Firebase (Firestore) persistent storage + auth integration for GirliesHub, and integrate with the existing blockchain flow. Work INCREMENTALLY and TEST after each step. Always check for existing files and patch them; do NOT overwrite team UI code. Back up any file you modify with a .bak timestamped copy.

PRINCIPLES:
- DB-first → Blockchain: save human-friendly data to Firestore first, set status 'pending', compute canonical hash server-side, then call existing blockchain function to store hash, then update Firestore doc with txHash/status.
- Use Firebase Auth for user sign-in and verification. Server verifies Firebase ID tokens.
- Keep privacy: encrypt sensitive fields at rest using ENCRYPTION_KEY env var (AES-256-GCM helper; provide toggle to stub encryption for demo).
- Provide idempotent sync: server service to listen to `RequestStored` events and reconcile Firestore documents (use txHash or requestHash to dedupe).
- Fail-safe: if Firestore write fails, do not call chain; if chain call fails, update doc with `error` and retry queue.
- Implement import/export scripts for migration; implement `dual-write` mode for phased migration.

START: Repo analysis & preflight
1. Inspect repo. Output exactly which files exist that will be touched: server/*, client/*, contracts/*, package.jsons. (Cursor already read files; print a short list.)
2. Create a new branch `feature/firebase-integration` (do not commit to main).
3. Ensure Node >=16. Print `node --version` and `npm --version`.

STEP 0 — Add env sample & scripts (Small)
- Create/patch file: `.env.sample` (repo root) with:
Blockchain
BDAG_RPC_URL=https://rpc.primordial.bdagscan.com
PRIVATE_KEY=0xYOUR_TEST_PRIVATE_KEY
CONTRACT_ADDRESS=0x...

Firebase (service account or JSON in env)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_SERVICE_ACCOUNT_PATH=./server/secrets/firebase-service-account.json
FIREBASE_SERVICE_ACCOUNT_JSON='' # optional: full JSON as a string (not recommended)

Encryption & JWT
ENCRYPTION_KEY=YOUR_64_HEX_CHARS_32_BYTES
JWT_SECRET=change-me

pgsql
Copy code

- Add npm scripts to `server/package.json` (only if missing):
"scripts": {
"start": "node index.js",
"dev": "nodemon index.js",
"sync:blockchain": "node services/blockchainSync.js",
"queue:worker": "node services/dbToChainQueue.js",
"migrate:export": "node scripts/exportData.js",
"migrate:import": "node scripts/importData.js"
}

markdown
Copy code
Validation: show `.env.sample` created/updated and `server/package.json` updated (print diffs).

STOP — Report summary and wait for confirmation to continue.

STEP 1 — Firebase Admin SDK & Firestore wiring (Small → Medium)
- Install server deps if not present:
`cd server && npm install firebase-admin firebase @google-cloud/firestore --save`
- Create `server/firebase.js` (if missing) that:
- Initializes `firebase-admin` using either `FIREBASE_SERVICE_ACCOUNT_PATH` (preferred) or `FIREBASE_SERVICE_ACCOUNT_JSON`.
- Exports `admin`, `firestore`, and a helper `verifyIdToken(idToken)` that validates Firebase token.
- Provide a quick test script `node -e "require('./server/firebase').test()"` that fetches a simple Firestore read (no production data).
- Create `.gitignore` entry for `server/secrets/*` and `server/secrets/*.json`.

Validation:
- Show `npm install` output.
- Run `node -e "require('./server/firebase').test && console.log('firebase ok')"` or equivalent; print output or any errors.

STOP — Report results. If Firebase credentials missing, report instructions to add service account JSON at `server/secrets/firebase-service-account.json` and how to set `FIREBASE_SERVICE_ACCOUNT_JSON` env var.

STEP 2 — Server auth middleware & token verification (Small)
- Create `server/middleware/authFirebase.js`:
- Exports `authMiddleware` that reads `Authorization: Bearer <idToken>`, verifies with `verifyIdToken`, appends `req.user = { uid, email, name }`.
- If token missing or invalid, returns 401.
- Patch server route files to use `authMiddleware` for protected endpoints (requests creation optional for anonymous; ensure `POST /api/requests` allows anonymous).
- Add helper `server/utils/fireAuthHelpers.js` with convenience functions: `getUidFromToken(token)`.

Validation:
- Provide curl example to call `/api/health` and a protected endpoint with a **mock** Firebase token flow. (If real token unavailable, test that middleware returns 401 with missing token.)

STOP — report.

STEP 3 — Firestore data model files & utilities (Medium)
- Create `server/services/firestoreService.js` (if missing) with functions:
- `createRequest(doc)` — writes to `requests` collection, sets `status: 'pending'` and `createdAt`.
- `updateRequest(requestId, update)` — partial updates (merge).
- `getRequest(requestId)`, `listRequests(filters)`.
- `createGBVReport(doc)` and `getGBVReports()`.
- `createTransaction(doc)` and `getTransactionsByUser(uid)`.
- `enqueuePendingChain(doc)` — writes to `db_chain_queue` collection for worker.
- Ensure canonical hashing helper included: `utils/hash.js` that uses `ethers.keccak256(ethers.toUtf8Bytes(canonicalString))`. Add canonicalization rules (sort keys alphabetically). Export `computeCanonicalHash(requestObj)`.
- Add encryption helpers `server/utils/crypto.js` (AES-256-GCM) that read `ENCRYPTION_KEY` from env. Provide `encryptIfEnabled(value)` toggle (if key unset, return plaintext and log warning).

Validation:
- `node -e "const s=require('./server/services/firestoreService'); s.createRequest({test:true}).then(r=>console.log(r)).catch(e=>console.error(e))"` — print result or error (if Firebase not configured, explain).
- Print sample Firestore document shape used for `requests`.

STOP — report.

STEP 4 — Replace in-memory request flow with Firestore-first flow (Medium → Large)
- Locate in-memory usage in `server/server.js` (Cursor found lines). Replace logic for `POST /api/requests`:
1. Accept request body, check `req.user` if present.
2. Write a Firestore doc via `createRequest` with `status: 'pending'` and include `submittedBy: uid || null`.
3. Compute canonical hash server-side with `computeCanonicalHash`.
4. Put the created doc id + hash into `db_chain_queue` collection (or call `storeRequestOnBlockchain()` directly depending on `DUAL_WRITE_MODE` flag).
5. Return response containing Firestore doc ID and status `pending`.
- Create `server/services/dbToChainQueue.js` worker that:
- Reads documents in `db_chain_queue` and processes: calls existing `server/blockchain.js` function to submit hash, waits for tx confirmation, then updates Firestore doc with `txHash`, `blockNumber`, `onchainAt`, and sets `status: 'onchain'` or `error`.
- Add retries and idempotency: if doc already has `txHash`, skip; use transactions or optimistic locking.
- Ensure `POST /api/requests` can be used anonymously (no `req.user`) but must record `anonymous: true` field.

Validation:
- Start server in dev mode. Use curl to POST a test request:
curl -X POST http://localhost:5000/api/requests -H "Content-Type: application/json" -d '{"requestType":"finance","description":"test from curl","location":"Cape Town"}'

vbnet
Copy code
- Confirm Firestore doc created (print doc path and sample fields).
- Start queue worker (`npm run queue:worker`) or let server call blockchain directly (based on config). Confirm the blockchain tx happens and Firestore doc updated with `txHash`.

STOP — report logs and show doc update; if blockchain submission fails, show error details and DB state.

STEP 5 — Read endpoints & frontend wiring (Small → Medium)
- Create/patch `GET /api/requests` to read from Firestore (with filtering by user or type); ensure admin role checks via `user_roles` collection.
- Create `GET /api/requests/:id` to fetch single doc and return sanitized view (decrypt fields if caller authorized).
- Update frontend (client) minimal changes:
- Add `client/src/firebase.js` that initializes Firebase client SDK using env (or uses `REACT_APP_...`).
- Add `client/src/contexts/AuthContext.js` that uses Firebase client auth to provide ID token and user info.
- Modify RequestForm submit handler to:
  - If user is logged in: attach Firebase ID token as Authorization header when calling `POST /api/requests`.
  - If not: still allow anonymous submit.
- Add UX: show request submission response (Firestore id + onchain status if available), and a "View requests" page reads `/api/requests`.

Validation:
- Start frontend. Login with Firebase in browser (or use anonymous), submit request, confirm server returns Firestore id, watch doc update to onchain status.
- On `/requests` page, list user's requests and show `txHash` link to BlockDAG explorer.

STOP — report.

STEP 6 — Sync service & reconciliation (Small → Medium)
- Create `server/services/blockchainSync.js` that:
- Subscribes to `RequestStored` events using existing provider and contract ABI.
- For each event, compute `requestHash` or read event args, find matching Firestore doc by `requestHash`, and if missing, create minimal doc with `status: 'onchain-received'`.
- Add periodic scan script to query past events (from block 0 or from last synced block) and reconcile.
- Run one-time sync `npm run sync:blockchain` to reconcile existing onchain events into Firestore.
Validation: run sync script and print summary (new docs created, updates applied).

STOP — report.

STEP 7 — Migration scripts & dual-write mode (Medium)
- Add `scripts/exportData.js` that exports in-memory server data into JSON (existing arrays).
- Add `scripts/importData.js` that can read the JSON and create Firestore docs (safe: mark imported docs with `migratedFrom: 'memory'`).
- Add toggle `DUAL_WRITE_MODE=true/false` in `.env`:
- If true, server writes to both memory (for old flow) and Firestore; useful for phased rollout.
Validation: run export -> import locally and show sample docs in Firestore.

STOP — report.

STEP 8 — Final checks, Firestore rules, and README updates (Small)
- Create `firestore.rules` file at repo root with the rules provided earlier plus the refined blocks for anonymous create of GBV reports but admin-only reads; include comments.
- Add `.env.example` and update README with step-by-step local dev instructions:
- How to add Firebase service account, environment variables.
- How to run server, start queue worker, run sync job.
- Run basic integration tests:
- `curl` register/login (if implemented)
- `curl POST /api/requests` (anonymous)
- `npm run sync:blockchain`
- Confirm Firestore documents and blockchain txs.

DELIVERABLES (what Cursor must output at end of run)
- A succinct list of files created/updated and diffs.
- Console outputs for each validation step (install, firebase init test, sample createRequest output, chain tx result, sync summary).
- Exact commands the dev must run locally to continue (copy-paste).
- A final status: Ready for frontend team to integrate against Firestore-backed API.

FAIL SAFE:
- If any step fails due to missing Firebase credentials, stop and print clear instructions for adding service account JSON and environment variables. Do NOT proceed with DB writes when credentials are missing.

END TASK.