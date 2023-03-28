import { Piece, Position, samePosition, TeamType } from "../../Constants";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

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

export const getPossibleBishopMoves = (bishop: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // top right movement
    for (let i = 1; i < 8; i++) {
        const topRightPath: Position = {horizontalPosition: bishop.position.horizontalPosition + i, verticalPosition: bishop.position.verticalPosition + i};

        if (!tileIsOccupied(topRightPath, boardState)) {
            possibleMoves.push(topRightPath);
        } else if (tileIsOccupiedByOpponent(topRightPath, boardState, bishop.team)) {
            possibleMoves.push(topRightPath);
            break;
        } else {
            break;
        }
    }

    // bottom right movement
    for (let i = 1; i < 8; i++) {
        const bottomRightPath: Position = {horizontalPosition: bishop.position.horizontalPosition + i, verticalPosition: bishop.position.verticalPosition - i};

        if (!tileIsOccupied(bottomRightPath, boardState)) {
            possibleMoves.push(bottomRightPath);
        } else if (tileIsOccupiedByOpponent(bottomRightPath, boardState, bishop.team)) {
            possibleMoves.push(bottomRightPath);
            break;
        } else {
            break;
        }
    }

    // top left movement
    for (let i = 1; i < 8; i++) {
        const topLeftMovement: Position = {horizontalPosition: bishop.position.horizontalPosition - i, verticalPosition: bishop.position.verticalPosition + i};

        if (!tileIsOccupied(topLeftMovement, boardState)) {
            possibleMoves.push(topLeftMovement);
        } else if (tileIsOccupiedByOpponent(topLeftMovement, boardState, bishop.team)) {
            possibleMoves.push(topLeftMovement);
            break;
        } else {
            break;
        }
    }

    // bottom left movement
    for (let i = 1; i < 8; i++) {
        const bottomLeftMovement: Position = {horizontalPosition: bishop.position.horizontalPosition - i, verticalPosition: bishop.position.verticalPosition - i};

        if (!tileIsOccupied(bottomLeftMovement, boardState)) {
            possibleMoves.push(bottomLeftMovement);
        } else if (tileIsOccupiedByOpponent(bottomLeftMovement, boardState, bishop.team)) {
            possibleMoves.push(bottomLeftMovement);
            break;
        } else {
            break;
        }
    }
    return possibleMoves;
}