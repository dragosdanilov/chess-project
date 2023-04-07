import { getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves } from "../referee/rules";
import { PieceType, TeamType } from "../Types";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Board {
    pieces: Piece[];
    
    constructor(pieces: Piece[]) {
        this.pieces = pieces;
    }

    calculateAllMoves() {
        // calculate the moves of all pieces
        for (const piece of this.pieces) {
            piece.possibleMoves = this.getValidMoves(piece, this.pieces);
        }

        const king = this.pieces.find(p => p.isKing && p.team === TeamType.OPPONENT);

        if (king?.possibleMoves === undefined) return;

        const originalKingPosition = king.position.clone();
        // simulate king moves
        for (const move of king.possibleMoves) {
            king.position = move;

            let safe = true;

            // determine if the move is safe
            for (const p of this.pieces) {
                if (p.team === TeamType.OPPONENT) continue;
                if (p.isPawn) {
                    const possiblePawnMoves = this.getValidMoves(p, this.pieces);

                    if (possiblePawnMoves?.some(ppm => ppm.horizontalPosition !== p.position.horizontalPosition && ppm.samePosition(move))) {
                        safe = false;
                    }
                } else if (p.possibleMoves?.some(p => p.samePosition(move))) {
                    safe = false;
                }
            }

            // remove the move from possibleMoves
            if (!safe) {
                king.possibleMoves = king.possibleMoves?.filter(m => !m.samePosition(move))
            }
        }
        king.position = originalKingPosition;
    }

    getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
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

    playMove(enPassantMove: boolean, 
        validMove: boolean,
        playedPiece: Piece,
        destination: Position) : boolean {

        const pawnDirection = playedPiece.team === TeamType.OUR ? 1 : -1;

        if(enPassantMove) {
            this.pieces = this.pieces.reduce((results, piece) => {
                if (
                    piece.samePiecePosition(playedPiece)
                ) {
                    if (piece.isPawn)
                        (piece as Pawn).enPassant = false;
                    piece.position.horizontalPosition = destination.horizontalPosition;
                    piece.position.verticalPosition = destination.verticalPosition;
                    results.push(piece);
                } else if (
                    !(piece.samePosition(new Position(destination.horizontalPosition, destination.verticalPosition - pawnDirection)))
                ) {
                    if (piece.isPawn) {
                        (piece as Pawn).enPassant = false;
                    }
                    results.push(piece);
                }
                return results;
            }, [] as Piece[]);

            this.calculateAllMoves();
        } else if (validMove) {
            // UPDATES THE PIECE POSITION
            // REMOVES ATTACKED PIECES

            this.pieces = this.pieces.reduce((results, piece) => {

                if (
                    // piece that we are currently moving
                    piece.samePiecePosition(playedPiece)
                ) {
                    // SPECIAL MOVE
                    if (piece.isPawn)
                        (piece as Pawn).enPassant = 
                            Math.abs(playedPiece.position.verticalPosition - destination.verticalPosition) === 2 && 
                            piece.type === PieceType.PAWN;
                            
                    piece.position.horizontalPosition = destination.horizontalPosition;
                    piece.position.verticalPosition = destination.verticalPosition;

                    results.push(piece);
                } else if (!piece.samePosition(destination)) {
                    if (piece.isPawn) {
                        (piece as Pawn).enPassant = false;
                    }
                    results.push(piece);
                }

                // the piece at the destination location won't be pushed in the results

                return results;
            }, [] as Piece[]);

            this.calculateAllMoves();
        } else {
            return false;
        }

        return true;
    }

    clone(): Board {
        return new Board(this.pieces.map((p) => p.clone()));
    }
}