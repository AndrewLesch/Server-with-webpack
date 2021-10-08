import axios from "axios";

export default class AlbumsApi {
    static baseUrl: string = "https://jsonplaceholder.typicode.com/albums";

    static getAlbums() {
        return axios.get<DowlnoadAlbum[]>(`${this.baseUrl}`).then(response => response.data);
            
    }

    static getAlbum(albumId: number) {
        return axios.get<DowlnoadAlbum[]>(`${this.baseUrl}/${albumId}`).then(response => response.data);
    }
}