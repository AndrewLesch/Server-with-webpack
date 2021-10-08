import 'bootstrap/dist/css/bootstrap.min.css';

import AlbumsApi from '../api/AlbumsAPI';


const NUMBER_OF_ALBUMS_ON_PAGE: number = 8;
let albums: DowlnoadAlbum[] = [];
let currentPage: number = 1;

const container: HTMLElement = document.getElementById('container');
const albumsRow: HTMLElement = document.getElementById('albums-row');
container.appendChild(albumsRow);

const leftButton: HTMLElement = document.getElementById('left-button');
const rightButton: HTMLElement = document.getElementById('right-button');

leftButton.addEventListener('click', handleLeftClick);
rightButton.addEventListener('click', handleRightClick);

AlbumsApi.getAlbums().then(resolve => {
    albums = resolve;
    renderAlbums();
});

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

function createAlbumsRow(item: DowlnoadAlbum) {
    const col: HTMLDivElement = document.createElement('div');
    const colCard: HTMLDivElement = document.createElement('div');
    const albumTitle: HTMLHeadingElement = document.createElement('h5');
    
    if (albumsRow.children.length >= 8) {
        console.log("aa");
        albumsRow.removeChild(albumsRow.firstElementChild)
    }

    colCard.classList.add('card', 'mt-3');
    albumTitle.classList.add('mx-auto');
    albumTitle.style.minHeight = '60px';

    albumsRow.appendChild(col);
    col.append(colCard);

    albumTitle.textContent = item.title;
    colCard.append(albumTitle);

    const link: HTMLAnchorElement = document.createElement('a');
    link.setAttribute('href', `../src/photos.html?albumId=${item.id}`);
    link.setAttribute('target', '_blank');

    let img: HTMLImageElement = new Image();
    img.src = '../assets/album_icon.jpg';
    img.width = 200;
    img.height = 200;

    link.append(img);
    link.classList.add('mx-auto');
    colCard.append(link);
}

