// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * EmpowerHubRequests
 * Minimal request registry used by GirliesHub.
 *
 * Contract addresses are network-specific. This contract is intended to be
 * deployed on BlockDAG Awakening testnet (chainId 1043).
 */
contract EmpowerHubRequests {
    struct Request {
        uint256 id;
        string requestHash;
        uint256 timestamp;
        string requestType; // "finance", "gbv", "sanitary"
        address requester;
    }

    Request[] private requests;
    mapping(address => uint256[]) private userRequests;

    event RequestStored(
        uint256 id,
        string requestHash,
        uint256 timestamp,
        string requestType,
        address requester
    );

    function storeRequest(string memory requestHash, string memory requestType) public {
        uint256 id = requests.length;
        uint256 ts = block.timestamp;

        requests.push(Request({
            id: id,
            requestHash: requestHash,
            timestamp: ts,
            requestType: requestType,
            requester: msg.sender
        }));

        userRequests[msg.sender].push(id);

        emit RequestStored(id, requestHash, ts, requestType, msg.sender);
    }

    function getRequests() public view returns (Request[] memory) {
        return requests;
    }

    function getRequestCount() public view returns (uint256) {
        return requests.length;
    }

    function getUserRequests(address user) public view returns (uint256[] memory) {
        return userRequests[user];
    }

    function getRequestById(uint256 id) public view returns (Request memory) {
        require(id < requests.length, "Request does not exist");
        return requests[id];
    }
}
