import { Piece, Position, samePosition, TeamType } from "../../Constants";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./GeneralRules";

export const rookMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    // MOVEMENT LOGIC FOR THE ROOK
    for (let i = 1; i < 8; i++) {
        if (desiredPosition.horizontalPosition === initialPosition.horizontalPosition) {
        // VERTICAL ROOK MOVEMENT
            let multiplier = (desiredPosition.verticalPosition > initialPosition.verticalPosition) ? 1 : -1;
            let passedPosition: Position = {horizontalPosition: initialPosition.horizontalPosition, verticalPosition: initialPosition.verticalPosition + (i*multiplier)};
            // Check if the tile is the destination tile
            if (samePosition(passedPosition, desiredPosition)) {
                // Dealing with destination tile
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true;
                }
            } else {
                // Dealing with passing tile
                if (tileIsOccupied(passedPosition, boardState)) {
                    break;
                }   
            }
        }
        if (desiredPosition.verticalPosition === initialPosition.verticalPosition) {
        // HORIZONTAL ROOK MOVEMENT
            let multiplier = (desiredPosition.horizontalPosition > initialPosition.horizontalPosition) ? 1 : -1;
            let passedPosition: Position = {horizontalPosition: initialPosition.horizontalPosition + (i*multiplier), verticalPosition: initialPosition.verticalPosition};
            // Check if the tile is the destination tile
            if (samePosition(passedPosition, desiredPosition)) {
                // Dealing with destination tile
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true;
                }
            } else {
                // Dealing with passing tile
                if (tileIsOccupied(passedPosition, boardState)) {
                    break;
                }   
            }
        }
    }
    return false;
}