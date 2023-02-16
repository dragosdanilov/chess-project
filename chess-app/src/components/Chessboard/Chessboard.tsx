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

for (let i = 0; i < 8; i++) {
    pieces.push({image: "assets/images/pawn_b.png", horizontalPosition: i, verticalPosition: 6});
}

for (let i = 0; i < 8; i++) {
    pieces.push({image: "assets/images/pawn_w.png", horizontalPosition: i, verticalPosition: 1});
}

// rooks

pieces.push({image: "assets/images/rook_b.png", horizontalPosition: 0, verticalPosition: 7});
pieces.push({image: "assets/images/rook_b.png", horizontalPosition: 7, verticalPosition: 7});

pieces.push({image: "assets/images/rook_w.png", horizontalPosition: 0, verticalPosition: 0});
pieces.push({image: "assets/images/rook_w.png", horizontalPosition: 7, verticalPosition: 0});

// knights

pieces.push({image: "assets/images/knight_b.png", horizontalPosition: 1, verticalPosition: 7});
pieces.push({image: "assets/images/knight_b.png", horizontalPosition: 6, verticalPosition: 7});

pieces.push({image: "assets/images/knight_w.png", horizontalPosition: 1, verticalPosition: 0});
pieces.push({image: "assets/images/knight_w.png", horizontalPosition: 6, verticalPosition: 0});

// bishops

pieces.push({image: "assets/images/bishop_b.png", horizontalPosition: 2, verticalPosition: 7});
pieces.push({image: "assets/images/bishop_b.png", horizontalPosition: 5, verticalPosition: 7});

pieces.push({image: "assets/images/bishop_w.png", horizontalPosition: 2, verticalPosition: 0});
pieces.push({image: "assets/images/bishop_w.png", horizontalPosition: 5, verticalPosition: 0});

// queens

pieces.push({image: "assets/images/queen_b.png", horizontalPosition: 3, verticalPosition: 7});

pieces.push({image: "assets/images/queen_w.png", horizontalPosition: 3, verticalPosition: 0});

// kings

pieces.push({image: "assets/images/king_b.png", horizontalPosition: 4, verticalPosition: 7});

pieces.push({image: "assets/images/king_w.png", horizontalPosition: 4, verticalPosition: 0});


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