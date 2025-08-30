// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EmpowerHubRequests {
    struct Request {
        uint256 id;
        string description;
    }

    Request[] public requests;
    event RequestStored(uint256 id, string description);

    function storeRequest(string memory description) public {
        uint256 newId = requests.length;
        requests.push(Request(newId, description));
        emit RequestStored(newId, description);
    }

    function getRequests() public view returns (Request[] memory) {
        return requests;
    }
}
