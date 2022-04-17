const assert = require('assert');
const sinon = require('sinon');
const rewire = require('rewire');
const {mockResponse} = require('./utils');
const AlbumService = rewire('../src/services/AlbumService');

describe('AlbumService', function () {
  describe('getAlbum', function () {
    it('finds the album with the specified id', async function () {
      const album = {};
      const albumFindOneFake = sinon.fake.returns(Promise.resolve(album))
      const revertRewire = AlbumService.__set__({
        Album: {findOne: albumFindOneFake},
      });
      const req = {params: {id: 1}};
      const res = mockResponse();

      await AlbumService.getAlbum(req, res);

      assert(res.status.calledWith(200));
      assert(res.json.calledWith(album));
      revertRewire();
    });

    it('returns status 404 if album is not found', async function () {
      const albumFindOneFake = sinon.fake.returns(Promise.resolve(null))
      const revertRewire = AlbumService.__set__({
        Album: {findOne: albumFindOneFake},
      });
      const req = {params: {id: 1}};
      const res = mockResponse();

      await AlbumService.getAlbum(req, res);

      assert(res.status.calledWith(404));
      assert(res.json.called);
      revertRewire();
    });
  });
  describe('getAlbums', function () {
    it('returns a filtered list of albums', async function () {
      const album = {};
      const albums = [album, album, album];
      const albumFindAll = sinon.fake.returns(Promise.resolve(albums))
      const revertRewire = AlbumService.__set__({
        Album: {findAll: albumFindAll},
      });
      const genre = 'some genre';
      const req = {query: {genre: genre}};
      const res = mockResponse();

      await AlbumService.getAlbums(req, res);

      assert(res.status.calledWith(200));
      assert(res.json.calledWith(albums));
      assert(albumFindAll.calledWith(sinon.match({where: {genre: genre}})));
      revertRewire();
    })
  });
  describe('newAlbum', function () {
    it('creates a new album', async function () {
      const songIds = [1, 2, 3];
      const songs = [{}, {}, {}]
      const songFindAllFake = sinon.fake.returns(Promise.resolve(songs))
      const albumAddSongsFake = sinon.fake.returns(Promise.resolve());
      const album = {
        addSongs: albumAddSongsFake,
        title: 'some title',
        subscription: 'free',
        genre: 'rock',
        artist: 'artist',
      };
      album.get = () => album;
      const albumCreateFake = sinon.fake.returns(Promise.resolve(album));
      const revertRewire = AlbumService.__set__({
        Song: {findAll: songFindAllFake},
        Album: {create: albumCreateFake},
      });
      const req = {
        body: {
          title: 'some title',
          subscription: 'free',
          genre: 'rock',
          artist: 'artist',
          songs: songIds,
        }
      };
      const res = mockResponse();

      await AlbumService.newAlbum(req, res);

      assert(res.status.calledWith(200));
      assert(res.json.calledWith(sinon.match({
        title: 'some title',
        subscription: 'free',
        genre: 'rock',
        artist: 'artist',
        songs: songs,
      })));
      assert(songFindAllFake.calledWith(sinon.match({where: {id: songIds}})));
      assert(albumCreateFake.calledWith(sinon.match.has('title', 'some title')
        .and(sinon.match.has('subscription', 'free'))));
      assert(albumAddSongsFake.calledWith(songs));
      revertRewire();
    })
  })
});
