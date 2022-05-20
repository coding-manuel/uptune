// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Uptune {
  uint public audioCount = 0;
  mapping(uint => Audio) public audios;
  mapping(uint => Comment) public comments;
  mapping(address => Artist) public artists;
  mapping(string => uint) public uuidToId;

  struct Comment {
    uint id;
    string[] comment;
    uint[] amount;
    uint256[] timestamp;
  }

  struct Artist {
    address id;
    string[] songs;
    string artistID;
    string artist;
    string profilegateway;
  }

  struct Audio {
    uint id;
    string uuid;
    uint amount;
    uint256 timestamp;
    address wallet;
    string audiogateway;
    string coverartgateway;
    string title;
    string mainAuthor;
    string artistID;
    string[] tags;
    string[] genres;
    string authors;
  }

  event AudioUploaded(
    uint id,
    string uuid,
    string title,
    string mainAuthor,
    string artistID,
    string authors
  );

  function uploadAudio(string memory _uuid, string memory _audiogateway, string memory _coverartgateway, string memory _mainAuthor, string memory _artistID, string memory _title, string[] memory _tags, string[] memory _genres, string memory _authors) public {
    require(bytes(_audiogateway).length > 0);
    require(bytes(_coverartgateway).length > 0);
    require(bytes(_title).length > 0);
    require(msg.sender!=address(0));

    audioCount ++;

    audios[audioCount] = Audio(audioCount, _uuid, 0, block.timestamp , msg.sender, _audiogateway, _coverartgateway, _title, _mainAuthor, "", _tags, _genres, _authors);
    audios[audioCount].artistID = _artistID;

    uuidToId[_uuid] = audioCount;

    artists[msg.sender].songs.push(_uuid);

    emit AudioUploaded(audioCount, _uuid, _title, _mainAuthor, _artistID, _authors);

  }

  function getAllAudio() public view returns (Audio[] memory){
    Audio[] memory ret = new Audio[](audioCount);
    for (uint i = 0; i < audioCount; i++) {
      ret[i] =  audios[i+1];
    }
    return ret;
  }

  function getOneAudio(string memory _uuid) public view returns(Audio memory) {
    return audios[uuidToId[_uuid]];
  }

  function getMultipleAudio(string[] memory _songs) public view returns(Audio[] memory) {
    Audio[] memory songList = new Audio[](_songs.length);
    for(uint i = 0; i < _songs.length; i++){
      songList[i] = audios[uuidToId[_songs[i]]];
    }

    return songList;
  }

  function getAllComments(uint _id) public view returns(Comment memory) {
    return comments[_id];
  }

  function artistExists(address _add) public view returns(bool){
    return bytes(artists[_add].artistID).length != 0;
  }

  function getArtist(address _add) public view returns(Artist memory){
    return artists[_add];
  }

  function createArtist(string memory _artistID, string memory _artist, string memory _artistgateway) public {
    artists[msg.sender].id = msg.sender;
    artists[msg.sender].artistID = _artistID;
    artists[msg.sender].artist = _artist;
    artists[msg.sender].profilegateway = _artistgateway;
  }

  function sendTip(uint _id, uint _amount, string memory _message) public {
    audios[_id].amount += _amount;

    comments[_id].comment.push(_message);
    comments[_id].amount.push(_amount);
    comments[_id].timestamp.push(block.timestamp);

  }
}