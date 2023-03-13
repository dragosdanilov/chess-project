export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
    image: string;
    horizontalPosition: number;
    verticalPosition: number;
    type: PieceType;
    team: TeamType;
    enPassant?: boolean;
}

export enum PieceType {
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
}

export enum TeamType {
    OPPONENT,
    OUR
}

export const initialBoardState: Piece[] = [
    {
        image: 'assets/images/rook_b.png',
        horizontalPosition: 0,
        verticalPosition: 7,
        type: PieceType.ROOK,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/knight_b.png',
        horizontalPosition: 1,
        verticalPosition: 7,
        type: PieceType.KNIGHT,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/bishop_b.png',
        horizontalPosition: 2,
        verticalPosition: 7,
        type: PieceType.BISHOP,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/queen_b.png',
        horizontalPosition: 3,
        verticalPosition: 7,
        type: PieceType.QUEEN,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/king_b.png',
        horizontalPosition: 4,
        verticalPosition: 7,
        type: PieceType.KING,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/bishop_b.png',
        horizontalPosition: 5,
        verticalPosition: 7,
        type: PieceType.BISHOP,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/knight_b.png',
        horizontalPosition: 6,
        verticalPosition: 7,
        type: PieceType.KNIGHT,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/rook_b.png',
        horizontalPosition: 7,
        verticalPosition: 7,
        type: PieceType.ROOK,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/pawn_b.png',
        horizontalPosition: 0,
        verticalPosition: 6,
        type: PieceType.PAWN,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/pawn_b.png',
        horizontalPosition: 1,
        verticalPosition: 6,
        type: PieceType.PAWN,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/pawn_b.png',
        horizontalPosition: 2,
        verticalPosition: 6,
        type: PieceType.PAWN,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/pawn_b.png',
        horizontalPosition: 3,
        verticalPosition: 6,
        type: PieceType.PAWN,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/pawn_b.png',
        horizontalPosition: 4,
        verticalPosition: 6,
        type: PieceType.PAWN,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/pawn_b.png',
        horizontalPosition: 5,
        verticalPosition: 6,
        type: PieceType.PAWN,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/pawn_b.png',
        horizontalPosition: 6,
        verticalPosition: 6,
        type: PieceType.PAWN,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/pawn_b.png',
        horizontalPosition: 7,
        verticalPosition: 6,
        type: PieceType.PAWN,
        team: TeamType.OPPONENT,
    },
    {
        image: 'assets/images/rook_w.png',
        horizontalPosition: 0,
        verticalPosition: 0,
        type: PieceType.ROOK,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/knight_w.png',
        horizontalPosition: 1,
        verticalPosition: 0,
        type: PieceType.KNIGHT,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/bishop_w.png',
        horizontalPosition: 2,
        verticalPosition: 0,
        type: PieceType.BISHOP,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/queen_w.png',
        horizontalPosition: 3,
        verticalPosition: 0,
        type: PieceType.QUEEN,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/king_w.png',
        horizontalPosition: 4,
        verticalPosition: 0,
        type: PieceType.KING,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/bishop_w.png',
        horizontalPosition: 5,
        verticalPosition: 0,
        type: PieceType.BISHOP,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/knight_w.png',
        horizontalPosition: 6,
        verticalPosition: 0,
        type: PieceType.KNIGHT,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/rook_w.png',
        horizontalPosition: 7,
        verticalPosition: 0,
        type: PieceType.ROOK,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/pawn_w.png',
        horizontalPosition: 0,
        verticalPosition: 1,
        type: PieceType.PAWN,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/pawn_w.png',
        horizontalPosition: 1,
        verticalPosition: 1,
        type: PieceType.PAWN,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/pawn_w.png',
        horizontalPosition: 2,
        verticalPosition: 1,
        type: PieceType.PAWN,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/pawn_w.png',
        horizontalPosition: 3,
        verticalPosition: 1,
        type: PieceType.PAWN,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/pawn_w.png',
        horizontalPosition: 4,
        verticalPosition: 1,
        type: PieceType.PAWN,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/pawn_w.png',
        horizontalPosition: 5,
        verticalPosition: 1,
        type: PieceType.PAWN,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/pawn_w.png',
        horizontalPosition: 6,
        verticalPosition: 1,
        type: PieceType.PAWN,
        team: TeamType.OUR,
    },
    {
        image: 'assets/images/pawn_w.png',
        horizontalPosition: 7,
        verticalPosition: 1,
        type: PieceType.PAWN,
        team: TeamType.OUR,
    },
    
];