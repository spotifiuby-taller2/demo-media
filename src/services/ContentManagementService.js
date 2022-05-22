const Logger = require("./Logger");
const utils = require("../others/utils");
const {changePlayList} = require("./PlaylistService");
const {changeAlbumStatus} = require("./AlbumService");
const {changeSongStatus} = require("./SongService");
const {findSongs} = require("./SongService");
const {findAlbums} = require("./AlbumService");
const {findPlaylists} = require("./PlaylistService");

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
                blocked: song.isBlocked
            } } );

        albums = ( await findAlbums({}) ).map(album => {
            return {
                id: "album_" + album.id,
                name: album.title,
                genre: album.genre,
                type: "album",
                blocked: album.isBlocked
            } } );

        playlists = ( await findPlaylists({}) ).map(playlist => {
            return {
                id: "playlist_" + playlist.id,
                name: playlist.title,
                genre: playlist.genre,
                type: "playlist",
                blocked: playlist.isBlocked
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

const handleContentChange = async (req,
                                   res,
                                   condition) => {
    const type = req.body
                    .contentType;

    const contentId = req.body
                         .contentId;

    const disableFns = {
        "song": changeSongStatus,
        "album": changeAlbumStatus,
        "playlist": changePlayList
    };

    try {
        disableFns[type](contentId,
                        condition);
    } catch(e) {
        Logger.request("Error al deshabilitar contenido.");

        return utils.setErrorResponse(`Error al deshabilitar contenido`,
            500,
            res);
    }

    const response = {
        ok: "ok"
    };

    return utils.setBodyResponse(response,
                                200,
                                res);
}

const disableContent = async (req,
                              res) => {
    return handleContentChange(req,
                               res,
                               true);
}

const enableContent = async (req,
                             res) => {
    return handleContentChange(req,
                               res,
                               false);
}

module.exports = {
    getContent,
    disableContent,
    enableContent
};
