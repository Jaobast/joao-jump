const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const button = document.querySelector('.jump button');

let loop; // Variável para o loop

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 700);
};

const startLoop = () => {
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 70 && pipePosition > 0 && marioPosition < 60) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'assets/joao-game-over.png';
            mario.style.marginBottom = '13px';

            button.innerHTML = 'Restart';
            button.style.backgroundColor = 'red';
            button.style.color = 'white';

            clearInterval(loop); // Para o loop
            button.addEventListener('click', restart); // Adiciona o evento de restart
        }
    }, 10);
};

// Função de restart
const restart = () => {
    pipe.style.animation = 'pipe-animation 2s infinite linear';
    pipe.style.left = '';

    mario.style.animation = '';
    mario.style.bottom = '0';

    mario.src = 'assets/joao.gif';
    mario.style.marginBottom = '';

    button.innerHTML = 'Jump!';
    button.style.backgroundColor = '#1d9714';
    button.style.color = '#87ceeb';

    startLoop(); // Reinicia o loop ao reiniciar o jogo
};

document.addEventListener('keydown', jump);

if (button.textContent.includes('Jump!')) {
    button.addEventListener('click', jump);
}

startLoop(); // Inicia o loop quando o jogo começa
