const assert = require('assert');
const sinon = require('sinon');
const rewire = require('rewire');
const {mockResponse} = require('./utils');
const PlaylistService = rewire('../src/services/PlaylistService');

describe('PlaylistService', function() {
  describe('getPlaylist', function() {
    it('finds the playlist with the specified id', async function() {
      const playlist = {};
      const playlistFindOneFake = sinon.fake.returns(Promise.resolve(playlist))
      const revertRewire = PlaylistService.__set__({
        Playlist: {findOne: playlistFindOneFake},
      });
      const req = {params: {id: 1}};
      const res = mockResponse();

      await PlaylistService.getPlaylist(req, res);

      assert(res.status.calledWith(200))
      assert(res.json.calledWith(playlist))
      revertRewire();
    });

    it('returns status 404 if playlist is not found', async function() {
      const playlistFindOneFake = sinon.fake.returns(Promise.resolve(null))
      const revertRewire = PlaylistService.__set__({
        Playlist: {findOne: playlistFindOneFake},
      });
      const req = {params: {id: 1}};
      const res = mockResponse();

      await PlaylistService.getPlaylist(req, res);

      assert(res.status.calledWith(404))
      assert(res.json.called)
      revertRewire();
    });
  });
  describe('getPlaylists', function () {
    it('returns a filtered list of playlists', async function () {
      const playlist = {};
      let playlists = [playlist, playlist, playlist];
      const playlistFindAll = sinon.fake.returns(Promise.resolve(playlists))
      const revertRewire = PlaylistService.__set__({
        Playlist: {findAll: playlistFindAll},
      });
      const ownerId = 'some owner id';
      const req = {query: {owner: ownerId}};
      const res = mockResponse();

      await PlaylistService.getPlaylists(req, res);

      assert(res.status.calledWith(200))
      assert(res.json.calledWith(playlists))
      assert(playlistFindAll.calledWith(sinon.match({where: {owner: ownerId}})))
      revertRewire();
    })
  });
});
