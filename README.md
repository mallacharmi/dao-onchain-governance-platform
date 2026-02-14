# DAO On-Chain Governance & Voting Platform

A **decentralized on-chain governance platform** built using Solidity, Hardhat, OpenZeppelin Governor framework, Next.js, and Docker.
This project demonstrates how **Decentralized Autonomous Organizations (DAOs)** manage proposals, voting, delegation, and governance transparently on blockchain.

---

## 🚀 Tech Stack

### Blockchain

- Solidity
- Hardhat
- OpenZeppelin Contracts
- ERC20Votes Governance Token
- Ethers.js

### Frontend

- Next.js
- Tailwind CSS
- WalletConnect / MetaMask Integration
- Recharts (optional analytics)

### DevOps

- Docker
- Docker Compose

---

## ⭐ Features

### Governance Token

- ERC-20 governance token with voting snapshots
- Delegation support (`delegate()` function)
- Voting power based on token holdings

### Governance System

- Proposal lifecycle management
- Minimum token threshold for proposals
- Quorum enforcement
- Proposal execution flow

### Voting Mechanisms

✔ Standard voting (1 Token = 1 Vote)
✔ Quadratic voting support
✔ Vote delegation support

### Frontend DApp

- Wallet connection (MetaMask)
- Proposal creation interface
- Vote casting interface
- Proposal status display
- Blockchain event updates

### Containerization

- Fully Dockerized setup
- Hardhat node + frontend orchestration
- Health checks included

---

## 📂 Project Structure

```
dao-governance/
│
├── contracts/          # Solidity smart contracts
├── scripts/            # Deployment scripts
├── test/               # Hardhat test cases
├── frontend/           # Next.js frontend app
│
├── docker-compose.yml
├── Dockerfile.frontend
├── Dockerfile.hardhat
├── hardhat.config.js
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```
npm install
```

---

### 2️⃣ Compile Smart Contracts

```
npx hardhat compile
```

---

### 3️⃣ Run Local Blockchain Node

```
npx hardhat node
```

---

### 4️⃣ Deploy Contracts

Open new terminal:

```
npx hardhat run scripts/deploy.js --network localhost
```

---

### 5️⃣ Start Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🐳 Docker Setup (Recommended)

Run everything with one command:

```
docker-compose up --build
```

Services:

- Hardhat Node → http://localhost:8545
- Frontend DApp → http://localhost:3000

---

## 🧪 Testing

Run smart contract tests:

```
npx hardhat test
```

---

## 🔐 Environment Variables

Create `.env` from `.env.example`:

Example:

```
PRIVATE_KEY=your_test_wallet_private_key
SEPOLIA_RPC_URL=your_rpc_url
ETHERSCAN_API_KEY=your_api_key
```

⚠️ Never commit `.env` file.

---

## 📊 Governance Workflow

1. Deploy governance token
2. Delegate voting power
3. Create proposal
4. Voting delay passes
5. Vote (Standard / Quadratic)
6. Proposal finalized
7. Execution phase

---

## 🎯 Learning Outcomes

- DAO governance architecture
- Smart contract security practices
- Blockchain voting mechanisms
- Full-stack Web3 development
- Dockerized blockchain apps

---

## 👩‍💻 Author

**Malla Charmi**
B.Tech Student | Blockchain & AI Enthusiast

---

## 📜 License

MIT License — Free to use for learning and development.

---

## ⭐ Future Improvements

- UI enhancements
- Proposal analytics dashboard
- Multi-chain support
- Advanced voting strategies
- Governance token staking

---

**Thank you for checking out this DAO Governance Platform 🚀**
