import { Piece, Position, samePosition, TeamType } from "../../Constants";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./GeneralRules";

export const queenMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    // MOVEMENT LOGIC FOR THE QUEEN
    for (let i = 1; i < 8; i++) {

        let multiplierX = (desiredPosition.horizontalPosition < initialPosition.horizontalPosition) ? -1 : (desiredPosition.horizontalPosition > initialPosition.horizontalPosition) ? 1 : 0;

        let multiplierY = (desiredPosition.verticalPosition < initialPosition.verticalPosition) ? -1 : (desiredPosition.verticalPosition > initialPosition.verticalPosition) ? 1 : 0;

        let passedPosition: Position = {horizontalPosition: initialPosition.horizontalPosition + (i*multiplierX), verticalPosition: initialPosition.verticalPosition + (i*multiplierY)};
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
    return false;
}