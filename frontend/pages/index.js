import { useState } from "react";
import { ethers } from "ethers";

const GOVERNOR_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

const GOVERNOR_ABI = [
  "function propose(address[] targets,uint256[] values,bytes[] calldatas,string description) returns (uint256)",
  "function state(uint256 proposalId) view returns (uint8)",
  "function castVote(uint256 proposalId,uint8 support)",
  "event ProposalCreated(uint256 proposalId,address proposer,address[] targets,uint256[] values,string[] signatures,bytes[] calldatas,uint256 startBlock,uint256 endBlock,string description)"
];

export default function Home() {
  const [account, setAccount] = useState(null);
  const [governor, setGovernor] = useState(null);
  const [proposalId, setProposalId] = useState(null);
  const [proposalState, setProposalState] = useState("");

  // CONNECT WALLET
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    setAccount(await signer.getAddress());
    setGovernor(new ethers.Contract(GOVERNOR_ADDRESS, GOVERNOR_ABI, signer));
  };

  // CREATE PROPOSAL
  const createProposal = async () => {
    if (!governor) return alert("Connect wallet first");

    try {
      const description = `Frontend Proposal ${Date.now()}`;

      const tx = await governor.propose(
        ["0x0000000000000000000000000000000000000000"],
        [0],
        ["0x"],
        description
      );

      const receipt = await tx.wait();

      const event = receipt.logs.find(
        (log) => log.fragment?.name === "ProposalCreated"
      );

      if (event) {
        const id = event.args.proposalId.toString();
        setProposalId(id);
        alert("Proposal created!");
      }

    } catch (err) {
      console.error(err);
      alert("Proposal creation failed");
    }
  };

  // CHECK STATUS
  const checkState = async () => {
    if (!proposalId) return;

    const state = await governor.state(proposalId);

    const states = [
      "Pending",
      "Active",
      "Canceled",
      "Defeated",
      "Succeeded",
      "Queued",
      "Expired",
      "Executed",
    ];

    setProposalState(states[Number(state)]);
  };

  // VOTE
  const vote = async (type) => {
    if (!proposalId) return alert("Create proposal first");

    if (proposalState === "Pending") {
      alert("Voting not started yet. Wait few blocks.");
      return;
    }

    try {
      const tx = await governor.castVote(proposalId, type);
      await tx.wait();
      alert("Vote submitted!");
    } catch (err) {
      console.error(err);
      alert("Voting failed. Did you delegate tokens?");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>DAO Governance Dashboard</h1>

      {/* CONNECT WALLET */}
      <button
        data-testid="connect-wallet-button"
        onClick={connectWallet}
      >
        {account ? "Wallet Connected" : "Connect Wallet"}
      </button>

      {account && (
        <p data-testid="user-address">Address: {account}</p>
      )}

      <hr />

      {/* CREATE PROPOSAL */}
      <button onClick={createProposal}>Create Proposal</button>

      {proposalId && (
        <div data-testid="proposal-list-item">
          <p><b>Proposal ID:</b> {proposalId}</p>
          <p><b>Status:</b> {proposalState || "Click Check Status"}</p>

          <button
            data-testid="vote-for-button"
            onClick={() => vote(1)}
          >
            Vote For
          </button>

          <button
            data-testid="vote-against-button"
            onClick={() => vote(0)}
          >
            Vote Against
          </button>

          <button
            data-testid="vote-abstain-button"
            onClick={() => vote(2)}
          >
            Abstain
          </button>

          <br /><br />
          <button onClick={checkState}>
            Check Status
          </button>
        </div>
      )}
    </div>
  );
}
