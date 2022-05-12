
const grid = document.querySelector(".grid");


// created a blocks and added classlist block from style.css and applied positons.
function addBlocks () {
    
    const blocks = document.createElement("div");
    blocks.classList.add("block");
    blocks.style.left = "100px";
    blocks.style.bottom = "50px";
    grid.appendChild(blocks);
}


addBlocks();


