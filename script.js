const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMsg = document.querySelector('[data-winning-msg]');
const restartButton = document.getElementById('restartButton');
const CIRCLE_CLASS = 'circle';
const CROSS_CLASS = 'cross';
const WINNING_COMBINATIONS =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let circleTurn;

startGame();

function startGame(){   
    circleTurn = false;
    setBoard(); 
    cellElements.forEach(cell =>{
        winningMsg.classList.remove('show');
        cell.classList.remove(CROSS_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', cellClicked);

        cell.addEventListener('click',cellClicked,{once: true});
    })
}

restartButton.addEventListener('click',startGame);


function setBoard(){
    board.classList.remove(CROSS_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }
    else{
        board.classList.add(CROSS_CLASS);
    }
}

function cellClicked(e){
    const cell = e.target;
    const currentClass = (circleTurn)? CIRCLE_CLASS : CROSS_CLASS;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        swapTurn();
        setBoard();
    }
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

function swapTurn(){
    circleTurn = !circleTurn;
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(CIRCLE_CLASS) || cell.classList.contains(CROSS_CLASS);
    })
}

function endGame(draw){
    if(draw){
        winningMsg.firstElementChild.innerHTML = 'Match Draw!';
        winningMsg.classList.add('show');
    }else{
        winningMsg.firstElementChild.innerHTML = `${(circleTurn)? 'O ' : 'X '}Wins!`;
        winningMsg.classList.add('show');
    }
}