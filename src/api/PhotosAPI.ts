import axios from "axios";

export default class PhotosApi {
    static baseUrl: string = "https://jsonplaceholder.typicode.com/albums";
    static getPhotosByAlbumId(albumId: number) {
            return axios.get<DownloadPhoto[]>(`${this.baseUrl}/${albumId}/photos`).then(response => response.data);
            
    }
}
