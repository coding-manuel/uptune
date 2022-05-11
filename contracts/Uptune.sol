// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Uptune {
  uint public audioCount = 0;
  string public name = "Uptune";
  mapping(uint => Audio) public audios;

  struct Audio {
    uint id;
    string audiohash;
    string coverart;
    string title;
    string[] tags;
    address[] authors;
  }

  event AudioUploaded(
    uint id,
    string audiohash,
    string coverart,
    string title,
    string[] tags,
    address[] authors
  );

  function uploadAudio(string memory _audiohash, string memory _coverart, string memory _title, string[] memory _tags, address[] memory _authors) public {
    require(bytes(_audiohash).length > 0);
    require(bytes(_coverart).length > 0);
    require(bytes(_title).length > 0);
    require(msg.sender!=address(0));

    audioCount ++;

    audios[audioCount] = Audio(audioCount, _audiohash, _coverart, _title, _tags, _authors);
    emit AudioUploaded(audioCount, _audiohash, _coverart, _title, _tags, _authors);
  }
}