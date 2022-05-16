// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Uptune {
  uint public audioCount = 0;
  mapping(uint => Audio) public audios;
  mapping(uint => Comment) public comments;

  struct Comment {
    uint id;
    string[] comment;
    uint[] amount;
    uint256[] timestamp;
  }

  struct Audio {
    uint id;
    uint amount;
    uint256 timestamp;
    address wallet;
    string audiogateway;
    string coverartgateway;
    string title;
    string mainAuthor;
    string[] tags;
    string[] genres;
    string authors;
  }

  event AudioUploaded(
    uint id,
    uint amount,
    uint256 timestamp,
    address wallet,
    string audiogateway,
    string coverartgateway,
    string title,
    string mainAuthor,
    string[] tags,
    string[] genres,
    string authors
  );

  function uploadAudio(string memory _audiogateway, string memory _coverartgateway, string memory _mainAuthor, string memory _title, string[] memory _tags, string[] memory _genres, string memory _authors) public {
    require(bytes(_audiogateway).length > 0);
    require(bytes(_coverartgateway).length > 0);
    require(bytes(_title).length > 0);
    require(msg.sender!=address(0));

    audioCount ++;

    audios[audioCount] = Audio(audioCount, 0, block.timestamp , msg.sender, _audiogateway, _coverartgateway, _title, _mainAuthor, _tags, _genres, _authors);
    emit AudioUploaded(audioCount, 0, block.timestamp, msg.sender, _audiogateway, _coverartgateway, _title, _mainAuthor, _tags, _genres, _authors);
  }

  function getAllAudio() public view returns (Audio[] memory){
    Audio[] memory ret = new Audio[](audioCount);
    for (uint i = 0; i < audioCount; i++) {
      ret[i] =  audios[i+1];
    }
    return ret;
  }

  function getOneAudio(uint _audioCount) public view returns(Audio memory) {
    return audios[_audioCount];
  }

  function getAllComments(uint _id) public view returns(Comment memory) {
    return comments[_id];
  }

  function sendTip(uint _id, uint _amount, string memory _message) public{
    audios[_id].amount += _amount;

    comments[_id].comment.push(_message);
    comments[_id].amount.push(_amount);
    comments[_id].timestamp.push(block.timestamp);

  }
}