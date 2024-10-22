const carrot = document.querySelector('.carrot');
const vegan = document.querySelector('.vegan');
const button = document.querySelector('.jump-btn button');
const gameOverContainer = document.querySelector('#gameover');

const treeContainer01 = document.querySelector('.tree-container01');
const treeContainer02 = document.querySelector('.tree-container02');
const cloudContainer = document.querySelector('.cloud-container');

let loop;

const jump = () => {
    if (button.textContent.includes('Jump!')) {
        carrot.classList.add('jump');
        carrot.src = 'assets/Character-Karotte-jump.gif';
        carrot.style.right = 'calc(75vw - 10px)';

        setTimeout(() => {
            carrot.classList.remove('jump');
            carrot.src = 'assets/Character-Karotte-run.gif';
            carrot.style.right = '75vw';
        }, 1200);
    }
};

const startLoop = () => {
    loop = setInterval(() => {
        const veganPositionLeft = vegan.offsetLeft;
        const carrotPosition = +window.getComputedStyle(carrot).bottom.replace('px', '');
        const calculatedLimit = (window.innerHeight * 0.22) + 200;

        if (veganPositionLeft <= window.innerWidth * 0.20 && veganPositionLeft > -10 && carrotPosition < calculatedLimit) {
            vegan.style.animation = 'none';
            vegan.style.left = `${veganPositionLeft}px`;

            carrot.classList.remove('jump');
            carrot.style.bottom = `${carrotPosition}px`;

            button.innerHTML = 'Restart';
            button.style.backgroundColor = 'red';
            button.style.color = 'white';

            gameOverContainer.classList.remove('hidden');

            treeContainer01.style.animationPlayState = 'paused';
            treeContainer02.style.animationPlayState = 'paused';
            cloudContainer.style.animationPlayState = 'paused';

            clearInterval(loop);
            button.removeEventListener('click', jump);
            button.addEventListener('click', restart);
        }
    }, 10);
};

const restart = () => {
    vegan.style.animation = 'vegan-run 2.5s infinite linear';
    vegan.style.left = '';

    treeContainer01.style.animationPlayState = 'running';
    treeContainer02.style.animationPlayState = 'running';
    cloudContainer.style.animationPlayState = 'running';

    gameOverContainer.classList.add('hidden');

    if (window.matchMedia("(orientation: portrait)").matches) {
        carrot.style.bottom = '30vh';
    } else {
        carrot.style.bottom = '22vh';
    }

    button.innerHTML = 'Jump!';
    button.style.backgroundColor = '#1d9714';
    button.style.color = '#87ceeb';
    button.removeEventListener('click', restart);
    button.addEventListener('click', jump);
    
    startLoop();
};

document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && button.textContent.includes('Jump!')) {
        jump();
    }
});

if (button.textContent.includes('Jump!')) {
    button.addEventListener('click', jump);
}

startLoop();
