import React, { useRef, useState } from "react";
import './Chessboard.css';
import Tile from "../Tile/Tile";
import Referee from "../../referee/Referee"; 
import {verticalAxis, horizontalAxis, gridSize, Piece, PieceType, TeamType, initialBoardState, Position, samePosition} from "../../Constants";

export default function Chessboard() {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [promotionPawn, setPromotionPawn] = useState<Piece>();
    const [grabPosition, setGrabPosition] = useState<Position>({horizontalPosition: -1, verticalPosition: -1})
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const chessboardRef = useRef<HTMLDivElement>(null);
    const referee = new Referee();

    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;
        if(element.classList.contains("chess-piece") && chessboard) {
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / gridSize)
            const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / gridSize))
            setGrabPosition({horizontalPosition: grabX, verticalPosition: grabY});
            const x = e.clientX - gridSize/2;
            const y = e.clientY - gridSize/2;
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
            } else if (y > maxY) {
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
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / gridSize);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / gridSize));

            const currentPiece = pieces.find(
                (p) => samePosition (p.position, grabPosition)
            );

            if (currentPiece) {
                const validMove = referee.isValidMove(grabPosition, {horizontalPosition: x, verticalPosition: y}, currentPiece.type, currentPiece.team, pieces);

                // REDUCE FUNCTION
                // RESULTS => Array of results
                // PIECE => The current piece we are handling

                const isEnPassantMove = referee.isEnPassantMove(grabPosition, {horizontalPosition: x, verticalPosition: y}, currentPiece.type, currentPiece.team, pieces
                )

                const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

                if(isEnPassantMove) {
                    const updatedPieces = pieces.reduce((results, piece) => {
                        if (
                            samePosition(piece.position, grabPosition)
                        ) {
                            piece.enPassant = false;
                            piece.position.horizontalPosition = x;
                            piece.position.verticalPosition = y;
                            results.push(piece);
                        } else if (!(samePosition(piece.position, {horizontalPosition: x, verticalPosition: y-pawnDirection}))) {
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

                    const updatedPieces = pieces.reduce((results, piece) => {

                        if (
                            samePosition(piece.position, grabPosition)
                        ) {
                            // SPECIAL MOVE
                            piece.enPassant = 
                                Math.abs(grabPosition.verticalPosition - y) === 2 && 
                                piece.type === PieceType.PAWN;
                                
                            piece.position.horizontalPosition = x;
                            piece.position.verticalPosition = y;

                            let promotionRow = (piece.team === TeamType.OUR) ? 7 : 0;

                            if (y === promotionRow) {
                                setPromotionPawn(piece);
                            }
                            results.push(piece);
                        } else if (!(samePosition(piece.position, {horizontalPosition: x, verticalPosition: y}))) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece);
                        }

                        return results;
                    }, [] as Piece[]);

                    setPieces(updatedPieces);

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

    function promotePawn(pieceType: PieceType) {
        console.log(`Promoting pawn into ${pieceType}`);
        console.log(promotionPawn);
    }

    let board = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const tileNumber = j + i + 2;
            const piece = pieces.find(
                (p) => samePosition(p.position, {horizontalPosition: i, verticalPosition: j})
            );
            let image = piece ? piece.image : undefined;

            board.push(<Tile key={`${j},${i}`} image={image} number={tileNumber} />);
        }
    }
    return (
        <>
            <div id="pawn-promotion-modal">
                <img onClick={() => promotePawn(PieceType.ROOK)} src="/assets/images/rook_w.png"/>
                <img onClick={() => promotePawn(PieceType.KNIGHT)} src="/assets/images/knight_w.png"/>
                <img onClick={() => promotePawn(PieceType.BISHOP)} src="/assets/images/bishop_w.png"/>
                <img onClick={() => promotePawn(PieceType.QUEEN)} src="/assets/images/queen_w.png"/>
            </div>
            <div 
                onMouseMove={(e) => movePiece(e)} 
                onMouseDown={(e) => grabPiece(e)} 
                onMouseUp={(e) => dropPiece(e)}
                id="chessboard"
                ref={chessboardRef}
            >
                {board}
            </div>
        </>
    );
}