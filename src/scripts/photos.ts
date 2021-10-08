import PhotosApi from "../api/PhotosAPI";
import AlbumsApi from "../api/AlbumsAPI";

let queryString: string = window.location.search;
let albumId: number = parseInt(queryString.replace(/\D/g,''));
console.log(albumId);

let photos: DownloadPhoto[] = [];
let album: DowlnoadAlbum[];



PhotosApi.getPhotosByAlbumId(albumId).then(resolve => {
    photos = resolve;
    console.log(photos);
})

AlbumsApi.getAlbum(albumId).then(resolve => {
    album = resolve;
    console.log(album);
})

