import axios from "axios";
import { baseUrl } from "./main_url";

export default class PhotosApi {
    static url: string = baseUrl;

    static getPhotosByAlbumId(id: number) {
            return axios.get<Photo[]>(`${this.url}/${id}/photos`).then(response => response.data);       
    }
}
