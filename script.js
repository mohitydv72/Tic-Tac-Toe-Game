let resetBtn=document.querySelector("#reset");
let boxes=document.querySelectorAll(".box");
let gameContainer=document.querySelector(".container");
let winningContainer=document.querySelector(".winnershow");
let showWintext=document.querySelector(".showWintext");
let newGamebtn=document.querySelector("#playAgain");
let turnX = true ;

const moveSound = document.getElementById('moveSound');
const winSound = document.getElementById('winSound');


//confatti 
const canvas = document.querySelector('#confetti');

const jsConfetti = new JSConfetti();

// confatti ends


const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const checkWinningCondition = ()=>{
    for (const ptrn of winningPatterns) {
        let val1=boxes[ptrn[0]].textContent;
        let val2=boxes[ptrn[1]].textContent;
        let val3=boxes[ptrn[2]].textContent;
        if (val1!="" && val2!=""&&val3!="") {
            if (val1===val2 && val2===val3) {
                console.log("Winner", val1);
                showWintext.textContent=`Coungratulations 😍 , Winner is player ${val1}` ;
                winningContainer.classList.remove("hide");
                gameContainer.classList.add("hide");
                winSound.play(); 
                moveSound.pause();

                jsConfetti.addConfetti({
                    emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
                }).then(() => jsConfetti.addConfetti())
            }
        }
    }
}

const checkTieCondition = () => {
    for (const box of boxes) {
        if (box.textContent === "") {
            return false; 
        }
    }
    return true; 
}

boxes.forEach((box)=>{
    box.addEventListener("click" , ()=>{
        if(turnX){
            box.textContent="X" ;
            turnX = false ;
        }
        else{
            box.textContent="O" ;
            turnX = true ;
        }
        box.disabled = true ;
        moveSound.play();
        winSound.pause();
        checkWinningCondition();
        if (checkTieCondition() && !checkWinningCondition()) {
            console.log("It's a tie!");
            showWintext.textContent = "It's a tie!";
            winningContainer.classList.remove("hide");
            gameContainer.classList.add("hide");
        }
    });
});


const resetGame =()=>{
    boxes.forEach((box)=>{
        box.textContent="";
        box.disabled = false ;
        winSound.pause();
        moveSound.pause();
    });
}

const newGame = ()=>{
    resetGame();
    gameContainer.classList.remove("hide");
    winningContainer.classList.add("hide");
    winSound.pause();
    moveSound.pause();
    jsConfetti.clearCanvas()
}

resetBtn.addEventListener("click" , resetGame);

newGamebtn.addEventListener("click" , newGame);