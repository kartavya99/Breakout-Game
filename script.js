
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20; // getting ball diameter from the CSS ball class
// user always going to start from this position
const userStart = [230, 10];
// currentPosition of user
let currentPosition = userStart;
const boardWidth = 560;
const boardHeight = 300;

//ball start position
const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timerId;
let xDirection = -2;
let yDirection = 2;
let score = 0;


//Create Block 
class Block {
    constructor(xAxis, yAxis) {
        // to find the exact position of the block
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight =[xAxis + blockWidth, yAxis]; // xAxis moves 100px sides
        this.topLeft = [xAxis, yAxis + blockHeight]; // yAxis moves 20px in height 
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]; //exact oppoiste of the bottomleft postion
    };
  
};

//all my blocks
const blocks = [
    new Block(10,270),
    new Block(120,270), // adding 110px to create colume of blocks
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),// first row ends here
    new Block(10,240), // creating second row by reducing yAxies 30px
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210), // creating thired row by reducing yAxies 30px
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210)
    
];
//console.log(blocks[0]);

// created a block and added classlist block from style.css and applied positons.
function addBlocks () {
        // const blocks = d
    for(let i = 0; i < blocks.length; i++){
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.left = blocks[i].bottomLeft[0] + "px";
        block.style.bottom = blocks[i].bottomLeft[1] + "px";
        grid.appendChild(block);

    }
}
addBlocks();

// create user with start poisition 
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);


// draw the user
function drawUser() {
    // users will always start frm the below position and use this poistion for user to move
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition [1] + "px";
};

// draw the ball 
function drawBall () {
    // ball is always start from the below position 
    ball.style.left = ballCurrentPosition[0] +"px";
    ball.style.bottom = ballCurrentPosition[1] +"px";
};



//mover user
function moveUser(e) {
    switch(e.key){
        case "ArrowLeft":
            if (currentPosition[0] > 0 ) {
                currentPosition[0] -= 10
                drawUser();
            }
            break;

        case "ArrowRight":
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10
                drawUser();
            }
            break;
    }
}

document.addEventListener("keydown", moveUser);

// add ball with start position
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);


// move ball
function moveBall () {
    ballCurrentPosition[0] += xDirection; //adding 2 px to xAxis
    ballCurrentPosition[1] += yDirection; //adding 2 px to yAxis
    drawBall();
    checkForCollisions();
};

timerId =setInterval(moveBall, 30);

// chage the direction of ball when it hits the border of the board = check for collisions
function checkForCollisions () {

        //check for block collisions
        for (let i =0; i < blocks.length; i++) {
            if (
                (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && 
                ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
                (ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] &&
                ballCurrentPosition[1] < blocks[i].topLeft[1] ) 
                ) {
                    const allBlocks = Array.from(document.querySelectorAll(".block"));
                    //console.log(allBlocks);
                    //remove the block from the allBlocks
                    allBlocks[i].classList.remove('block');
                    //removing the block from blocks array
                    blocks.splice(i, 1);
                    // after removing the block we need to change the direction
                    changeDiretion();
                    score ++;
                    scoreDisplay.innerHTML = score;

                    // check for win
                    if ( blocks.length === 0 ) {
                        scoreDisplay.innerHTML = "You Win";
                        clearInterval(timerId);
                        document.removeEventListener("keydown", moveUser);
                    };
                };
        };

        //check for wall collisions
        if (
            ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
            ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
            ballCurrentPosition[0] <= 0
            ) {
                changeDiretion()
            };

        //check for user collisions
        if (
            (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
            (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
        ) {
            changeDiretion();
        };

        // chekc for game over
        if(ballCurrentPosition[1] <= 0) {
            clearInterval(timerId);
            scoreDisplay.innerHTML ="You lose";
            document.removeEventListener("keydown", moveBall);
        };
};



function changeDiretion ( ) {
    if (xDirection === 2 && yDirection === 2 ) {
            yDirection = -2;
            return;
        };
    if (xDirection === 2 && yDirection === -2 ) {
            xDirection = -2;
            return;
        };
    if (xDirection === -2 && yDirection === -2) {
            yDirection = 2;
            return;
        };
    if (xDirection === -2 && yDirection === 2 ) {
            xDirection =2;
            return;
        };
       
};