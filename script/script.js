const vegetable = document.querySelector('.carrot');
const pipe = document.querySelector('.pipe');
const button = document.querySelector('.jump-btn button');

let loop; // Variável para o loop

const jump = () => {
    vegetable.classList.add('jump');

    setTimeout(() => {
        vegetable.classList.remove('jump');
    }, 700);
};

const startLoop = () => {
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const vegetablePosition = +window.getComputedStyle(vegetable).bottom.replace('px', '');

        if (pipePosition <= 70 && pipePosition > 0 && vegetablePosition < 60) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            vegetable.style.animation = 'none';
            vegetable.style.bottom = `${vegetablePosition}px`;

            vegetable.src = 'assets/joao-game-over.png';
            vegetable.style.marginBottom = '13px';

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

    vegetable.style.animation = '';
    vegetable.style.bottom = '0';

    vegetable.src = 'assets/joao.gif';
    vegetable.style.marginBottom = '';

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
