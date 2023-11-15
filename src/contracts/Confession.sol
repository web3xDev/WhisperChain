// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract CryptoConfessions {
    struct Confession {
        address payable author;
        string content;
        uint256 tipAmount;
    }

    mapping(uint256 => Confession) public confessions;
    uint256 public confessionCount;

    event ConfessionCreated(
        uint256 indexed id,
        address payable author,
        string content
    );

    event ConfessionTipped(
        uint256 indexed id,
        address payable author,
        uint256 tipAmount
    );

    function postConfession(string memory _content) public {
        confessionCount++;
        confessions[confessionCount] = Confession(payable(msg.sender), _content, 0);
        emit ConfessionCreated(confessionCount, payable(msg.sender), _content);
    }

    function tipConfession(uint256 _id) public payable {
        require(_id > 0 && _id <= confessionCount, "Invalid confession ID");
        Confession storage confession = confessions[_id];
        confession.author.transfer(msg.value);
        confession.tipAmount += msg.value;
        emit ConfessionTipped(_id, confession.author, confession.tipAmount);
    }

    function getConfession(uint256 _id) public view returns (Confession memory) {
        require(_id > 0 && _id <= confessionCount, "Invalid confession ID");
        return confessions[_id];
    }

    function getAllConfessions() public view returns (Confession[] memory) {
        Confession[] memory allConfessions = new Confession[](confessionCount);
        for (uint256 i = 0; i < confessionCount; i++) {
            allConfessions[i] = confessions[i + 1];
        }
        return allConfessions;
    }
}
