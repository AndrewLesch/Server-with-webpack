import axios from "axios";
import { baseUrl } from "./main_url";

export default class PhotosApi {
    static getPhotosByAlbumId(id: number) {
            return axios.get<Photo[]>(`${baseUrl}/${id}/photos`).then(response => response.data);       
    }
}
