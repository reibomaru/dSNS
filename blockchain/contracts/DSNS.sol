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

    function judgeHasLiked(address liker, uint256 messageId)
        internal
        view
        returns (bool, uint256)
    {
        uint256[] memory likedMessageIds = likedMessageIdsOf[liker];
        for (uint256 index = 0; index < likedMessageIds.length; index++) {
            if (likedMessageIds[index] == messageId) {
                return (true, index);
            }
        }
        return (false, 0);
    }

    function listMessages() public view returns (Message[] memory) {
        return messages;
    }

    function likeMessage(uint256 messageId) public returns (bool, uint256) {
        (bool hasLiked, uint256 index) = judgeHasLiked(msg.sender, messageId);
        if (hasLiked) {
            uint256[] storage likedMessageIds = likedMessageIdsOf[msg.sender];
            uint256 lastId = likedMessageIds[likedMessageIds.length - 1];
            likedMessageIds[index] = lastId;
            likedMessageIds.pop();
            Message storage likedMessage = messages[messageId];
            likedMessage.conutOfLikes -= 1;
        } else {
            likedMessageIdsOf[msg.sender].push(messageId);
            Message storage likedMessage = messages[messageId];
            likedMessage.conutOfLikes += 1;
        }
        return (hasLiked, index);
    }

    function likedMessageIdOf() public view returns (uint256[] memory) {
        return likedMessageIdsOf[msg.sender];
    }

    function createMessage(string memory content) public {
        Message memory message = Message(
            messageCount,
            content,
            block.timestamp,
            msg.sender,
            0
        );
        messages.push(message);
        messageCount++;
    }
}
