const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const button = document.querySelector('.jump button');

const jump = () => {
    mario.classList.add('jump'); 

    setTimeout( () =>{
        mario.classList.remove('jump'); 
    }, 500)
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');


    if(pipePosition <= 85 && pipePosition > 0  && marioPosition < 50){
        pipe.style.animation ='none';
        pipe.style.left =`${pipePosition}px`;


        mario.style.animation ='none';
        mario.style.bottom =`${marioPosition}px`;

        mario.src = 'assets/game-over.png ';
        mario.style.width= '50px'
        mario.style.marginLeft= '35px'
        mario.style.marginBottom= '23px'

        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', jump);

button.addEventListener('click', jump);





/* 
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const button = document.querySelector('.jump button');

const jump = () => {
    mario.classList.add('jump'); 

    setTimeout( () =>{
        mario.classList.remove('jump'); 
    }, 700)
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    console.log(marioPosition)


    if(pipePosition <= 120 && pipePosition > 0  && marioPosition < 105){
        pipe.style.animation ='none';
        pipe.style.left =`${pipePosition}px`;


        mario.style.animation ='none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'assets/game-over.png ';
        mario.style.width= '80px'
        mario.style.marginLeft= '50px'

        console.log(marioPosition)

        clearInterval(loop);
    }
}, 1);

document.addEventListener('keydown', jump);

button.addEventListener('click', jump); */