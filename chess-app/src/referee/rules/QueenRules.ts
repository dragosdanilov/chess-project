import { Piece, Position } from "../../models";
import { TeamType } from "../../Types";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const queenMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    // MOVEMENT LOGIC FOR THE QUEEN
    for (let i = 1; i < 8; i++) {

        let multiplierX = (desiredPosition.horizontalPosition < initialPosition.horizontalPosition) ? -1 : (desiredPosition.horizontalPosition > initialPosition.horizontalPosition) ? 1 : 0;

        let multiplierY = (desiredPosition.verticalPosition < initialPosition.verticalPosition) ? -1 : (desiredPosition.verticalPosition > initialPosition.verticalPosition) ? 1 : 0;

        let passedPosition = new Position(initialPosition.horizontalPosition + (i*multiplierX), initialPosition.verticalPosition + (i*multiplierY));
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
    return false;
}

export const getPossibleQueenMoves = (queen: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // vertical path
    for (let i = 1; i < 8; i++) {
        const topPath = new Position(queen.position.horizontalPosition, queen.position.verticalPosition + i);

        if (!tileIsOccupied(topPath, boardState)) {
            possibleMoves.push(topPath);
        } else if (tileIsOccupiedByOpponent(topPath, boardState, queen.team)) {
            possibleMoves.push(topPath);
            break;
        } else {
            break;
        }
    }

    for (let i = 1; i < 8; i++) {
        const bottomPath = new Position(queen.position.horizontalPosition, queen.position.verticalPosition - i);

        if (!tileIsOccupied(bottomPath, boardState)) {
            possibleMoves.push(bottomPath);
        } else if (tileIsOccupiedByOpponent(bottomPath, boardState, queen.team)) {
            possibleMoves.push(bottomPath);
            break;
        } else {
            break;
        }
    }

    // horizontal path
    for (let i = 1; i < 8; i++) {
        const rightPath = new Position(queen.position.horizontalPosition + i, queen.position.verticalPosition);

        if (!tileIsOccupied(rightPath, boardState)) {
            possibleMoves.push(rightPath);
        } else if (tileIsOccupiedByOpponent(rightPath, boardState, queen.team)) {
            possibleMoves.push(rightPath);
            break;
        } else {
            break;
        }
    }

    for (let i = 1; i < 8; i++) {
        const leftPath = new Position(queen.position.horizontalPosition - i, queen.position.verticalPosition);

        if (!tileIsOccupied(leftPath, boardState)) {
            possibleMoves.push(leftPath);
        } else if (tileIsOccupiedByOpponent(leftPath, boardState, queen.team)) {
            possibleMoves.push(leftPath);
            break;
        } else {
            break;
        }
    }

    // top right path
    for (let i = 1; i < 8; i++) {
        const topRightPath = new Position(queen.position.horizontalPosition + i, queen.position.verticalPosition + i);

        if (!tileIsOccupied(topRightPath, boardState)) {
            possibleMoves.push(topRightPath);
        } else if (tileIsOccupiedByOpponent(topRightPath, boardState, queen.team)) {
            possibleMoves.push(topRightPath);
            break;
        } else {
            break;
        }
    }

    // bottom right path
    for (let i = 1; i < 8; i++) {
        const bottomRightPath = new Position(queen.position.horizontalPosition + i, queen.position.verticalPosition - i);

        if (!tileIsOccupied(bottomRightPath, boardState)) {
            possibleMoves.push(bottomRightPath);
        } else if (tileIsOccupiedByOpponent(bottomRightPath, boardState, queen.team)) {
            possibleMoves.push(bottomRightPath);
            break;
        } else {
            break;
        }
    }

    // top left path
    for (let i = 1; i < 8; i++) {
        const topLeftPath = new Position(queen.position.horizontalPosition - i, queen.position.verticalPosition + i);

        if (!tileIsOccupied(topLeftPath, boardState)) {
            possibleMoves.push(topLeftPath);
        } else if (tileIsOccupiedByOpponent(topLeftPath, boardState, queen.team)) {
            possibleMoves.push(topLeftPath);
            break;
        } else {
            break;
        }
    }

    // bottom left path
    for (let i = 1; i < 8; i++) {
        const bottomLeftPath = new Position(queen.position.horizontalPosition - i, queen.position.verticalPosition - i);

        if (!tileIsOccupied(bottomLeftPath, boardState)) {
            possibleMoves.push(bottomLeftPath);
        } else if (tileIsOccupiedByOpponent(bottomLeftPath, boardState, queen.team)) {
            possibleMoves.push(bottomLeftPath);
            break;
        } else {
            break;
        }
    }
    return possibleMoves;
}