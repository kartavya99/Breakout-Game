
const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;


//Create Block 
class Block {
    constructor(xAxis, yAxis) {
        // to find the exact position of the block
        this.bottomLeft = [xAxis, yAxis];
        this.blockHeight =[xAxis + blockWidth, yAxis]; // xAxis moves 100px sides
        this.topLeft = [xAxis, yAxis + blockHeight]; // yAxis moves 20px in height 
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]; //exact oppoiste of the bottomleft postion


    }
    
}

//all my blocks
const blocks = [
    new Block(10,270)
]
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


