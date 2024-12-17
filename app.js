const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

width = canvas.width;
height =  canvas.height;

color1 = "red";
color2 = "green";

p1 = "blue"
p2 = "purple"

caseSize = height / 8;

board = [];


function drawBoardAndPieces() { 
    for (let i = 0; i < 8; i++) {
        ix = []
        for (let j = 0; j < 8; j++) {
            if ((i + j ) % 2 === 0){
                ctx.fillStyle = color1;
                ctx.fillRect(j * caseSize, i * caseSize, caseSize, caseSize);
            }else{
                ctx.fillStyle = color2;
                ctx.fillRect(j * caseSize, i * caseSize, caseSize, caseSize);
                if (i < 3) {
                    drawPieces(j, i, p1);
                }
                if (i > 4) {
                    drawPieces(j, i, p2);
                }
            }
            jx = ""
            ix.push(jx);
        }
        board.push(ix);
    }
    console.log(board);
}



function drawPieces(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x * caseSize + caseSize / 2, y * caseSize + caseSize / 2, caseSize / 2.5, 0, Math.PI * 2, );
    ctx.fill()
    console.log("Drawing pieces");
}

drawBoardAndPieces();
drawPieces(5, 5);