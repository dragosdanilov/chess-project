import { useEffect, useRef, useState } from "react";
import { initialBoardState, Piece, PieceType, Position, TeamType, samePosition } from "../../Constants";
import { bishopMove, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves, kingMove, knightMove, pawnMove, queenMove, rookMove } from "../../referee/rules";
import Chessboard from "../Chessboard/Chessboard";

export default function Referee() {
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const [promotionPawn, setPromotionPawn] = useState<Piece>();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        updatePossibleMoves();
    }, [])
    function updatePossibleMoves() {
        setPieces((currentPieces) => {
            return currentPieces.map(p => {
                p.possibleMoves = getValidMoves(p, currentPieces);
                return p;
            });
        });
    }

    function playMove(playedPiece: Piece, destination: Position) : boolean {
        const validMove = isValidMove(playedPiece.position, destination, playedPiece.type, playedPiece.team);

            // REDUCE FUNCTION
            // RESULTS => Array of results
            // PIECE => The current piece we are handling

            const enPassantMove = isEnPassantMove(playedPiece.position, destination, playedPiece.type, playedPiece.team)

            const pawnDirection = playedPiece.team === TeamType.OUR ? 1 : -1;

            if(enPassantMove) {
                const updatedPieces = pieces.reduce((results, piece) => {
                    if (
                        samePosition(piece.position, playedPiece.position)
                    ) {
                        piece.enPassant = false;
                        piece.position.horizontalPosition = destination.horizontalPosition;
                        piece.position.verticalPosition = destination.verticalPosition;
                        results.push(piece);
                    } else if (
                        !(samePosition(piece.position, {horizontalPosition: destination.horizontalPosition, verticalPosition: destination.verticalPosition - pawnDirection}))
                    ) {
                        if (piece.type === PieceType.PAWN) {
                            piece.enPassant = false;
                        }
                        results.push(piece);
                    }
                    return results;
                }, [] as Piece[])

                updatePossibleMoves();
                setPieces(updatedPieces);
            } else if (validMove) {
                // UPDATES THE PIECE POSITION
                // REMOVES ATTACKED PIECES

                const updatedPieces = pieces.reduce((results, piece) => {

                    if (
                        samePosition(piece.position, playedPiece.position)
                    ) {
                        // SPECIAL MOVE
                        piece.enPassant = 
                            Math.abs(playedPiece.position.verticalPosition - destination.verticalPosition) === 2 && 
                            piece.type === PieceType.PAWN;
                                
                        piece.position.horizontalPosition = destination.horizontalPosition;
                        piece.position.verticalPosition = destination.verticalPosition;

                        let promotionRow = (piece.team === TeamType.OUR) ? 7 : 0;

                        if (destination.verticalPosition === promotionRow && piece.type === PieceType.PAWN) {
                            modalRef.current?.classList.remove("hidden");
                            setPromotionPawn(piece);
                        }
                        results.push(piece);
                    } else if (!(samePosition(piece.position, {horizontalPosition: destination.horizontalPosition, verticalPosition: destination.verticalPosition}))) {
                        if (piece.type === PieceType.PAWN) {
                            piece.enPassant = false;
                        }
                        results.push(piece);
                    }

                    return results;
                }, [] as Piece[]);

                updatePossibleMoves();
                setPieces(updatedPieces);
            } else {
                return false;
            }
            return true;
    }

    function isEnPassantMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType) {
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (type === PieceType.PAWN) {
            if ((desiredPosition.horizontalPosition - initialPosition.horizontalPosition === -1 || desiredPosition.horizontalPosition - initialPosition.horizontalPosition === 1) && desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection) {
                const piece = pieces.find(p => p.position.horizontalPosition === desiredPosition.horizontalPosition && p.position.verticalPosition === desiredPosition.verticalPosition - pawnDirection && p.enPassant);
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
                validMove = pawnMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.KNIGHT:
                validMove = knightMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.BISHOP:
                validMove = bishopMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.ROOK:
                validMove = rookMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.QUEEN:
                validMove = queenMove(initialPosition, desiredPosition, team, pieces);
                break;
            case PieceType.KING:
                validMove = kingMove(initialPosition, desiredPosition, team, pieces);
        }
        return validMove;   
    }

    function getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
        switch(piece.type) 
        {
            case PieceType.PAWN:
                return getPossiblePawnMoves(piece, boardState);
            case PieceType.KNIGHT:
                return getPossibleKnightMoves(piece, boardState);
            case PieceType.BISHOP:
                return getPossibleBishopMoves(piece, boardState);
            case PieceType.ROOK:
                return getPossibleRookMoves(piece, boardState);
            case PieceType.QUEEN:
                return getPossibleQueenMoves(piece, boardState);
            case PieceType.KING:
                return getPossibleKingMoves(piece, boardState);
            default:
                return[];
        }
    }

    function promotePawn(pieceType: PieceType) {
        if (promotionPawn === undefined) {
            return;
        }
        const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, promotionPawn.position)) {
                piece.type = pieceType;
                const teamType = (piece.team === TeamType.OUR) ? "w" : "b"
                let image = "";
                switch(pieceType) {
                    case PieceType.ROOK: {
                        image = "rook";
                        break;
                    }
                    case PieceType.KNIGHT: {
                        image = "knight";
                        break;

                    }
                    case PieceType.BISHOP: {
                        image = "bishop";
                        break;
                    }
                    case PieceType.QUEEN: {
                        image = "queen";
                    }
                }
                piece.image = `assets/images/${image}_${teamType}.png`;
            }

            results.push(piece);
            return results;
        }, [] as Piece[])

        setPieces(updatedPieces);

        modalRef.current?.classList.add("hidden")
    }

    function promotionTeamType() {
        return (promotionPawn?.team === TeamType.OUR) ? "w" : "b";
    }

    return (
    <>
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
                    pieces={pieces}/>
    </>
    )
}