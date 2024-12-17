class Piece {
    constructor(x, y, color, type, direction, team) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.type = type; // Type de pièce (ex: pion, dame)
        this.direction = direction; // "down" ou "up"
        this.team = team;
    }

    draw(ctx, caseSize) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.x * caseSize + caseSize / 2,
            this.y * caseSize + caseSize / 2,
            caseSize / 2.5,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    // Retourne les mouvements possibles sous forme d'une liste
    getPossibleMoves(board) {
        const moves = [];

        if (this.type === "piece") {
            // Mouvement diagonal (ex: pion ou dame)
            const directions = this.direction === "down" 
                ? [[1, 1], [-1, 1]] // Diagonales vers le bas
                : [[1, -1], [-1, -1]]; // Diagonales vers le haut

            for (const [dx, dy] of directions) {
                const newX = this.x + dx;
                const newY = this.y + dy;

                console.log(newY, newX);

                console.log('________________________________________________________________')
                console.log(board);
                console.log(board[newX][newY]);
                console.log('________________________________________________________________')

                // Vérifie que le mouvement reste dans les limites du tableau
                if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {

                    if (board[newY][newX] !== this.team) {
                        moves.push({ x: newX, y: newY });
                    }

                    
                }
            }
        }

        return moves; // Liste des cases accessibles
    }
}
