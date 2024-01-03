import { getCastlingMoves, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves } from "../referee/rules";
import { PieceType, TeamType } from "../Types";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Board {
    pieces: Piece[];
    totalTurns: number;
    
    constructor(pieces: Piece[], totalTurns: number) {
        this.pieces = pieces;
        this.totalTurns = totalTurns;
    }

    calculateAllMoves() {
        // calculate the moves of all pieces
        for (const piece of this.pieces) {
            piece.possibleMoves = this.getValidMoves(piece, this.pieces);
        }

        // calculate castling moves
        for (const king of this.pieces.filter(p => p.isKing)) {
            king.possibleMoves = getCastlingMoves(king, this.pieces);
        }

        // check if the current team moves are valid
        this.checkCurrentTeamMoves();

        // remove possible moves for inactive team
        for (const piece of this.pieces.filter(p => p.team !== this.activeTeam)) {
            piece.possibleMoves = [];
        }
    }

    get activeTeam() : TeamType {
        return this.totalTurns % 2 === 0 ? TeamType.OPPONENT : TeamType.OUR;
    }

    checkCurrentTeamMoves() {
        // loop through all the current team's pieces
        for (const piece of this.pieces.filter(p => p.team === this.activeTeam)) {
            if (piece.possibleMoves === undefined) continue;

            // simulate all the piece moves
            for (const move of piece.possibleMoves) {
                const simulatedBoard = this.clone();

                // remove the piece at the destination position
                simulatedBoard.pieces = simulatedBoard.pieces.filter(p => !p.samePosition(move));
                
                // get the piece of the cloned board
                const clonedPiece = simulatedBoard.pieces.find(p => p.samePiecePosition(piece))!;
                clonedPiece.position = move.clone();

                // get the king of the cloned board
                const clonedKing = simulatedBoard.pieces.find(p => p.isKing && p.team === simulatedBoard.activeTeam)!;

                // loop through all enemy pieces & update their possible moves
                // check if the active team king will be in danger
                for (const enemy of simulatedBoard.pieces.filter(p => p.team !== simulatedBoard.activeTeam)) {
                    enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);

                    if (enemy.isPawn) {
                        if (enemy.possibleMoves.some(m => m.horizontalPosition !== enemy.position.horizontalPosition && m.samePosition(clonedKing.position))) {
                        piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition(move));
                        }
                    } else {
                        if (enemy.possibleMoves.some(m => m.samePosition(clonedKing.position))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition(move));
                        }
                    }
                }
            }
        }
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
                    piece.hasMoved = true;
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
                    piece.hasMoved = true;
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
        return new Board(this.pieces.map((p) => p.clone()), 
        this.totalTurns);
    }
}