const carrot = document.querySelector('.carrot');
const vegan = document.querySelector('.vegan');
const button = document.querySelector('.jump-btn button');

let loop;

const jump = () => {
    if (button.textContent.includes('Jump!')) {
        carrot.classList.add('jump');
        carrot.src = 'assets/Character-Karotte-jump.gif';

        setTimeout(() => {
            carrot.classList.remove('jump');
            carrot.src = 'assets/Character-Karotte-run.gif';
        }, 1200);
    }
};

const startLoop = () => {
    loop = setInterval(() => {
        const veganPositionLeft = vegan.offsetLeft;
        
        const carrotPosition = +window.getComputedStyle(carrot).bottom.replace('px', '');
        const calculatedLimit = (window.innerHeight * 0.22) + 130;

        if (veganPositionLeft <= window.innerWidth * 0.20 && veganPositionLeft > -10 && carrotPosition < calculatedLimit) {
            vegan.style.animation = 'none';
            vegan.style.left = `${veganPositionLeft}px`;

            carrot.classList.remove('jump');
            carrot.style.bottom = `${carrotPosition}px`;

            button.innerHTML = 'Restart';
            button.style.backgroundColor = 'red';
            button.style.color = 'white';

            clearInterval(loop);
            button.removeEventListener('click', jump);
            button.addEventListener('click', restart);
        }
    }, 10);
};


const restart = () => {
    vegan.style.animation = 'vegan-run 2s infinite linear';
    vegan.style.left = '';

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


document.addEventListener('keydown', jump);


if (button.textContent.includes('Jump!')) {
    button.addEventListener('click', jump);
}

startLoop();
