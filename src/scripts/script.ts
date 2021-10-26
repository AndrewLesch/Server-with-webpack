import 'bootstrap/dist/css/bootstrap.min.css';
import { brotliDecompressSync } from 'zlib';

import AlbumsApi from '../api/AlbumsApi';
import { renderPhoto } from './photos';

const NUMBER_OF_ALBUMS_ON_PAGE: number = 8;
let albums: Album[] = [];
let currentPage: number = 1;
let albumStageUrl = `http://127.0.0.1:5500/dist/index.html`;


function createAlbumPage() {
    const root: HTMLElement = document.getElementById('root');
    const btnContainer: HTMLElement = document.createElement('div');
    btnContainer.classList.add('btn-group');
    btnContainer.setAttribute('role', 'group');
    btnContainer.setAttribute('aria-label', 'Basic outlined example');

    const leftButton: HTMLElement = document.createElement('button');
    leftButton.classList.add('btn', 'btn-outline-primary');
    leftButton.setAttribute('type', 'button');
    leftButton.setAttribute('id', 'left-button');
    leftButton.innerText = 'Left';

    const rightButton: HTMLElement = document.createElement('button');
    rightButton.classList.add('btn', 'btn-outline-primary');
    rightButton.setAttribute('type', 'button');
    rightButton.setAttribute('id', 'right-button');
    rightButton.innerText = 'Right';

    leftButton.addEventListener('click', handleLeftClick);
    rightButton.addEventListener('click', handleRightClick);

    const container: HTMLElement = document.createElement('div');
    container.classList.add('container-xxl', 'pt-5');

    const albumsRow: HTMLElement = document.createElement('div');
    albumsRow.setAttribute('id', 'album-row')
    albumsRow.classList.add('row', 'row-cols-4');
    container.appendChild(albumsRow);

    root.appendChild(btnContainer);
    root.appendChild(container);
    btnContainer.append(leftButton,rightButton);
}
createAlbumPage();
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
    const leftButton: HTMLElement = document.getElementById('left-button');
    const rightButton: HTMLElement = document.getElementById('right-button');
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

function createAlbumsRow(item: Album) {
    const col: HTMLDivElement = document.createElement('div');
    const colCard: HTMLDivElement = document.createElement('div');
    const albumTitle: HTMLHeadingElement = document.createElement('h5');
    const albumsRow: HTMLElement = document.getElementById('album-row');

    if (albumsRow.children.length >= 8) {
        albumsRow.removeChild(albumsRow.firstElementChild)
    }

    colCard.classList.add('card', 'mt-5');
    albumTitle.classList.add('mx-auto');
    albumTitle.style.minHeight = '80px';

    albumsRow.appendChild(col);
    col.append(colCard);

    albumTitle.textContent = item.title;
    colCard.append(albumTitle);

    const link: HTMLAnchorElement = document.createElement('a');

    link.onclick = function () {
        let state = `../src/photos.html?albumId=${item.id}`;
        let title = 'photos';
        let url = `../src/photos.html?albumId=${item.id}`;
        window.history.pushState(state,title,url);
        renderPhoto();
    }

    let img: HTMLImageElement = new Image();
    img.src = '../assets/album_icon.jpg';
    img.width = 200;
    img.height = 200;

    link.append(img);
    link.classList.add('mx-auto');
    colCard.append(link);
}

window.onpopstate = function () {
    if (document.URL === albumStageUrl) {
        const root: HTMLElement = document.getElementById('root');
        root.innerHTML = '';
        createAlbumPage();
        AlbumsApi.getAlbums().then(resolve => {
            albums = resolve;
            renderAlbums();
        });
    }
    else {
        renderPhoto();
    }
}