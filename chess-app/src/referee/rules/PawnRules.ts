import { Piece, Position, TeamType } from "../../Constants";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";


export const pawnMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    const specialRow = (team === TeamType.OUR) ? 1 : 6;
    const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

    // MOVEMENT LOGIC FOR THE PAWN
    if (
        initialPosition.horizontalPosition === desiredPosition.horizontalPosition && 
        initialPosition.verticalPosition === specialRow && 
        desiredPosition.verticalPosition - initialPosition.verticalPosition === 2 * pawnDirection
    ) {
        if (
            !tileIsOccupied(desiredPosition, boardState) && 
            !tileIsOccupied(
                {horizontalPosition: desiredPosition.horizontalPosition, verticalPosition: desiredPosition.verticalPosition - pawnDirection},
                boardState
            )
        ) {
            return true;
        }
    } else if (
        initialPosition.horizontalPosition === desiredPosition.horizontalPosition && 
        desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection
    ) {
        if (!tileIsOccupied(desiredPosition, boardState)) {
            return true;
        }
    }
    // ATTACKING LOGIC
    else if (
        desiredPosition.horizontalPosition - initialPosition.horizontalPosition === -1 && 
        desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection
    ) {
        // ATTACK IN UPPER OR BOTTOM LEFT CORNER
        if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
            return true;
        }
    } else if (
        desiredPosition.horizontalPosition - initialPosition.horizontalPosition === 1 && 
        desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection
    ) {
        // ATTACK IN UPPER OR BOTTOM RIGHT CORNER
        if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
            return true;
        }
    }
    return false;
}