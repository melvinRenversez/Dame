const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const color1 = "red"; 
const color2 = "green"; 
const caseSize = height / 8;

const p1Color = "blue";
const p2Color = "purple";

let board = [];
let pieces = [];

function highlightMoves(moves) {
    console.log("highlightMoves" + moves)
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Couleur semi-transparente pour les mouvements
    moves.forEach(move => {
        ctx.beginPath();
        ctx.arc(
            move.x * caseSize + caseSize / 2,
            move.y * caseSize + caseSize / 2,
            caseSize / 2.5,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });
}

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = Math.floor((e.clientX - rect.left) / caseSize);
    const mouseY = Math.floor((e.clientY - rect.top) / caseSize);

    console.log(mouseX + " " + mouseY )

    // Vérifie si une pièce est cliquée
    const piece = pieces.find(p => p.x === mouseX && p.y === mouseY);

    console.log(piece)

    if (piece) {
        const possibleMoves = piece.getPossibleMoves(board); // Calcule les mouvements
        console.log(possibleMoves)
        drawBoard();   // Redessine l'échiquier
        drawPieces();  // Redessine les pièces
        highlightMoves(possibleMoves); // Affiche les mouvements
    } else {
        drawBoard();
        drawPieces();
    }
});


function drawBoard() {
    board = [];
    pieces = [];

    for (let i = 0; i < 8; i++) {
        let row = [];
        for (let j = 0; j < 8; j++) {
            pos = "__"
            if ((i + j) % 2 === 0) {
                ctx.fillStyle = color1;
            } else {
                ctx.fillStyle = color2;

                if (i < 3) {
                    pieces.push(new Piece(j, i, p1Color, "piece", "down", "p1"));
                    pos = "p1"
                } else if (i > 4) {
                    pieces.push(new Piece(j, i, p2Color, "piece", "up" , "p2"));
                    pos = "p2"
                }
            }
            ctx.fillRect(j * caseSize, i * caseSize, caseSize, caseSize);
            row.push(pos);
        }
        board.push(row);
    }
}

function drawPieces() {
    pieces.forEach(piece => {
        piece.draw(ctx, caseSize);
    });
}


function init() {
    drawBoard();
    drawPieces();
    console.log(board);
}

init();
