import { useEffect, useRef, useState } from "react";
import { initialBoard } from "../../Constants";
import { Piece, Position } from "../../models";
import { Board } from "../../models/Board";
import { Pawn } from "../../models/Pawn";
import { bishopMove, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves, kingMove, knightMove, pawnMove, queenMove, rookMove } from "../../referee/rules";
import { PieceType, TeamType } from "../../Types";
import Chessboard from "../Chessboard/Chessboard";

export default function Referee() {
    const [board, setBoard] = useState<Board>(initialBoard);
    const [promotionPawn, setPromotionPawn] = useState<Piece>();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        board.calculateAllMoves();
    }, []);

    function playMove(playedPiece: Piece, destination: Position) : boolean {
        // return if the playing piece doesn't have any moves
        if (playedPiece.possibleMoves === undefined) return false;

        // prevent inactive team from playing
        if (playedPiece.team === TeamType.OUR && 
            board.totalTurns % 2 !== 1) return false;

        if(playedPiece.team === TeamType.OPPONENT &&
            board.totalTurns % 2 !== 0) return false;

        let playedMoveIsValid = false;

        const validMove = playedPiece.possibleMoves?.some(m => m.samePosition(destination));

        if (!validMove) return false;
    
        const enPassantMove = isEnPassantMove(playedPiece.position, destination, playedPiece.type, playedPiece.team);

        // playMove modifies the board thus we need to call setBoard
        setBoard(() => {
            const clonedBoard = board.clone();
            clonedBoard.totalTurns += 1;
            // playing the move
            playedMoveIsValid = clonedBoard.playMove(enPassantMove, 
                validMove, playedPiece, 
                destination);

            return clonedBoard;
        })

        // this is for promoting a pawn
        let promotionRow = (playedPiece.team === TeamType.OUR) ? 7 : 0;

            if (destination.verticalPosition === promotionRow && playedPiece.isPawn) {
                modalRef.current?.classList.remove("hidden");
                setPromotionPawn((previousPromotionPawn) => {
                    const clonedPlayedPiece = playedPiece.clone();
                    clonedPlayedPiece.position = destination.clone();
                    return clonedPlayedPiece;
                });
            }
  
        return playedMoveIsValid;
    }

    function isEnPassantMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType) {
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (type === PieceType.PAWN) {
            if ((desiredPosition.horizontalPosition - initialPosition.horizontalPosition === -1 || desiredPosition.horizontalPosition - initialPosition.horizontalPosition === 1) && desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection) {
                const piece = board.pieces.find(
                    (p) => 
                        p.position.horizontalPosition === desiredPosition.horizontalPosition && 
                        p.position.verticalPosition === desiredPosition.verticalPosition - pawnDirection && 
                        p.isPawn && 
                        (p as Pawn).enPassant);
                if (piece) {
                    return true;
                }
            } 
        }

        return false;
    }

    function isValidMove(
        initialPosition: Position, 
        desiredPosition: Position, 
        type: PieceType, 
        team: TeamType
    ) {
        let validMove = false;
        switch(type) {
            case PieceType.PAWN:
                validMove = pawnMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.KNIGHT:
                validMove = knightMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.BISHOP:
                validMove = bishopMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.ROOK:
                validMove = rookMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.QUEEN:
                validMove = queenMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.KING:
                validMove = kingMove(initialPosition, desiredPosition, team, board.pieces);
        }
        return validMove;   
    }

    function promotePawn(pieceType: PieceType) {
        if (promotionPawn === undefined) {
            return;
        }

        setBoard((previousBoard) => {
            const clonedBoard = board.clone();
            clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(promotionPawn)) {
                    results.push(new Piece(piece.position.clone(), pieceType, 
                    piece.team, true));
                } else {
                    results.push(piece);
                }
    
                return results;
            }, [] as Piece[]);

            clonedBoard.calculateAllMoves();
            
            return clonedBoard;
        })

        modalRef.current?.classList.add("hidden")
    }

    function promotionTeamType() {
        return (promotionPawn?.team === TeamType.OUR) ? "w" : "b";
    }

    return (
    <>
    <p style={{color: "white", fontSize: "24px"}}>{board.totalTurns}</p>
        <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
                <div className="modal-body">
                    <img onClick={() => promotePawn(PieceType.ROOK)} src={`/assets/images/rook_${promotionTeamType()}.png`}/>
                    <img onClick={() => promotePawn(PieceType.KNIGHT)} src={`/assets/images/knight_${promotionTeamType()}.png`}/>
                    <img onClick={() => promotePawn(PieceType.BISHOP)} src={`/assets/images/bishop_${promotionTeamType()}.png`}/>
                    <img onClick={() => promotePawn(PieceType.QUEEN)} src={`/assets/images/queen_${promotionTeamType()}.png`}/>
                </div>
        </div>
        <Chessboard
                    playMove={playMove}
                    pieces={board.pieces}/>
    </>
    )
}