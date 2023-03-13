import React, { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import './Chessboard.css';
import Referee from "../../referee/Referee"; 

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
    image: string;
    horizontalPosition: number;
    verticalPosition: number;
    type: PieceType;
    team: TeamType;
    enPassant?: boolean;
}

export enum TeamType {
    OPPONENT,
    OUR
}

export enum PieceType {
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
}

const initialBoardState: Piece[] = []

for (let p = 0; p < 2; p++) {
    const teamType = (p === 0) ? TeamType.OPPONENT : TeamType.OUR
    const type = (teamType === TeamType.OPPONENT) ? "b" : "w";
    const verticalPosition = (teamType === TeamType.OPPONENT) ? 7 : 0;

initialBoardState.push({image: `assets/images/rook_${type}.png`, horizontalPosition: 0, verticalPosition: verticalPosition, type: PieceType.ROOK, team: teamType});
initialBoardState.push({image: `assets/images/rook_${type}.png`, horizontalPosition: 7, verticalPosition: verticalPosition, type: PieceType.ROOK, team: teamType});
initialBoardState.push({image: `assets/images/knight_${type}.png`, horizontalPosition: 1, verticalPosition: verticalPosition, type: PieceType.KNIGHT, team: teamType});
initialBoardState.push({image: `assets/images/knight_${type}.png`, horizontalPosition: 6, verticalPosition: verticalPosition, type: PieceType.KNIGHT, team: teamType});
initialBoardState.push({image: `assets/images/bishop_${type}.png`, horizontalPosition: 2, verticalPosition: verticalPosition, type: PieceType.BISHOP, team: teamType});
initialBoardState.push({image: `assets/images/bishop_${type}.png`, horizontalPosition: 5, verticalPosition: verticalPosition, type: PieceType.BISHOP, team: teamType});
initialBoardState.push({image: `assets/images/queen_${type}.png`, horizontalPosition: 3, verticalPosition: verticalPosition, type: PieceType.QUEEN, team: teamType});
initialBoardState.push({image: `assets/images/king_${type}.png`, horizontalPosition: 4, verticalPosition: verticalPosition, type: PieceType.KING, team: teamType});
}

for (let i = 0; i < 8; i++) {
    initialBoardState.push({image: "assets/images/pawn_b.png", horizontalPosition: i, verticalPosition: 6, type: PieceType.PAWN, team: TeamType.OPPONENT});
}

for (let i = 0; i < 8; i++) {
    initialBoardState.push({image: "assets/images/pawn_w.png", horizontalPosition: i, verticalPosition: 1, type: PieceType.PAWN, team: TeamType.OUR});
}

export default function Chessboard() {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const chessboardRef = useRef<HTMLDivElement>(null);
    const referee = new Referee();

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

            const currentPiece = pieces.find((p) => p.horizontalPosition === gridX && p.verticalPosition === gridY);
            const attackedPiece = pieces.find((p) => p.horizontalPosition === x && p.verticalPosition === y);

            if (currentPiece) {
                const validMove = referee.isValidMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces);

                // REDUCE FUNCTION
                // RESULTS => Array of results
                // PIECE => The current piece we are handling

                const isEnPassantMove = referee.isEnPassantMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces
                )

                const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;
                if(isEnPassantMove) {
                    const updatedPieces = pieces.reduce((results, piece) => {
                        if (piece.horizontalPosition === gridX && piece.verticalPosition === gridY) {
                            piece.enPassant = false;
                            piece.horizontalPosition = x;
                            piece.verticalPosition = y;
                            results.push(piece);
                        } else if (!(piece.horizontalPosition === x && piece.verticalPosition === y - pawnDirection)) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece);
                        }
                        return results;
                    }, [] as Piece[])

                    setPieces(updatedPieces);
                } else if (validMove) {
                    // UPDATES THE PIECE POSITION
                    // REMOVES ATTACKED PIECES

                    // setPieces((value) => return updatedPieces)
                    // setPieces(updatedPieces)

                    const updatedPieces = pieces.reduce((results, piece) => {

                        if (piece.horizontalPosition === gridX && piece.verticalPosition === gridY) {
                            if (Math.abs(gridY - y) === 2 && piece.type === PieceType.PAWN) {
                                piece.enPassant = true;
                            } else {
                                piece.enPassant = false;
                            }
                            piece.horizontalPosition = x;
                            piece.verticalPosition = y;
                            results.push(piece);
                        } else if (!(piece.horizontalPosition === x && piece.verticalPosition === y)) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece);
                        }

                        return results;
                    }, [] as Piece[]);

                    setPieces(updatedPieces);

                    // setPieces((value) => {
                    //     const pieces = value.reduce((results, piece) => {

                    //         if (piece.horizontalPosition === currentPiece.horizontalPosition && piece.verticalPosition === currentPiece.verticalPosition) {
                    //             piece.horizontalPosition = x;
                    //             piece.verticalPosition = y;

                    //             results.push(piece);
                    //         } else if (!(piece.horizontalPosition === x && piece.horizontalPosition === y)) {
                    //             results.push(piece);
                    //         }

                    //         return results;
                    //     }, [] as Piece[])

                    //     return pieces
                    // })
                } else {
                    // RESETS THE PIECE POSITION
                    activePiece.style.position = 'relative';
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left');
                }
            }            
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