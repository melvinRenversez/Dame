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

let selectedPiece = null;
let possibleMoves =  [];

function highlightMoves(moves, piece) {
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

    if(selectedPiece){
        console.log(board)
        console.log("AZERTT")
        console.log(selectedPiece)
        console.log(possibleMoves)
        const validMove = possibleMoves.find(move => move.x === mouseX && move.y === mouseY);
        if (validMove) {
            console.log("QSDFGHJK")
            console.log("OK");

            board[mouseY][mouseX] = board[selectedPiece.y][selectedPiece.x];
            board[selectedPiece.y][selectedPiece.x] = "__";


            console.log(selectedPiece)
            
            selectedPiece.x = validMove.x;
            selectedPiece.y = validMove.y

            console.log(selectedPiece)

            selectedPiece = null;
            possibleMoves = [];
            console.log(board)
            drawBoard();
            drawPieces();
            return;
        }
    }


    console.log(piece)

    if (piece) {
        selectedPiece = piece;  
        possibleMoves = piece.getPossibleMoves(board); // Calcule les mouvements
        console.log(possibleMoves)
        drawBoard();   // Redessine l'échiquier
        drawPieces();  // Redessine les pièces
        highlightMoves(possibleMoves, piece); // Affiche les mouvements
    } else {
        drawBoard();
        drawPieces();
    }
});


function drawBoard() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            ctx.fillStyle = (i + j) % 2 === 0 ? color1 : color2;
            ctx.fillRect(j * caseSize, i * caseSize, caseSize, caseSize);
        }
    }
}

function drawPieces() {
    pieces.forEach(piece => {
        piece.draw(ctx, caseSize);
    });
}


function init() {
    // Initialise le tableau vide
    for (let i = 0; i < 8; i++) {
        const row = Array(8).fill("__");
        board.push(row);
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i < 3 && (i + j) % 2 !== 0) {
                const piece = new Piece(j, i, p1Color, "piece", "down", "p1");
                pieces.push(piece);
                board[i][j] = "p1";
            }else if ( i > 4 && (i + j) % 2 !== 0) {
                const piece = new Piece(j, i, p2Color, "piece", "up", "p2");
                pieces.push(piece);
                board[i][j] = "p2";
            }
        }
    }


    console.log(board)

    drawBoard();
    drawPieces();
}

init();
