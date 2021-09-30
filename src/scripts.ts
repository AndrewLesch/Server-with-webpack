import 'bootstrap/dist/css/bootstrap.min.css';
import "./PhotosAPI.ts";
import PhotosApi from "./PhotosAPI";
import AlbumsApi from "./AlbumsAPI";
let almums;
let a= 1;
let photos: DownloadPhoto[] = [];
PhotosApi.getPhotosByAlbumId(a).then(function(resolve: DownloadPhoto[]){
    console.log("abd", resolve,photos);
    photos = resolve;
})

AlbumsApi.getAlbums().then(function(resolve: DownloadPhoto[]){
    console.log("abd", resolve,photos);
    almums= resolve;
    console.log(almums);
})


