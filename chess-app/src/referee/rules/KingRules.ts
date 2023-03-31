import { samePosition, TeamType } from "../../Constants";
import { Piece, Position } from "../../models";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const kingMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    for (let i = 1; i < 2; i++) {

        let multiplierX = (desiredPosition.horizontalPosition < initialPosition.horizontalPosition) ? -1 : (desiredPosition.horizontalPosition > initialPosition.horizontalPosition) ? 1 : 0;

        let multiplierY = (desiredPosition.verticalPosition < initialPosition.verticalPosition) ? -1 : (desiredPosition.verticalPosition > initialPosition.verticalPosition) ? 1 : 0;

        let passedPosition = new Position(initialPosition.horizontalPosition + (i*multiplierX), initialPosition.verticalPosition + (i*multiplierY));
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

export const getPossibleKingMoves = (king: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // vertical path
    for (let i = 1; i < 2; i++) {
        const topPath = new Position(king.position.horizontalPosition, king.position.verticalPosition + i);

        if (!tileIsOccupied(topPath, boardState)) {
            possibleMoves.push(topPath);
        } else if (tileIsOccupiedByOpponent(topPath, boardState, king.team)) {
            possibleMoves.push(topPath);
            break;
        } else {
            break;
        }
    }

    for (let i = 1; i < 2; i++) {
        const bottomPath = new Position(king.position.horizontalPosition, king.position.verticalPosition - i);

        if (!tileIsOccupied(bottomPath, boardState)) {
            possibleMoves.push(bottomPath);
        } else if (tileIsOccupiedByOpponent(bottomPath, boardState, king.team)) {
            possibleMoves.push(bottomPath);
            break;
        } else {
            break;
        }
    }

    // horizontal path
    for (let i = 1; i < 2; i++) {
        const rightPath = new Position(king.position.horizontalPosition + i, king.position.verticalPosition);

        if (!tileIsOccupied(rightPath, boardState)) {
            possibleMoves.push(rightPath);
        } else if (tileIsOccupiedByOpponent(rightPath, boardState, king.team)) {
            possibleMoves.push(rightPath);
            break;
        } else {
            break;
        }
    }

    for (let i = 1; i < 2; i++) {
        const leftPath = new Position(king.position.horizontalPosition - i, king.position.verticalPosition);

        if (!tileIsOccupied(leftPath, boardState)) {
            possibleMoves.push(leftPath);
        } else if (tileIsOccupiedByOpponent(leftPath, boardState, king.team)) {
            possibleMoves.push(leftPath);
            break;
        } else {
            break;
        }
    }

    // top right path
    for (let i = 1; i < 2; i++) {
        const topRightPath = new Position(king.position.horizontalPosition + i, king.position.verticalPosition + i);

        if (!tileIsOccupied(topRightPath, boardState)) {
            possibleMoves.push(topRightPath);
        } else if (tileIsOccupiedByOpponent(topRightPath, boardState, king.team)) {
            possibleMoves.push(topRightPath);
            break;
        } else {
            break;
        }
    }

    // bottom right path
    for (let i = 1; i < 2; i++) {
        const bottomRightPath = new Position(king.position.horizontalPosition + i, king.position.verticalPosition - i);

        if (!tileIsOccupied(bottomRightPath, boardState)) {
            possibleMoves.push(bottomRightPath);
        } else if (tileIsOccupiedByOpponent(bottomRightPath, boardState, king.team)) {
            possibleMoves.push(bottomRightPath);
            break;
        } else {
            break;
        }
    }

    // top left path
    for (let i = 1; i < 2; i++) {
        const topLeftPath = new Position(king.position.horizontalPosition - i, king.position.verticalPosition + i);

        if (!tileIsOccupied(topLeftPath, boardState)) {
            possibleMoves.push(topLeftPath);
        } else if (tileIsOccupiedByOpponent(topLeftPath, boardState, king.team)) {
            possibleMoves.push(topLeftPath);
            break;
        } else {
            break;
        }
    }

    // bottom left path
    for (let i = 1; i < 2; i++) {
        const bottomLeftPath = new Position(king.position.horizontalPosition - i, king.position.verticalPosition - i);

        if (!tileIsOccupied(bottomLeftPath, boardState)) {
            possibleMoves.push(bottomLeftPath);
        } else if (tileIsOccupiedByOpponent(bottomLeftPath, boardState, king.team)) {
            possibleMoves.push(bottomLeftPath);
            break;
        } else {
            break;
        }
    }

    return possibleMoves;
}