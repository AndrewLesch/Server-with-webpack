import 'bootstrap/dist/css/bootstrap.min.css';

import AlbumsApi from '../api/AlbumsApi';
import albumImg from '../assets/album_icon.jpg';
import createPage from './pageDomUtils';

const NUMBER_OF_ALBUMS_ON_PAGE: number = 8;
let albums: Album[] = [];
let currentPage: number = 1;

AlbumsApi.getAlbums().then(response => {
    albums = response;
    renderAlbums();
});

createPage('album');

function handleLeftClick() {
    currentPage = currentPage - 1;
    renderAlbums();
}

function handleRightClick() {
    currentPage = currentPage + 1;
    renderAlbums();
 }

function renderAlbums() {
    let lowerBound: number = 8 * (currentPage - 1);
    let upperBound: number = 8 * currentPage;
    albums.slice(lowerBound, upperBound).forEach(item => createAlbumsRow(item));
    updateNavigation();
}

function updateNavigation() {
    const leftButton: HTMLElement= document.getElementById('left-button')
    const rightButton: HTMLElement = document.getElementById('right-button')

    leftButton.addEventListener('click', handleLeftClick);
    rightButton.addEventListener('click', handleRightClick);
    
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

function createAlbumsRow(album: Album) {
    const colCard: HTMLDivElement = document.createElement('div');
    const albumTitle: HTMLHeadingElement = document.createElement('h5');
    const albumsRow: HTMLElement = document.getElementById('album-row');

    if (albumsRow.children.length >= NUMBER_OF_ALBUMS_ON_PAGE) {
        albumsRow.removeChild(albumsRow.firstElementChild);
    }

    colCard.classList.add('card', 'mt-5');
    albumTitle.classList.add('mx-auto', 'text-center');
    albumTitle.style.minHeight = '80px';

    albumsRow.appendChild(colCard);
    albumTitle.textContent = album.title;

    const link: HTMLAnchorElement = document.createElement('a');
    link.setAttribute('href', `./photos.html?albumId=${album.id}`);
    link.setAttribute('target', '_blank');

    let img: HTMLImageElement = new Image();
    img.src = albumImg;
    img.width = 150;
    img.height = 150;

    link.append(img);
    link.classList.add('mx-auto');
    colCard.append(link);
    colCard.append(albumTitle);
}