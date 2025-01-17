const gameBoardDiv = document.getElementById('game-board');
const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('reset-game');

const gameBoardSize = 3;

let nextPlayer, playerWon, moveCount, gameState;

let symbols = ['X', 'O'];


initGame();

const winningCombinations = [
    ['00', '01', '02'],
    ['10', '11', '12'],
    ['20', '21', '22'],
    ['00', '10', '20'],
    ['01', '11', '21'],
    ['02', '12', '22'],
    ['00', '11', '22'], 
    ['02', '11', '20']  
];




resetBtn.addEventListener('click', e => {
    initGame();
});

function initGame () {

    nextPlayer = 0;
    playerWon = false;
    moveCount = 0;
    gameState = [[], []];

    initGameBoard()
    
};

function initGameBoard() {

    gameBoardDiv.innerHTML = '';
    messageDiv.innerHTML = '';

    for ( let y = 0; y < gameBoardSize; y++ ) {
        for ( let x = 0; x < gameBoardSize; x++) {

            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.y = y;
            cellDiv.dataset.x = x;

            cellDiv.addEventListener('click', e => {
                if ( !e.target.innerText && !playerWon ) {

                    moveCount++;
        
                    const move = e.target.dataset.y + e.target.dataset.x;
                    gameState[nextPlayer].push(move);

                    e.target.innerText = symbols[nextPlayer];

                    if ( hasPlayerWon(gameState[nextPlayer]) ) {
                        playerWon = true;
                        messageDiv.innerText = `${symbols[nextPlayer]} VÕITIS MÄNGU!`;
                    } else if ( moveCount == 9 ) {
                        messageDiv.innerText = `MÄNG LÄBI, VIIK!`;
                    }
        
                    nextPlayer = Number(!nextPlayer);
                }
            });

            gameBoardDiv.appendChild(cellDiv)

        }
    }
}

function hasPlayerWon ( moves ) {

    let hasPlayerWon = false;

    winningCombinations.forEach( c => {
        if ( c.every(m => moves.includes(m)) ) {
            hasPlayerWon = true;
            
            c.forEach( ([y, x]) => {
                document.querySelector(`.cell[data-y="${y}"][data-x="${x}"]`).classList.add('winning');
            });

        }
    });
    
    return hasPlayerWon;

}