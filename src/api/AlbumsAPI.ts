import axios from "axios";
import { baseUrl } from "./apiConstants";

export default class AlbumsApi {
    static getAlbums() {
        return axios.get<Album[]>(`${baseUrl}`).then(response => response.data);
    }

    static getAlbumById(id: number) {
        return axios.get<Album>(`${baseUrl}/${id}`).then(response => response.data);
    }
}