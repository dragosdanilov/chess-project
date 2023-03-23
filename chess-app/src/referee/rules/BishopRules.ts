import { Piece, Position, samePosition, TeamType } from "../../Constants";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./GeneralRules";

export const bishopMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    // MOVEMENT LOGIC FOR THE BISHOP
        
    for (let i = 1; i < 8; i++) {
        // Top-right movement
        if (desiredPosition.horizontalPosition > initialPosition.horizontalPosition && desiredPosition.verticalPosition > initialPosition.verticalPosition) {
            let passedPosition: Position = {horizontalPosition: initialPosition.horizontalPosition + i, verticalPosition: initialPosition.verticalPosition + i};
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

        // Bottom-right movement
        if (desiredPosition.horizontalPosition > initialPosition.horizontalPosition && desiredPosition.verticalPosition < initialPosition.verticalPosition) {
            let passedPosition: Position = {horizontalPosition: initialPosition.horizontalPosition + i, verticalPosition: initialPosition.verticalPosition - i};
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

        // Bottom-left movement
        if (desiredPosition.horizontalPosition < initialPosition.horizontalPosition && desiredPosition.verticalPosition < initialPosition.verticalPosition) {
            let passedPosition: Position = {horizontalPosition: initialPosition.horizontalPosition - i, verticalPosition: initialPosition.verticalPosition - i};
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

        // Top-left movement
        if (desiredPosition.horizontalPosition < initialPosition.horizontalPosition && desiredPosition.verticalPosition > initialPosition.verticalPosition) {
            let passedPosition: Position = {horizontalPosition: initialPosition.horizontalPosition - i, verticalPosition: initialPosition.verticalPosition + i};
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