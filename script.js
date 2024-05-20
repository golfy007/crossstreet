const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreBoard = document.getElementById('score');
const highscoreBoard = document.getElementById('highscore');
const saveButton = document.getElementById('saveButton');
const playerNameInput = document.getElementById('playerName');
let score = 0;
let highscore = localStorage.getItem('highscore') || 0;

highscoreBoard.textContent = highscore;

document.addEventListener('keydown', movePlayer);
gameArea.addEventListener('touchstart', startDrag);
gameArea.addEventListener('touchmove', dragPlayer);
gameArea.addEventListener('touchend', endDrag);

let dragging = false;

function movePlayer(e) {
    const left = player.offsetLeft;
    if (e.key === 'ArrowLeft' && left > 0) {
        player.style.left = `${left - 20}px`;
    }
    if (e.key === 'ArrowRight' && left < gameArea.offsetWidth - player.offsetWidth) {
        player.style.left = `${left + 20}px`;
    }
}

function startDrag(e) {
    dragging = true;
}

function dragPlayer(e) {
    if (dragging) {
        const touchX = e.touches[0].clientX;
        const areaLeft = gameArea.offsetLeft;
        const areaWidth = gameArea.offsetWidth;
        let newLeft = touchX - areaLeft - player.offsetWidth / 2;
        if (newLeft < 0) newLeft = 0;
        if (newLeft > areaWidth - player.offsetWidth) newLeft = areaWidth - player.offsetWidth;
        player.style.left = `${newLeft}px`;
    }
}

function endDrag() {
    dragging = false;
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
            if (score > highscore) {
                highscore = score;
                localStorage.setItem('highscore', highscore);
                highscoreBoard.textContent = highscore;
            }
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

saveButton.addEventListener('click', () => {
    const playerName = playerNameInput.value;
    if (playerName && score > 0) {
        alert(`Highscore saved!\nName: ${playerName}\nScore: ${score}`);
    }
});
