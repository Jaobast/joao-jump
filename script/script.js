const carrot = document.querySelector('.carrot');
const vegan = document.querySelector('.vegan');
const button = document.querySelector('.jump-btn button');

let loop; // Variável para o loop

const jump = () => {
    if (button.textContent.includes('Jump!')) { // Evitar pulo se o botão for "Restart"
        carrot.classList.add('jump');

        setTimeout(() => {
            carrot.classList.remove('jump');
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

            clearInterval(loop); // Para o loop
            button.removeEventListener('click', jump); // Remover evento de pulo no "Restart"
            button.addEventListener('click', restart); // Adiciona o evento de restart
        }
    }, 10);
};

// Função de restart
const restart = () => {
    vegan.style.animation = 'vegan-run 2.5s infinite linear';
    vegan.style.left = '';

    carrot.style.animation = '';
    carrot.style.bottom = '22vh';

    carrot.src = 'assets/Character-02-Karrot.gif';

    button.innerHTML = 'Jump!';
    button.style.backgroundColor = '#1d9714';
    button.style.color = '#87ceeb';

    button.removeEventListener('click', restart); // Remove o evento de restart ao reiniciar
    button.addEventListener('click', jump); // Adiciona de volta o evento de pulo no "Jump!"
    
    startLoop(); // Reinicia o loop ao reiniciar o jogo
};

document.addEventListener('keydown', jump);

// Quando o botão estiver com "Jump!", adicionar o evento de clique para pulo
if (button.textContent.includes('Jump!')) {
    button.addEventListener('click', jump);
}

startLoop(); // Inicia o loop quando o jogo começa
