import React, { useEffect, useRef, useState } from "react";
import Tile from "../Tile/Tile";
import './Chessboard.css';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
    image: string;
    horizontalPosition: number;
    verticalPosition: number;
}

const initialBoardState: Piece[] = []

for (let p = 0; p < 2; p++) {
    const type = p === 0 ? "b" : "w";
    const verticalPosition = (p === 0) ? 7 : 0;

initialBoardState.push({image: `assets/images/rook_${type}.png`, horizontalPosition: 0, verticalPosition: verticalPosition});
initialBoardState.push({image: `assets/images/rook_${type}.png`, horizontalPosition: 7, verticalPosition: verticalPosition});
initialBoardState.push({image: `assets/images/knight_${type}.png`, horizontalPosition: 1, verticalPosition: verticalPosition});
initialBoardState.push({image: `assets/images/knight_${type}.png`, horizontalPosition: 6, verticalPosition: verticalPosition});
initialBoardState.push({image: `assets/images/bishop_${type}.png`, horizontalPosition: 2, verticalPosition: verticalPosition});
initialBoardState.push({image: `assets/images/bishop_${type}.png`, horizontalPosition: 5, verticalPosition: verticalPosition});
initialBoardState.push({image: `assets/images/queen_${type}.png`, horizontalPosition: 3, verticalPosition: verticalPosition});
initialBoardState.push({image: `assets/images/king_${type}.png`, horizontalPosition: 4, verticalPosition: verticalPosition});
}

for (let i = 0; i < 8; i++) {
    initialBoardState.push({image: "assets/images/pawn_b.png", horizontalPosition: i, verticalPosition: 6});
}

for (let i = 0; i < 8; i++) {
    initialBoardState.push({image: "assets/images/pawn_w.png", horizontalPosition: i, verticalPosition: 1});
}

export default function Chessboard() {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const chessboardRef = useRef<HTMLDivElement>(null);

    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;
        if(element.classList.contains("chess-piece") && chessboard) {
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }

    function movePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft - 25;
            const minY = chessboard.offsetTop - 25;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = "absolute";

            // if x is smaller than minimum amount
            if(x < minX) {
                activePiece.style.left = `${minX}px`;
            // if x is bigger than maximum amount
            } else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            // if x is in the constraints
            } else {
                activePiece.style.left = `${x}px`;
            }

            // if y is smaller than minimum amount
            if(y < minY) {
                activePiece.style.top = `${minY}px`;
            // if y is bigger than maximum amount
            } else if (x > maxX) {
                activePiece.style.top = `${maxY}px`;
            // if y is in the constraints
            } else {
                activePiece.style.top = `${y}px`;
            }

        }
    }

    function dropPiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));
            console.log(x, y);
    
            setPieces(value => {
                const pieces = value.map((p) => {
                    if (p.horizontalPosition === gridX && p.verticalPosition === gridY) {
                        p.horizontalPosition = x;
                        p.verticalPosition = y;
                    }
                    return p;
                })
                return pieces;
            })
            setActivePiece(null);
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