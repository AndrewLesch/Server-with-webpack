import 'bootstrap/dist/css/bootstrap.min.css';
import { debugPort } from 'process';
import AlbumsApi from '../api/AlbumsAPI';
const NUMBER_OF_ALBUMS_ON_PAGE: number = 8;
let albums : DowlnoadAlbums[] = [];
let currentPage: number = 1;

const container = document.getElementById('container');
const albumsRow = document.getElementById('albums-row');
container.appendChild(albumsRow)
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');


leftButton.addEventListener('click', handleLeftClick);
rightButton.addEventListener('click', handleRightClick);

AlbumsApi.getAlbums().then(resolve => {
    albums = resolve;
    console.log(albums);
    renderAlbums();
});

function handleLeftClick() {
    currentPage = currentPage - 1;
    console.log(currentPage);
    renderAlbums();
}

function handleRightClick() {
    currentPage = currentPage + 1;
    renderAlbums();
 }

function renderAlbums() {
    let lowerBound: number = 8 * (currentPage - 1);
    let upperBound: number = 8 * currentPage;
    console.log(currentPage);
    albums.slice(lowerBound, upperBound).forEach(item => createAlbumsRow(item));
    updateNavigation();
}

function updateNavigation() {
    if (currentPage === 1) {
        leftButton.setAttribute('disabled', 'disabled');
    } else {
        leftButton.removeAttribute('disabled');    
    }

    if (albums.length <= NUMBER_OF_ALBUMS_ON_PAGE * currentPage) {
        rightButton.setAttribute('disabled', 'disabled');
    } else {
        rightButton.removeAttribute('disabled');
    }
}

function createAlbumsRow(item) {
    const col = document.createElement('div');
    const colCard = document.createElement('div');
    const albumTitle = document.createElement('h5');
    
    console.log(albumsRow.children.length);
    if (albumsRow.children.length >= 8) {
        console.log("aa");
        albumsRow.removeChild(albumsRow.firstElementChild)
    }

    albumsRow.appendChild(col);
    colCard.classList.add('card', 'mx-auto')
    col.append(colCard);

    albumTitle.textContent = item.title;
    colCard.append(albumTitle);

    const link = document.createElement('a');
    link.setAttribute('href', `./photos.html?albumId=${item.id}`);
    link.setAttribute('target', '_blank');

    let img = new Image();
    img.src = '../assets/album_icon.jpeg';
    img.width = 200;
    img.height = 200;

    link.append(img);
    colCard.append(link);
}

