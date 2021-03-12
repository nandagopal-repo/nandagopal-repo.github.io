const boardContainer = document.querySelector('.board-container');
const messageContainer = document.querySelector('.message-container');
const message = document.querySelector('.message');
const restart = document.querySelector('.r-btn');

// to restart the game simply reload the page:
restart.addEventListener('click',()=>{
    window.location.reload();
})

// create empty array of size 9 for store x or o:
let array = ['','','',
             '','','',
             '','',''];

// call play function exactly 9 times:
array.forEach(play);


function play(){
    // initial turn is x:
    let turn = 'x';
    boardContainer.addEventListener('click',(e)=>{
    
        if(turn === 'x' && e.target.textContent === '' && message.textContent === ''){
            e.target.textContent = "x";
            e.target.style.color = "yellow";
            array[e.target.id] = 'x';
            checkWin(turn);
            checkDraw();

            // change initial turn:
            turn = 'o';
        }
        
        if(turn === 'o' && e.target.textContent === '' && message.textContent === ''){
            e.target.textContent = "o";
            e.target.style.color = "green";
            array[e.target.id] = 'o';
            checkWin(turn);
            checkDraw();

            // again change turn:
            turn = 'x';
        }
    });
}


// check winning combinations:
function checkWin(turn){
    if(
        // check horizontal values:
      (array[0]=== turn && array[1] === turn && array[2] === turn) || 
      (array[3]=== turn && array[4] === turn && array[5] === turn) ||
      (array[6]=== turn && array[7] === turn && array[8] === turn) ||

        // check vertical values:
      (array[0]=== turn && array[3] === turn && array[6] === turn) || 
      (array[1]=== turn && array[4] === turn && array[7] === turn) ||
      (array[2]=== turn && array[5] === turn && array[8] === turn) ||

        // check diagonal values:
      (array[0]=== turn && array[4] === turn && array[8] === turn) ||
      (array[2]=== turn && array[4] === turn && array[6] === turn))
    {  
        messageContainer.style.display = 'flex';
        message.textContent = `${turn}  wins!`;
    }
} 


// checking draw case:
function checkDraw(){
    // check array not equal to empty:
    if( (array[0] !== '')&&
        (array[1] !== '')&&
        (array[2] !== '')&&
        (array[3] !== '')&&
        (array[4] !== '')&&
        (array[5] !== '')&&
        (array[6] !== '')&&
        (array[7] !== '')&&
        (array[8] !== ''))
    {
        messageContainer.style.display = 'flex';
        message.textContent = "draw";
    }
}