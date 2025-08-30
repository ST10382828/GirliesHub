// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EmpowerHubRequests {
    struct Request {
        uint256 id;
        string requestHash;
        uint256 timestamp;
        string requestType; // "finance", "gbv", "sanitary"
        address requester;
    }

    Request[] public requests;
    mapping(address => uint256[]) public userRequests;
    
    event RequestStored(
        uint256 id, 
        string requestHash, 
        uint256 timestamp, 
        string requestType, 
        address requester
    );

    function storeRequest(
        string memory requestHash, 
        string memory requestType
    ) public {
        uint256 newId = requests.length;
        uint256 timestamp = block.timestamp;
        
        Request memory newRequest = Request({
            id: newId,
            requestHash: requestHash,
            timestamp: timestamp,
            requestType: requestType,
            requester: msg.sender
        });
        
        requests.push(newRequest);
        userRequests[msg.sender].push(newId);
        
        emit RequestStored(newId, requestHash, timestamp, requestType, msg.sender);
    }

    function getRequests() public view returns (Request[] memory) {
        return requests;
    }

    function getUserRequests(address user) public view returns (uint256[] memory) {
        return userRequests[user];
    }

    function getRequestById(uint256 id) public view returns (Request memory) {
        require(id < requests.length, "Request does not exist");
        return requests[id];
    }

    function getRequestCount() public view returns (uint256) {
        return requests.length;
    }
}
