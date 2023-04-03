import { PieceType, TeamType } from "../Types";
import { Position } from "./Position";

export class Piece {
    image: string;
    position: Position;
    type: PieceType;
    team: TeamType;
    enPassant?: boolean;
    possibleMoves?: Position[];
    constructor(position: Position, type: PieceType, 
        team: TeamType) {
        this.image = `assets/images/${type}_${team}.png`;
        this.position = position;
        this.type = type;
        this.team = team;
    }

    isPawn() : boolean {
        return this.type === PieceType.PAWN;
    }

    isRook() : boolean {
        return this.type === PieceType.ROOK;
    }

    isKnight() : boolean {
        return this.type === PieceType.KNIGHT;
    }

    isBishop() : boolean {
        return this.type === PieceType.BISHOP;
    }

    isQueen() : boolean {
        return this.type === PieceType.QUEEN;
    }

    isKing() : boolean {
        return this.type === PieceType.KING;
    }

    samePiecePosition(otherPiece: Piece)  : boolean {
        return this.position.samePosition(otherPiece.position);
    }

    samePosition(otherPosition: Position) : boolean {
        return this.position.samePosition(otherPosition);
    }
}

