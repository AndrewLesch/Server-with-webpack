import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'

import PhotosApi from '../api/PhotosApi';
import createPage from './pageDomUtils';

let photos: Photo[] = [];
let currentPage: number = 1;

const queryString: string = window.location.search;
const albumId: number = parseInt(queryString.replace(/\D/g,''));
const NUMBER_OF_PHOTOS_ON_PAGE: number = 8;

createPage('photo');

function handleLeftClick() {
    currentPage = currentPage - 1;
    renderPhotos();
}

function handleRightClick() {
    currentPage = currentPage + 1;
    renderPhotos();
}

function updateNavigation () {
    const leftButton: HTMLElement= document.getElementById('left-button')
    const rightButton: HTMLElement = document.getElementById('right-button')

    leftButton.addEventListener('click', handleLeftClick);
    rightButton.addEventListener('click', handleRightClick);
    
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

PhotosApi.getPhotosByAlbumId(albumId).then(response => {
    photos = response;
    renderPhotos();
});

function renderPhotos() {
    const photoRow: HTMLElement = document.getElementById('photo-row');
    while (photoRow.lastElementChild) {
        photoRow.removeChild(photoRow.lastElementChild);
      }

    let lowerBound: number = NUMBER_OF_PHOTOS_ON_PAGE * (currentPage - 1);
    let upperBound: number = NUMBER_OF_PHOTOS_ON_PAGE * currentPage
    photos.slice(lowerBound, upperBound).forEach(item => createAndFillCard(item));
    updateNavigation();
}

function createAndFillCard(photo: Photo) {
    const colCard: HTMLDivElement = document.createElement('div');
    const photoTitle: HTMLHeadingElement = document.createElement('h5');
    const photoRow: HTMLElement = document.getElementById('photo-row');
    const photoAndButtonContainer: HTMLDivElement= document.createElement('div')
    photoAndButtonContainer.classList.add('position-relative', 'mx-auto');
    photoAndButtonContainer.style.width = '150px';
    photoAndButtonContainer.style.height = '150px';

    colCard.classList.add('card', 'mt-5');
    colCard.setAttribute('id',`${photo.id}`);
    photoTitle.classList.add('mx-auto','text-center');
    photoTitle.style.minHeight = '80px';

    photoRow.appendChild(colCard);
    photoTitle.textContent = photo.title;
    colCard.append(photoAndButtonContainer);
    colCard.append(photoTitle);

    const link: HTMLAnchorElement = document.createElement('a');
    link.setAttribute('href', `${photo.thumbnailUrl}`);
    link.setAttribute('target', '_blank');

    let img: HTMLImageElement = new Image();
    img.src = photo.thumbnailUrl;
    img.width = 150;
    img.height = 150;

    const deleteButton: HTMLButtonElement = document.createElement('button');
    deleteButton.innerHTML = 'x';
    deleteButton.classList.add('btn', 'btn-dark', 'h-25', 'w-25', 'position-absolute', 'top-0', 'end-0');
    deleteButton.setAttribute('id', 'delete-photo-button')
    deleteButton.onclick = deletePhoto(photo.id);
    photoAndButtonContainer.append(link);
    link.append(img)
    photoAndButtonContainer.append(deleteButton);
}

function deletePhoto(itemId: number) {
    return () => {
        PhotosApi.deletePhotoById(itemId).then(
         function(){
             const deletePhoto: HTMLElement = document.getElementById(`${itemId}`);
             const photoRow: HTMLElement = document.getElementById('photo-row');
             photoRow.removeChild(deletePhoto);
 
             const idDelete: number = photos.findIndex(albumItem  => albumItem.id === itemId);
             photos.splice(idDelete, 1);
             renderPhotos();

             const toastLiveExample: HTMLElement = document.getElementById('liveToast');
             const toast: bootstrap.Toast = new bootstrap.Toast(toastLiveExample);
             toast.show();
            })
    }
}
