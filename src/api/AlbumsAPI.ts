import axios from "axios";

export default class AlbumsApi {
    static baseUrl: string = "https://jsonplaceholder.typicode.com/albums";
    static getAlbums() {
            return axios.get<DowlnoadAlbums[]>(`${this.baseUrl}`).then(response => response.data);
            
    }
}
