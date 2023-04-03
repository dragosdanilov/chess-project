import { Piece, Position } from "../../models";
import { TeamType } from "../../Types";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const rookMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    // MOVEMENT LOGIC FOR THE ROOK
    for (let i = 1; i < 8; i++) {
        if (desiredPosition.horizontalPosition === initialPosition.horizontalPosition) {
        // VERTICAL ROOK MOVEMENT
            let multiplier = (desiredPosition.verticalPosition > initialPosition.verticalPosition) ? 1 : -1;
            let passedPosition = new Position(initialPosition.horizontalPosition, initialPosition.verticalPosition + (i*multiplier));
            // Check if the tile is the destination tile
            if (passedPosition.samePosition(desiredPosition)) {
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
            let passedPosition = new Position(initialPosition.horizontalPosition + (i*multiplier), initialPosition.verticalPosition);
            // Check if the tile is the destination tile
            if (passedPosition.samePosition(desiredPosition)) {
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

export const getPossibleRookMoves = (rook: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // vertical path
    for (let i = 1; i < 8; i++) {
        const topPath = new Position(rook.position.horizontalPosition, rook.position.verticalPosition + i);

        if (!tileIsOccupied(topPath, boardState)) {
            possibleMoves.push(topPath);
        } else if (tileIsOccupiedByOpponent(topPath, boardState, rook.team)) {
            possibleMoves.push(topPath);
            break;
        } else {
            break;
        }
    }

    for (let i = 1; i < 8; i++) {
        const bottomPath = new Position(rook.position.horizontalPosition, rook.position.verticalPosition - i);

        if (!tileIsOccupied(bottomPath, boardState)) {
            possibleMoves.push(bottomPath);
        } else if (tileIsOccupiedByOpponent(bottomPath, boardState, rook.team)) {
            possibleMoves.push(bottomPath);
            break;
        } else {
            break;
        }
    }

    // horizontal path
    for (let i = 1; i < 8; i++) {
        const rightPath = new Position(rook.position.horizontalPosition + i, rook.position.verticalPosition);

        if (!tileIsOccupied(rightPath, boardState)) {
            possibleMoves.push(rightPath);
        } else if (tileIsOccupiedByOpponent(rightPath, boardState, rook.team)) {
            possibleMoves.push(rightPath);
            break;
        } else {
            break;
        }
    }

    for (let i = 1; i < 8; i++) {
        const leftPath = new Position(rook.position.horizontalPosition - i, rook.position.verticalPosition);

        if (!tileIsOccupied(leftPath, boardState)) {
            possibleMoves.push(leftPath);
        } else if (tileIsOccupiedByOpponent(leftPath, boardState, rook.team)) {
            possibleMoves.push(leftPath);
            break;
        } else {
            break;
        }
    }


    return possibleMoves;
}

