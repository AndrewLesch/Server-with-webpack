import PhotosApi from "../api/PhotosApi";

let photos: Photo[] = [];
let queryString = '';
let albumId;
const NUMBER_OF_ALBUMS_ON_PAGE = 8;

let currentPage = 1;



function getString() {
    queryString = window.location.search;
    albumId = parseInt(queryString.replace(/\D/g,''));
}
function getPhotosPage(photo: Photo) {
    return `
    <div>
    <div class="card mt-5">
    <h5 class="mx-auto" style="min-height: 80px;">${photo.title}</h5>
    <a href="${photo.thumbnailUrl}" target="_blank" class="mx-auto">
    <img src="${photo.thumbnailUrl}" width="200" height="200"></a>
    </div>
    </div>`
}
// обернуть фотки в контейнер как и альбомы и придумать как сделать по 8 на странице
export function renderPhoto () {
    getString()
    PhotosApi.getPhotosByAlbumId(albumId).then(resolve => {
        photos = resolve;
        console.log(photos);
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

    if (photos.length <= NUMBER_OF_ALBUMS_ON_PAGE * currentPage) {
        rightButton.setAttribute('disabled', 'disabled');
    } else {
        rightButton.removeAttribute('disabled');
    }
    }

    
    
    );
}