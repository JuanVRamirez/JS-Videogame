const canvas = document.querySelector("#game");
const game = canvas.getContext("2d")
const btnUp = document.querySelector("#up")
const btnLeft = document.querySelector("#left")
const btnRight = document.querySelector("#right")
const btnDown = document.querySelector("#down")

window.addEventListener("load", setCanvasSize)
window.onresize=setCanvasSize;
window.addEventListener("keydown", moveByKeys)

btnUp.addEventListener("click", moveUp)
btnLeft.addEventListener("click", moveLeft)
btnRight.addEventListener("click", moveRight)
btnDown.addEventListener("click", moveDown)

let canvasSize;
let elementSize;
const playerPosition = {
    x: undefined,
    y: undefined,
}
const giftPosition ={
    x: undefined,
    y: undefined,
}
let enemiesPosition = []


const map = maps[0]

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
      canvasSize = window.innerWidth * 0.8;
    } else {
      canvasSize = window.innerHeight * 0.8;
    }
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementSize = canvasSize / 10;
  
    startGame();
  }

function startGame(){

    game.font = elementSize + "px Verdana";
    game.textAlign = "";

    
    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(""))
    console.log({map, mapRows, mapRowCols})

    enemiesPosition = [];
    game.clearRect(0,0, canvasSize, canvasSize)

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col]
            const posX = elementSize *(colIndex-0.1)
            const posY = elementSize *(rowIndex+0.8)

            if (col == "O"){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            } else if (col == "I"){
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == "X"){
                enemiesPosition.push ({
                    x: posX,
                    y: posY,
                })
            }

           game.fillText(emoji, posX, posY)
        });
    });
    movePlayer();
    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 0; col < 10; col++) {
    // game.fillText(emojis[mapRowCols[row-1][col]], elementSize* col, elementSize* row);
    //     }  
    // }


    // game.fillRect(0,0,100,100);
    // game.clearRect(0,0,50,50)
}


function movePlayer(){
    const giftCollsionX = Math.trunc(playerPosition.x) == Math.trunc(giftPosition.x);
    const giftCollsionY = Math.trunc(playerPosition.y) == Math.trunc(giftPosition.y);
    const giftCollision = giftCollsionX && giftCollsionY

    if(giftCollision){
       console.log("GANASTE")
    }

    const enemyCollision = enemiesPosition.find(enemy => {
       const enemyCollisionX = Math.trunc(enemy.x) == Math.trunc(playerPosition.x);
       const enemyCollisionY = Math.trunc(enemy.y) == Math.trunc(playerPosition.y);
       return enemyCollisionX && enemyCollisionY;
    })

    if(enemyCollision){
        console.log("Chocaste")
     }

    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y)

}


function moveByKeys(event){
    let tecla = event.key
 switch (tecla) {
    case "ArrowUp":
        moveUp();
        break;
    case "ArrowLeft":
        moveLeft();
        break;
    case "ArrowRight":
        moveRight();
        break;
    case "ArrowDown":
        moveDown();
        break;
    
    default:
        break;
 }
}

function moveUp(){
    if ((playerPosition.y - elementSize)<0) {
        
    } else {
        playerPosition.y -= elementSize;
        startGame();
    }
}
function moveLeft(){
    if ((playerPosition.x < elementSize*0.5)) {
        
    } else {
    playerPosition.x -= elementSize
    startGame();
}
}
function moveRight(){
    if(playerPosition.x > elementSize*8){

    } else {
    playerPosition.x += elementSize
    startGame();
}
}
function moveDown(){
    if (playerPosition.y > elementSize*9) {
        
    } else {
    playerPosition.y += elementSize;
    startGame();
}
}

