import Tile from "../Tile/Tile";
import './Chessboard.css';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
    image: string;
    horizontalPosition: number;
    verticalPosition: number;
}

const pieces: Piece[] = [];

for (let p = 0; p < 2; p++) {
    const type = p === 0 ? "b" : "w";
    const verticalPosition = (p === 0) ? 7 : 0;

pieces.push({image: `assets/images/rook_${type}.png`, horizontalPosition: 0, verticalPosition: verticalPosition});
pieces.push({image: `assets/images/rook_${type}.png`, horizontalPosition: 7, verticalPosition: verticalPosition});
pieces.push({image: `assets/images/knight_${type}.png`, horizontalPosition: 1, verticalPosition: verticalPosition});
pieces.push({image: `assets/images/knight_${type}.png`, horizontalPosition: 6, verticalPosition: verticalPosition});
pieces.push({image: `assets/images/bishop_${type}.png`, horizontalPosition: 2, verticalPosition: verticalPosition});
pieces.push({image: `assets/images/bishop_${type}.png`, horizontalPosition: 5, verticalPosition: verticalPosition});
pieces.push({image: `assets/images/queen_${type}.png`, horizontalPosition: 3, verticalPosition: verticalPosition});
pieces.push({image: `assets/images/king_${type}.png`, horizontalPosition: 4, verticalPosition: verticalPosition});
}

for (let i = 0; i < 8; i++) {
    pieces.push({image: "assets/images/pawn_b.png", horizontalPosition: i, verticalPosition: 6});
}

for (let i = 0; i < 8; i++) {
    pieces.push({image: "assets/images/pawn_w.png", horizontalPosition: i, verticalPosition: 1});
}

export default function Chessboard() {
    let board = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const tileNumber = j + i + 2;
            let image = undefined;

            pieces.forEach(p => {
                if (p.horizontalPosition === i && p.verticalPosition === j) {
                    image = p.image;
                }
            })

            board.push(<Tile image={image} number={tileNumber} />);
        }
    }
    return <div id="chessboard">{board}</div>;
}