// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Uptune {
  uint public audioCount = 0;
  string public name = "Uptune";
  mapping(uint => Audio) public audios;

  struct Audio {
    uint id;
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

    audios[audioCount] = Audio(audioCount, msg.sender, _audiogateway, _coverartgateway, _mainAuthor, _title, _tags, _genres, _authors);
    emit AudioUploaded(audioCount, msg.sender, _audiogateway, _coverartgateway, _mainAuthor, _title, _tags, _genres, _authors);
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
}