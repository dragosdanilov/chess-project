import { Piece, Position, TeamType } from "../../Constants";
import { tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const knightMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    // MOVEMENT LOGIC FOR THE KNIGHT
    // 8 different moving patterns

    for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
            // TOP & BOTTOM LINE MOVEMENT
            if (desiredPosition.verticalPosition - initialPosition.verticalPosition === 2 * i) {
                if (desiredPosition.horizontalPosition - initialPosition.horizontalPosition === j) {
                    if (tileIsEmptyOrOccupiedByOpponent(
                        desiredPosition, 
                        boardState, 
                        team)
                    ) {
                    return true;
                    }
                }
            }
            // RIGHT & LEFT LINE MOVEMENT
            if (desiredPosition.horizontalPosition - initialPosition.horizontalPosition === 2 * i) {
                if (desiredPosition.verticalPosition - initialPosition.verticalPosition === j) {
                    if (tileIsEmptyOrOccupiedByOpponent(
                        desiredPosition, 
                        boardState, 
                        team)
                    ) {
                    return true;
                    }
                }
            }
        }
    }
    return false;
}

export const getPossibleKnightMoves = (knight: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];
    for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
            const verticalMove: Position = {horizontalPosition: knight.position.horizontalPosition + j, verticalPosition: knight.position.verticalPosition + i * 2};
            const horizontalMove: Position = {horizontalPosition: knight.position.horizontalPosition + i * 2, verticalPosition: knight.position.verticalPosition + j};

            if (tileIsEmptyOrOccupiedByOpponent(verticalMove, boardState, knight.team)) {
                possibleMoves.push(verticalMove);
            }

            if (tileIsEmptyOrOccupiedByOpponent(horizontalMove, boardState, knight.team)) {
                possibleMoves.push(horizontalMove);
            }
        }
    }
    return possibleMoves;
}