// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Uptune {
  uint public audioCount = 0;
  string public name = "Uptune";
  mapping(uint => Audio) public audios;

  struct Audio {
    uint id;
    string audiohash;
    string coverarthash;
    string title;
    string mainAuthor;
    string[] tags;
    string[] genres;
    string authors;
  }

  event AudioUploaded(
    uint id,
    string audiohash,
    string coverarthash,
    string title,
    string mainAuthor,
    string[] tags,
    string[] genres,
    string authors
  );

  function uploadAudio(string memory _audiohash, string memory _coverarthash, string memory _mainAuthor, string memory _title, string[] memory _tags, string[] memory _genres, string memory _authors) public {
    require(bytes(_audiohash).length > 0);
    require(bytes(_coverarthash).length > 0);
    require(bytes(_title).length > 0);
    require(msg.sender!=address(0));

    audioCount ++;

    audios[audioCount] = Audio(audioCount, _audiohash, _coverarthash, _mainAuthor, _title, _tags, _genres, _authors);
    emit AudioUploaded(audioCount, _audiohash, _coverarthash, _mainAuthor, _title, _tags, _genres, _authors);
  }
}