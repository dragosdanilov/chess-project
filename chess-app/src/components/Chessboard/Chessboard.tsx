import React, { useRef } from "react";
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
    const chessboardRef = useRef<HTMLDivElement>(null);

    let activePiece: HTMLElement | null = null;

    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        if(element.classList.contains("chess-piece")) {
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            activePiece = element;
        }
    }

    function movePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft-25;
            const minY = chessboard.offsetTop;
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = "absolute";
            // activePiece.style.left = `${x}px`;
            // activePiece.style.top = `${y}px`;

            if(x < minX) {
                activePiece.style.left = `${minX}px`;
            } else {
                activePiece.style.left = `${x}px`;
            }
        }
    }

    function dropPiece(e: React.MouseEvent) {
        if (activePiece) {
            activePiece = null;
        }
    }

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

            board.push(<Tile key={`${j},${i}`} image={image} number={tileNumber} />);
        }
    }
    return (
        <div 
        onMouseMove={(e) => movePiece(e)} 
        onMouseDown={(e) => grabPiece(e)} 
        onMouseUp={(e) => dropPiece(e)}
        id="chessboard"
        ref={chessboardRef}
        >
            {board}
        </div>);
}