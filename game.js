const canvas = document.querySelector("#game");
const game = canvas.getContext("2d")
const btnUp = document.querySelector("#up")
const btnLeft = document.querySelector("#left")
const btnRight = document.querySelector("#right")
const btnDown = document.querySelector("#down")

window.addEventListener("load", startGame)
window.onresize=startGame;

function startGame(){
    let canvasSize;

    if (window.innerHeight > window.innerWidth) {
       canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute("width", canvasSize)
    canvas.setAttribute("height", canvasSize)

    const elementSize = (canvasSize /10)-1;

    game.font = elementSize + "px Verdana";
    game.textAlign = "";

    const map = maps[2]
    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(""))
    console.log({map, mapRows, mapRowCols})

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col]
            const posX = elementSize *(colIndex-0.1)
            const posY = elementSize *(rowIndex+1)
           game.fillText(emoji, posX, posY)
        });
    });


    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 0; col < 10; col++) {
    // game.fillText(emojis[mapRowCols[row-1][col]], elementSize* col, elementSize* row);
    //     }  
    // }


    // game.fillRect(0,0,100,100);
    // game.clearRect(0,0,50,50)
}

btnUp.addEventListener("click", moveUp)
btnLeft.addEventListener("click", moveLeft)
btnRight.addEventListener("click", moveRight)
btnDown.addEventListener("click", moveDown)

