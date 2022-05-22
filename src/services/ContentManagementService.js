const Logger = require("./Logger");
const utils = require("../others/utils");
const {
    findSongs} = require("./SongService");

const {
    findAlbums} = require("./AlbumService");

const {
    findPlaylists} = require("./PlaylistService");

const getContent = async (req,
                          res) => {
   let songs;

   let albums;

   let playlists;

   let content = [];

   try {
        songs = ( await findSongs({}) ).map(song => {
            return {
                id: "song_" + song.id,
                name: song.title,
                genre: song.genre,
                type: "song",
                active: song.isBlocked
            } } );

        albums = ( await findAlbums({}) ).map(album => {
            return {
                id: "album_" + album.id,
                name: album.title,
                genre: album.genre,
                type: "album",
                active: album.isBlocked
            } } );

        playlists = ( await findPlaylists({}) ).map(playlist => {
            return {
                id: "playlist_" + playlist.id,
                name: playlist.title,
                genre: playlist.genre,
                type: "playlist",
                active: playlist.isBlocked
            } } );
    } catch(e) {
       Logger.request("Error al obtener contenido.");

       return utils.setErrorResponse(`Error al obtener contenido`,
                                     500,
                                     res);
   }

    content = content.concat(songs)
                     .concat(albums)
                     .concat(playlists);

    return utils.setBodyResponse(content,
                                 200,
                                 res);
}

module.exports = {
    getContent
};
