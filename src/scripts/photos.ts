import PhotosApi from "../api/PhotosApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast } from 'bootstrap';

let photos: Photo[] = [];
let currentPage = 1;

const queryString = window.location.search;
const albumId = parseInt(queryString.replace(/\D/g,''));
const NUMBER_OF_PHOTOS_ON_PAGE = 8;

const root: HTMLElement = document.getElementById('root');
const btnContainer: HTMLElement = document.createElement('div');
btnContainer.classList.add('btn-group');
btnContainer.setAttribute('role', 'group');
btnContainer.setAttribute('aria-label', 'Basic outlined example');

const leftButton: HTMLElement = document.createElement('button');
leftButton.classList.add('btn', 'btn-outline-primary');
leftButton.setAttribute('type', 'button');
leftButton.setAttribute('id', 'left-button-photos');
leftButton.innerText = 'Left';

const rightButton: HTMLElement = document.createElement('button');
rightButton.classList.add('btn', 'btn-outline-primary');
rightButton.setAttribute('type', 'button');
rightButton.setAttribute('id', 'right-button-photos');
rightButton.innerText = 'Right';


const container: HTMLElement = document.createElement('div');
container.classList.add('container-xxl', 'pt-5');

const albumsRow: HTMLElement = document.createElement('div');
albumsRow.setAttribute('id', 'album-row')
albumsRow.classList.add('row', 'row-cols-4');
container.appendChild(albumsRow);

root.appendChild(btnContainer);
root.appendChild(container);
btnContainer.append(leftButton,rightButton);


function handleLeftClick() {
    currentPage = currentPage - 1;
    renderPhoto();
}

function handleRightClick() {
    currentPage = currentPage + 1;
    renderPhoto();
}

function updateNavigation () {
    const leftButton = document.getElementById('left-button-photos')
    const rightButton = document.getElementById('right-button-photos')

    leftButton.addEventListener('click', handleLeftClick);
    rightButton.addEventListener('click', handleRightClick);
    console.log(photos);
    
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
    console.log(photos);
    renderPhoto();
});

function renderPhoto() {
    let lowerBound = NUMBER_OF_PHOTOS_ON_PAGE * (currentPage - 1);
    let upperBound = NUMBER_OF_PHOTOS_ON_PAGE * currentPage;

    photos.slice(lowerBound, upperBound).forEach(item => createAndFillCard(item));
    updateNavigation();
}

function createAndFillCard(item) {
    const col: HTMLDivElement = document.createElement('div');
    const colCard: HTMLDivElement = document.createElement('div');
    const albumTitle: HTMLHeadingElement = document.createElement('h5');
    const albumsRow: HTMLElement = document.getElementById('album-row');
    const photoAndButtonContainer = document.createElement('div')
    photoAndButtonContainer.classList.add('position-relative', 'mx-auto');
    photoAndButtonContainer.style.width = '150px';
    photoAndButtonContainer.style.height = '150px';

    if (albumsRow.children.length >= 8) {
        albumsRow.removeChild(albumsRow.firstElementChild)
    }

    colCard.classList.add('card', 'mt-5');
    colCard.setAttribute('id',`${item.id}`);
    albumTitle.classList.add('mx-auto');
    albumTitle.style.minHeight = '80px';
    

    albumsRow.appendChild(col);
    col.append(colCard);

    albumTitle.textContent = item.title;
    colCard.append(albumTitle);
    colCard.append(photoAndButtonContainer);

    const link: HTMLAnchorElement = document.createElement('a');
    link.setAttribute('target', '_blank');

    let img: HTMLImageElement = new Image();
    img.src = item.url;
    img.width = 150;
    img.height = 150;

    link.append(img);
    link.classList.add('mx-auto');
    colCard.append(link);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'x';
    deleteButton.classList.add('btn', 'btn-dark', 'h-25', 'w-25', 'position-absolute', 'top-0', 'end-0');
    photoAndButtonContainer.append(img);
    photoAndButtonContainer.append(deleteButton);

    deleteButton.onclick = deletePhoto(item);
}

function deletePhoto(item) {
    return () => {
        PhotosApi.deletePhotoById(item.id).then(
         function(){
             const deletePhoto = document.getElementById(item.id);
             const albumsRow: HTMLElement = document.getElementById('album-row')
             
             albumsRow.removeChild(deletePhoto);
 
             const idDelete = photos.findIndex( albumItem  => albumItem.id === item.id);
             photos.splice(idDelete, 1);
 
             renderPhoto();
         }
     )
    }
 }