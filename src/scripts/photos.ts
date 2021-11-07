import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'

import PhotosApi from "../api/PhotosApi";
import createPage from './pageComponent';

let photos: Photo[] = [];
let currentPage = 1;

const queryString = window.location.search;
const albumId = parseInt(queryString.replace(/\D/g,''));
const NUMBER_OF_PHOTOS_ON_PAGE = 8;


createPage('Photo');

function handleLeftClick() {
    currentPage = currentPage - 1;
    renderPhoto();
}

function handleRightClick() {
    currentPage = currentPage + 1;
    renderPhoto();
}

function updateNavigation () {
    const leftButton = document.getElementById('left-button')
    const rightButton = document.getElementById('right-button')

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
PhotosApi.getPhotosByAlbumId(albumId).then(resolve => {
    photos = resolve;
    renderPhoto();
});

function renderPhoto() {
    let lowerBound = NUMBER_OF_PHOTOS_ON_PAGE * (currentPage - 1);
    let upperBound = NUMBER_OF_PHOTOS_ON_PAGE * currentPage;

    photos.slice(lowerBound, upperBound).forEach(item => createAndFillCard(item));
    updateNavigation();
}

function createAndFillCard(item) {
    const colCard: HTMLDivElement = document.createElement('div');
    const photoTitle: HTMLHeadingElement = document.createElement('h5');
    const photoRow: HTMLElement = document.getElementById('photo-row');
    const photoAndButtonContainer = document.createElement('div')
    photoAndButtonContainer.classList.add('position-relative', 'mx-auto');
    photoAndButtonContainer.style.width = '150px';
    photoAndButtonContainer.style.height = '150px';

    if (photoRow.children.length >= 8) {
        photoRow.removeChild(photoRow.firstElementChild)
    }

    colCard.classList.add('card', 'mt-5');
    colCard.setAttribute('id',`${item.id}`);
    photoTitle.classList.add('mx-auto');
    photoTitle.style.minHeight = '80px';

    photoRow.appendChild(colCard);
    photoTitle.textContent = item.title;
    colCard.append(photoTitle);
    colCard.append(photoAndButtonContainer);

    const link: HTMLAnchorElement = document.createElement('a');
    link.setAttribute('href', `${item.url}`);
    link.setAttribute('target', '_blank');

    let img: HTMLImageElement = new Image();
    img.src = item.url;
    img.width = 150;
    img.height = 150;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'x';
    deleteButton.classList.add('btn', 'btn-dark', 'h-25', 'w-25', 'position-absolute', 'top-0', 'end-0');
    deleteButton.setAttribute('id', 'delete-photo-button')
    deleteButton.onclick = deletePhoto(item);
    photoAndButtonContainer.append(link);
    link.append(img)
    photoAndButtonContainer.append(deleteButton);
}

function deletePhoto(item) {
    return () => {
        PhotosApi.deletePhotoById(item.id).then(
         function(){
             const deletePhoto = document.getElementById(item.id);
             const photoRow: HTMLElement = document.getElementById('photo-row');
             photoRow.removeChild(deletePhoto);
 
             const idDelete = photos.findIndex( albumItem  => albumItem.id === item.id);
             photos.splice(idDelete, 1);
             renderPhoto();

             const deleteButton = document.getElementById('delete-photo-button');
             const toastLiveExample = document.getElementById('liveToast');
             if (deleteButton) {
                    const toast = new bootstrap.Toast(toastLiveExample)
                    toast.show()
                }
            })
    }
}
