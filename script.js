const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreBoard = document.getElementById('scoreBoard');
const scoreDisplay = document.getElementById('score');
const highscoreBoard = document.getElementById('highscore');
const saveButton = document.getElementById('saveButton');
const playerNameInput = document.getElementById('playerName');
const saveScore = document.getElementById('saveScore');
const highscoreList = document.getElementById('highscoreList');
const highscoreUl = document.getElementById('highscoreUl');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');
const surrenderButton = document.getElementById('surrenderButton');
const gameOver = document.getElementById('gameOver');
let score = 0;
let carSpeed = 5;
let carIntervalTime = 2000;
let carCount = 1;
let carCreationInterval;
let difficultyInterval;
let carIncreaseInterval;
let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
updateHighscoreBoard();

startButton.addEventListener('click', startGame);
surrenderButton.addEventListener('click', endGame);

function startGame() {
    startButton.style.display = 'none';
    gameArea.style.display = 'block';
    scoreBoard.style.display = 'block';
    surrenderButton.style.display = 'block';
    carCreationInterval = setInterval(createCars, carIntervalTime);
    difficultyInterval = setInterval(increaseSpeed, 120000); // เพิ่มความเร็วทุก 2 นาที
    carIncreaseInterval = setInterval(increaseCarCount, 7000); // เพิ่มจำนวนรถทุก 7 วินาที
}

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

function createCars() {
    for (let i = 0; i < carCount; i++) {
        createCar();
    }
}

function createCar() {
    const car = document.createElement('div');
    car.classList.add('car');
    car.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 40))}px`;
    gameArea.appendChild(car);

    let carInterval = setInterval(() => {
        car.style.top = `${car.offsetTop + carSpeed}px`;

        if (isCollision(player, car)) {
            clearInterval(carInterval);
            endGame();
        }

        if (car.offsetTop > gameArea.offsetHeight) {
            clearInterval(carInterval);
            car.remove();
            score++;
            scoreDisplay.textContent = score;
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

function increaseCarCount() {
    carCount += 1;
}

function increaseSpeed() {
    carSpeed += 1;
    if (carIntervalTime > 500) {
        carIntervalTime -= 100;
    }
    clearInterval(carCreationInterval);
    carCreationInterval = setInterval(createCars, carIntervalTime);
}

function endGame() {
    clearInterval(carCreationInterval);
    clearInterval(difficultyInterval);
    clearInterval(carIncreaseInterval);
    gameOver.style.display = 'block';
    surrenderButton.style.display = 'none';
    if (score > (highscores[highscores.length - 1]?.score || 0) || highscores.length < 20) {
        saveScore.style.display = 'block';
    } else {
        showHighscoreList();
    }
}

function updateHighscoreBoard() {
    highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscoreUl.innerHTML = highscores.map((entry, index) => `<li>${index + 1}. ${entry.name} - ${entry.score}</li>`).join('');
}

function showHighscoreList() {
    saveScore.style.display = 'none';
    highscoreList.style.display = 'block';
    updateHighscoreBoard();
}

saveButton.addEventListener('click', () => {
    const playerName = playerNameInput.value;
    if (playerName && score > 0) {
        highscores.push({ name: playerName, score });
        highscores.sort((a, b) => b.score - a.score);
        if (highscores.length > 20) highscores.pop();
        localStorage.setItem('highscores', JSON.stringify(highscores));
        showHighscoreList();
    }
});

restartButton.addEventListener('click', () => {
    location.reload();
});
