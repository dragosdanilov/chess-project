import { Piece } from "./models/Piece";

export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const gridSize = 100;

export function samePosition(p1: Position, p2: Position) {
    return p1.horizontalPosition === p2.horizontalPosition && p1.verticalPosition === p2.verticalPosition
}

export interface Position {
    horizontalPosition: number;
    verticalPosition: number;
}

export enum PieceType {
    PAWN = 'pawn',
    BISHOP = 'bishop',
    KNIGHT = 'knight',
    ROOK = 'rook',
    QUEEN = 'queen',
    KING = 'king'
}

export enum TeamType {
    OPPONENT = 'b',
    OUR = 'w'
}

export const initialBoardState: Piece[] = [
    new Piece( 
    {horizontalPosition: 0, verticalPosition: 7}, 
    PieceType.ROOK, 
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 1, verticalPosition: 7}, 
    PieceType.KNIGHT,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 2, verticalPosition: 7}, 
    PieceType.BISHOP,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 3, verticalPosition: 7}, 
    PieceType.QUEEN,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 4, verticalPosition: 7}, 
    PieceType.KING,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 5, verticalPosition: 7}, 
    PieceType.BISHOP,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 6, verticalPosition: 7}, 
    PieceType.KNIGHT,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 7, verticalPosition: 7}, 
    PieceType.ROOK,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 0, verticalPosition: 6}, 
    PieceType.PAWN,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 1, verticalPosition: 6}, 
    PieceType.PAWN,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 2, verticalPosition: 6}, 
    PieceType.PAWN,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 3, verticalPosition: 6}, 
    PieceType.PAWN,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 4, verticalPosition: 6}, 
    PieceType.PAWN,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 5, verticalPosition: 6}, 
    PieceType.PAWN,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 6, verticalPosition: 6}, 
    PieceType.PAWN,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 7, verticalPosition: 6}, 
    PieceType.PAWN,
    TeamType.OPPONENT),

    new Piece( 
    {horizontalPosition: 0, verticalPosition: 0}, 
    PieceType.ROOK, 
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 1, verticalPosition: 0}, 
    PieceType.KNIGHT,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 2, verticalPosition: 0}, 
    PieceType.BISHOP,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 3, verticalPosition: 0}, 
    PieceType.QUEEN,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 4, verticalPosition: 0}, 
    PieceType.KING,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 5, verticalPosition: 0}, 
    PieceType.BISHOP,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 6, verticalPosition: 0}, 
    PieceType.KNIGHT,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 7, verticalPosition: 0}, 
    PieceType.ROOK,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 0, verticalPosition: 1}, 
    PieceType.PAWN,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 1, verticalPosition: 1}, 
    PieceType.PAWN,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 2, verticalPosition: 1}, 
    PieceType.PAWN,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 3, verticalPosition: 1}, 
    PieceType.PAWN,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 4, verticalPosition: 1}, 
    PieceType.PAWN,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 5, verticalPosition: 1}, 
    PieceType.PAWN,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 6, verticalPosition: 1}, 
    PieceType.PAWN,
    TeamType.OUR),

    new Piece( 
    {horizontalPosition: 7, verticalPosition: 1}, 
    PieceType.PAWN,
    TeamType.OUR),
];