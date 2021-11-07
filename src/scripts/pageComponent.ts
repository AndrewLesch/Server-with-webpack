export default function createPage(currentPage) {
    const root: HTMLElement = document.getElementById('root');
    const btnContainer: HTMLElement = document.createElement('div');
    btnContainer.classList.add('btn-group');
    btnContainer.setAttribute('role', 'group');

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

    const container: HTMLElement = document.createElement('div');
    container.classList.add('container-xxl', 'pt-5');

    if (currentPage === 'Photo') {
        const photosRow: HTMLElement = document.createElement('div');
        photosRow.setAttribute('id', 'photo-row')
        photosRow.classList.add('row', 'row-cols-4');
        container.appendChild(photosRow);
    } else {
        const albumRow: HTMLElement = document.createElement('div');
        albumRow.setAttribute('id', 'album-row')
        albumRow.classList.add('row', 'row-cols-4');
        container.appendChild(albumRow);

    }
    
    root.appendChild(btnContainer);
    root.appendChild(container);
    btnContainer.append(leftButton,rightButton);
}