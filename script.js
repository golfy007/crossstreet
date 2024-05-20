/* style.css */
body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.game-area {
    position: relative;
    width: 300px;
    height: 500px;
    background-color: #ddd;
    overflow: hidden;
    border: 2px solid #000;
}

.player {
    width: 30px;
    height: 30px;
    background-color: pink;
    position: absolute;
    bottom: 10px;
    left: calc(50% - 15px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.name-tag {
    position: absolute;
    top: -20px;
    background-color: white;
    border: 1px solid #000;
    padding: 2px 4px;
    font-size: 12px;
    border-radius: 3px;
}

.car {
    width: 40px;
    height: 70px;
    background-color: red;
    position: absolute;
    top: 0;
}

.score-board {
    margin-top: 10px;
}
