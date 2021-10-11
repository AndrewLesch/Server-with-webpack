import axios from "axios";
import { baseUrl } from "./main_url";

export default class AlbumsApi {
    static url: string = baseUrl;

    static getAlbums() {
        return axios.get<Album[]>(`${this.url}`).then(response => response.data);
    }

    static getAlbumById(id: number) {
        return axios.get<Album>(`${this.url}/${id}`).then(response => response.data);
    }
}