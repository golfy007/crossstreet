// script.js
const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreBoard = document.getElementById('score');
let score = 0;

document.addEventListener('keydown', movePlayer);
gameArea.addEventListener('touchstart', movePlayerTouch);

function movePlayer(e) {
    const left = player.offsetLeft;
    if (e.key === 'ArrowLeft' && left > 0) {
        player.style.left = `${left - 20}px`;
    }
    if (e.key === 'ArrowRight' && left < gameArea.offsetWidth - player.offsetWidth) {
        player.style.left = `${left + 20}px`;
    }
}

function movePlayerTouch(e) {
    const touchX = e.touches[0].clientX;
    const areaLeft = gameArea.offsetLeft;
    const areaWidth = gameArea.offsetWidth;

    if (touchX < areaLeft + areaWidth / 2) {
        // Move left
        const left = player.offsetLeft;
        if (left > 0) {
            player.style.left = `${left - 20}px`;
        }
    } else {
        // Move right
        const left = player.offsetLeft;
        if (left < gameArea.offsetWidth - player.offsetWidth) {
            player.style.left = `${left + 20}px`;
        }
    }
}

function createCar() {
    const car = document.createElement('div');
    car.classList.add('car');
    car.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 40))}px`;
    gameArea.appendChild(car);

    let carInterval = setInterval(() => {
        car.style.top = `${car.offsetTop + 5}px`;

        if (isCollision(player, car)) {
            alert('Game Over');
            clearInterval(carInterval);
            location.reload();
        }

        if (car.offsetTop > gameArea.offsetHeight) {
            clearInterval(carInterval);
            car.remove();
            score++;
            scoreBoard.textContent = score;
        }
    }, 50);
}

function isCollision(player, car) {
    const playerRect = player.getBoundingClientRect();
    const carRect = car.getBoundingClientRect();
    return !(
        playerRect.top > carRect.bottom ||
        playerRect.bottom < carRect.top ||
        playerRect.right < carRect.left ||
        playerRect.left > carRect.right
    );
}

setInterval(createCar, 2000);
