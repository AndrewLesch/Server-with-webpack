import axios from "axios";
import { baseUrl } from "./apiConstants";

export default class PhotosApi {
    static getPhotosByAlbumId(id: number) {
        return axios.get<Photo[]>(`${baseUrl}/${id}/photos`).then(response => response.data);       
    }

    static deletePhotoById(id: number) {
        return axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`);
    }
}
