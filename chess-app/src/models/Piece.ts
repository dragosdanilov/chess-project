import { PieceType, Position, TeamType } from "../Constants";

export class Piece {
    image: string;
    position: Position;
    type: PieceType;
    team: TeamType;
    enPassant?: boolean;
    possibleMoves?: Position[];
    constructor(image: string, position: Position, 
        type: PieceType, team: TeamType) {
        this.image = image; //'assets/images/rook_b.png';
        this.position = position;
        this.type = type;
        this.team = team;
    }
}