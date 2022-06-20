// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract DSNS {
    uint256 internal messageCount;

    struct Message {
        uint256 id;
        string content;
        uint256 createdAt;
        address owner;
        uint256 conutOfLikes;
    }

    Message[] internal messages;

    mapping(address => uint256[]) internal likedMessageIdsOf;

    constructor() {}

    function hasLiked(address liker, uint256 messageId)
        internal
        view
        returns (bool)
    {
        uint256[] memory likedMessageIds = likedMessageIdsOf[liker];
        for (uint256 index = 0; index < likedMessageIds.length; index++) {
            if (likedMessageIds[index] == messageId) {
                return true;
            }
        }
        return false;
    }

    function listMessages() public view returns (Message[] memory) {
        return messages;
    }

    function likeMessage(uint256 messageId) public {
        require(hasLiked(msg.sender, messageId));
        uint256[] storage likedMessageIdsOfSender = likedMessageIdsOf[
            msg.sender
        ];
        likedMessageIdsOfSender.push(messageId);
        Message storage likedMessage = messages[messageId];
        likedMessage.conutOfLikes++;
    }

    function createMessage(string memory content) public {
        messageCount++;
        Message memory message = Message(
            messageCount,
            content,
            block.timestamp,
            msg.sender,
            0
        );
        messages.push(message);
    }
}
