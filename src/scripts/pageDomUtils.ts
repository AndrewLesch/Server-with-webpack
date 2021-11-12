export default function createPage(pageName: string) {
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

    const pageRow: HTMLElement = document.createElement('div');
    pageRow.setAttribute('id', `${pageName}-row`);
    pageRow.classList.add('row', 'row-cols-4');
    container.appendChild(pageRow);
    
    root.appendChild(btnContainer);
    root.appendChild(container);
    btnContainer.append(leftButton,rightButton);
}