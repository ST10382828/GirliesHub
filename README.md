# EmpowerHub Hackathon Project

**EmpowerHub** - A comprehensive platform empowering South African women through integrated financial, safety, and hygiene support services with blockchain integration.

## 🚀 Project Overview

GirliesHub is a hackathon project that provides an integrated solution for women's empowerment, featuring:

- **Financial Empowerment**: Tailored investment advice and seminars
- **GBV Support**: Safe shelter locations and emergency resources
- **Sanitary Aid**: Free hygiene product donation bins
- **AI Assistant**: Intelligent support and guidance
- **Request System**: Easy submission and tracking of support requests

## 🏗️ Project Structure

```
GilriesHub/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── NavBar.js
│   │   │   ├── RequestFormModal.js
│   │   │   └── WalletConnectButton.js
│   │   ├── pages/          # Page components
│   │   │   ├── HomePage.js
│   │   │   ├── RequestsPage.js
│   │   │   ├── FinancePage.js
│   │   │   ├── GBVSupportPage.js
│   │   │   ├── SanitaryAidPage.js
│   │   │   ├── AIAssistantPage.js
│   │   │   └── AboutPage.js
│   │   ├── blockchain/     # Blockchain integration
│   │   │   └── contract.js
│   │   ├── App.js          # Main app component with routing
│   │   └── index.js        # React entry point
│   └── package.json        # Frontend dependencies
├── server/                 # Node.js backend API
│   ├── server.js          # Express server with API routes
│   ├── blockchain.js      # Blockchain integration stubs
│   ├── ai.js             # AI assistant integration stubs
│   └── package.json       # Backend dependencies
├── contracts/             # Solidity smart contracts
│   └── EmpowerHubRequests.sol
├── scripts/               # Contract deployment scripts
│   └── deploy.js
├── test/                  # Smart contract tests
│   └── EmpowerHubRequests.js
├── hardhat.config.js      # Hardhat configuration
└── package.json           # Root package.json for scripts
```

## 🛠️ Technology Stack

### Frontend
- **React** (v18) - UI framework
- **Material-UI (MUI)** v5 - Modern component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

### Blockchain Integration
- **Hardhat** - Development framework for Ethereum
- **Solidity** - Smart contract language
- **ethers.js** - Ethereum library
- **Web3Modal** - Wallet connection interface
- **BlockDAG** - Target blockchain network

### Firebase Integration
- **Firebase Auth** - User authentication and ID token verification
- **Firestore** - Persistent database with encryption
- **Blockchain Sync** - Automatic reconciliation with blockchain events
- **Queue Processing** - Background blockchain transaction processing
- **Migration Tools** - Data export/import capabilities
- **Dual-Write Mode** - Optional immediate blockchain writes

### Planned Integrations
- **AI API** - Intelligent assistant capabilities

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase project with Firestore database enabled

### Firebase Setup

1. **Create a Firebase project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Enable Firestore database in test mode

2. **Generate Service Account:**
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Save as `server/secrets/firebase-service-account.json`

3. **Configure Environment Variables:**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your Firebase project details
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_SERVICE_ACCOUNT_PATH=./server/secrets/firebase-service-account.json
   ENCRYPTION_KEY=your-64-hex-characters-32-bytes
   ```

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd GirliesHub
   ```

2. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

   This will install dependencies for the root, client, and server directories.

3. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This will start both the React frontend (port 3000) and Node.js backend (port 5001) concurrently.

### Additional Services

**Start Queue Worker (for blockchain processing):**
```bash
cd server && npm run queue:worker
```

**Run Blockchain Sync (one-time):**
```bash
cd server && npm run sync:blockchain
```

**Export/Import Data:**
```bash
# Export current data
npm run migrate:export

# Import data to Firestore
cd server && node ../scripts/importData.js ../scripts/exports/your-export-file.json
```

### Individual Commands

**Frontend only:**
```bash
npm run client
```

**Backend only:**
```bash
npm run server
```

**Install dependencies separately:**
```bash
# Root dependencies
npm install

# Frontend dependencies
cd client && npm install

# Backend dependencies
cd server && npm install
```

## 📱 Features & Pages

### 🏠 Home Page
- Hero section with mission statement
- Feature overview cards
- Call-to-action buttons
- Responsive design

### 📋 Requests Page
- Submit new support requests
- View request history
- Track request status
- Floating action button for quick access

### 💰 Finance Page
- Upcoming financial seminars
- Investment advice tips
- Success statistics
- Registration information

### 🛡️ GBV Support Page
- Safe shelter locations
- Emergency contact numbers
- 24/7 support hotlines
- Legal resource information

### 🧼 Sanitary Aid Page
- Donation bin locations
- Available product information
- Hygiene tips and education
- Stock status updates

### 🤖 AI Assistant Page
- Interactive chat interface
- Contextual responses
- Quick question buttons
- Support guidance

### ℹ️ About Page
- Platform mission and values
- Service descriptions
- Impact statistics
- Technology roadmap

## 🔧 API Endpoints

### Request Management
- `GET /api/requests` - Fetch all requests
- `POST /api/request` - Submit new request
- `GET /api/request/:id` - Get specific request

### AI Assistant
- `POST /api/ai/chat` - Chat with AI assistant

### Blockchain Integration
- `GET /api/blockchain/verify/:id` - Verify blockchain transaction

### Statistics
- `GET /api/stats` - Platform usage statistics
- `GET /api/health` - API health check

## 🎨 Design System

### Color Palette
- **Primary**: Pink (#E91E63)
- **Secondary**: White (#FFFFFF)
- **Background**: Light Grey (#F5F5F5)

### Typography
- **Font Family**: Roboto
- **Headings**: Bold weights
- **Body**: Regular weights

### Components
- **Rounded buttons** with hover effects
- **Elevated cards** with subtle shadows
- **Responsive navigation** (drawer on mobile)
- **Material Design** principles

## 🔮 Future Development

### Phase 1 (Current Demo)
- ✅ UI scaffold and navigation
- ✅ Mock data and API stubs
- ✅ Responsive design
- ✅ Request submission flow

### Phase 2 (Planned)
- 🔄 Database integration
- 🔄 Real AI API integration
- 🔄 User authentication
- 🔄 Advanced search and filtering

### Phase 3 (Advanced)
- 🔄 BlockDAG blockchain integration
- 🔄 MetaMask wallet connection
- 🔄 Smart contract deployment
- 🔄 Decentralized data storage

## 🚀 Deployment
- **Frontend** → Vercel/Netlify/IPFS
- **Smart Contracts** → BlockDAG EVM chain

### Phase 4 (Scale)
- 🔄 Mobile app development
- 🔄 Advanced analytics
- 🔄 Multi-language support
- 🔄 Third-party integrations

## 🤝 Development Workflow

### Teammate Workflow
- **UI teammates**: Only work in `/client/src/components` for your feature.
- Use `blockchain/contract.js` functions (mocked now).
- Do not edit blockchain code. Lead dev will replace stubs later.

### Blockchain Developer Workflow
- Implement contracts in `/contracts`
- Run tests in `/test`
- Use `/scripts/deploy.js` with Hardhat

### For Team Members

1. **Frontend Developers**: Work in `/client/src/pages` and `/client/src/components`
2. **Backend Developers**: Implement real logic in `/server/` stub functions
3. **Blockchain Developers**: Replace stub functions in `/server/blockchain.js`
4. **AI Developers**: Implement real AI logic in `/server/ai.js`

### Current Stub Functions

**Blockchain (`/server/blockchain.js`):**
- `storeHashOnBlockchain()` - Currently returns mock transaction
- `getTransactionProof()` - Currently returns mock proof

**AI (`/server/ai.js`):**
- `chatWithAI()` - Currently returns contextual mock responses
- `analyzeSentiment()` - Currently returns mock sentiment analysis

## 🧪 Testing

The current implementation includes:
- Mock data for all pages
- Functional API endpoints with stub responses
- Complete UI navigation flow
- Responsive design testing

## 📄 License

This project is developed for hackathon purposes. See license terms for detailed usage rights.

## 🙋‍♀️ Support

For questions or support during development:
- Check the console logs for detailed API interaction information
- Review the component structure in `/client/src/`
- Examine API endpoints in `/server/server.js`
- Test with the provided mock data

---

**Built with ❤️ for women's empowerment in South Africa**
