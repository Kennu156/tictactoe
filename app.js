const cellDivs = Array.from(document.getElementsByClassName('cell'));

const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('reset-game')

let symbols = ['X', 'Y'];

let nextPlayer, playerWon, moveCount;

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

let gameState = [[], []];

cellDivs.forEach( cellDiv => {
    
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
                messageDiv.innerText = `MÄNG LÄBI, VIIK!`
            }

            nextPlayer = Number(!nextPlayer);

        }

    });

});
resetBtn.addEventListener('click', e => {
    initGame()
})

function initGame() {

    nextPlayer = 0;
    playerWon = false;
    moveCount = 0;

    // <div class="cell" data-y="2" data-x="2"></div>

    for ( let i = 0; y < size; y++ ){

        const tr = document.createElement('tr')
        for ( let x = 0; x < size; x++){

            const tr = document.createElement('tr')
            td.classList.add('cell')
            td.dataset.y = y;

        }
    }


};

function hasPlayerWon ( moves ) {

    let hasPlayerWon = false;

    winningCombinations.forEach( c => {
        if ( c.every(m => moves.includes(m)) ) {
            hasPlayerWon = true;

            c.forEach( ([y, x]) => {
                console.log(y, x);
                document.querySelector(`.cell[data-y="${y}"][data-x="${x}"]`).classList.add('winning');
            });
        }
    });
    
    return hasPlayerWon;

}