// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";

contract MyGovernor is
    Governor,
    GovernorVotes,
    GovernorCountingSimple
{
    enum VotingType {
        Standard,
        Quadratic
    }

    mapping(uint256 => VotingType) public proposalVotingType;

    constructor(IVotes _token)
        Governor("MyGovernor")
        GovernorVotes(_token)
    {}

    function votingDelay() public pure override returns (uint256) {
        return 1;
    }

    function votingPeriod() public pure override returns (uint256) {
        return 20;
    }

    function quorum(uint256) public pure override returns (uint256) {
        return 1;
    }

    function proposalThreshold() public pure override returns (uint256) {
        return 100e18;
    }

    // Create proposal with voting type
    function proposeWithType(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description,
        VotingType vType
    ) public returns (uint256) {
        uint256 id = propose(targets, values, calldatas, description);
        proposalVotingType[id] = vType;
        return id;
    }

    // Quadratic voting logic
    function _countVote(
        uint256 proposalId,
        address account,
        uint8 support,
        uint256 weight,
        bytes memory params
    )
        internal
        override(Governor, GovernorCountingSimple)
    {
        if (proposalVotingType[proposalId] == VotingType.Quadratic) {
            weight = sqrt(weight);
        }

        super._countVote(proposalId, account, support, weight, params);
    }

    // Square root function
    function sqrt(uint256 x) internal pure returns (uint256) {
        if (x == 0) return 0;
        uint256 z = (x + 1) / 2;
        uint256 y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
        return y;
    }
}
