import PhotosApi from "../api/PhotosApi";
import 'bootstrap/dist/css/bootstrap.min.css';

let photos: Photo[] = [];
let currentPage = 1;
const queryString = window.location.search;
const albumId = parseInt(queryString.replace(/\D/g,''));

const NUMBER_OF_PHOTOS_ON_PAGE = 8;

function updateNavigation () {
    const leftButton = document.getElementById('left-button-photos')
    const rightButton = document.getElementById('right-button-photos')

    leftButton.addEventListener('click', handleLeftClick);
    rightButton.addEventListener('click', handleRightClick);

    function handleLeftClick() {
        currentPage = currentPage - 1;
        renderPhoto();
    }

    function handleRightClick() {
        currentPage = currentPage + 1;
        renderPhoto();
    }
    
    if (currentPage === 1) {
        leftButton.setAttribute('disabled', 'disabled');
    } else {
        leftButton.removeAttribute('disabled');    
    }

    if (photos.length <= NUMBER_OF_PHOTOS_ON_PAGE * currentPage) {
        rightButton.setAttribute('disabled', 'disabled');
    } else {
        rightButton.removeAttribute('disabled');
    }
}

function getPhotosPage(photo: Photo) {
    return `
    <div>
    <div class="card mt-5">
    <h5 class="mx-auto" style="min-height: 80px">${photo.title}</h5>
    <div class="position-relative mx-auto" style="width: 150px; height:150px;">
    <a href="${photo.thumbnailUrl}" target="_blank" class="mx-auto">
    <img src="${photo.thumbnailUrl}" width="150" height="150">
    </a>
    <button class="btn btn-dark h-25 w-25 position-absolute top-0 end-0" type="button">x</button>
    </div>
    </div>
    </div>
    `
}

export function renderPhoto () {
    PhotosApi.getPhotosByAlbumId(albumId).then(resolve => {
        photos = resolve;
        let lowerBound: number = 8 * (currentPage - 1);
        let upperBound: number = 8 * currentPage;
        const root = document.getElementById('root');
        root.innerHTML = `<div class="btn-group" role="group" aria-label="Basic outlined example">
        <button class="btn btn-outline-primary" type="button" id="left-button-photos" disabled="disabled">Left</button>
        <button class="btn btn-outline-primary" type="button" id="right-button-photos">Right</button>
        </div>
        <div class="container-xxl pt-5">
        <div id="album-row" class="row row-cols-4">${[...photos].slice(lowerBound, upperBound).map(getPhotosPage).join('')}
        </div>
        </div>`
        updateNavigation();
    });
}
renderPhoto();
