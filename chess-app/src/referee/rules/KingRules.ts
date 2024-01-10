import { Piece, Position } from "../../models";
import { TeamType } from "../../Types";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const kingMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    for (let i = 1; i < 2; i++) {

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

export const getPossibleKingMoves = (king: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // vertical path
    for (let i = 1; i < 2; i++) {
        const topPath = new Position(king.position.horizontalPosition, king.position.verticalPosition + i);

        // if the move is outside of the board do not add it
        if(topPath.horizontalPosition < 0 || topPath.horizontalPosition > 7 || topPath.verticalPosition < 0 || topPath.verticalPosition > 7) {
            break;
        }

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

        // if the move is outside of the board do not add it
        if(bottomPath.horizontalPosition < 0 || bottomPath.horizontalPosition > 7 || bottomPath.verticalPosition < 0 || bottomPath.verticalPosition > 7) {
            break;
        }

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

        // if the move is outside of the board do not add it
        if(rightPath.horizontalPosition < 0 || rightPath.horizontalPosition > 7 || rightPath.verticalPosition < 0 || rightPath.verticalPosition > 7) {
            break;
        }

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

        // if the move is outside of the board do not add it
        if(leftPath.horizontalPosition < 0 || leftPath.horizontalPosition > 7 || leftPath.verticalPosition < 0 || leftPath.verticalPosition > 7) {
            break;
        }

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

        // if the move is outside of the board do not add it
        if(topRightPath.horizontalPosition < 0 || topRightPath.horizontalPosition > 7 || topRightPath.verticalPosition < 0 || topRightPath.verticalPosition > 7) {
            break;
        }

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

        // if the move is outside of the board do not add it
        if(bottomRightPath.horizontalPosition < 0 || bottomRightPath.horizontalPosition > 7 || bottomRightPath.verticalPosition < 0 || bottomRightPath.verticalPosition > 7) {
            break;
        }

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

        // if the move is outside of the board do not add it
        if(topLeftPath.horizontalPosition < 0 || topLeftPath.horizontalPosition > 7 || topLeftPath.verticalPosition < 0 || topLeftPath.verticalPosition > 7) {
            break;
        }

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

        // if the move is outside of the board do not add it
        if(bottomLeftPath.horizontalPosition < 0 || bottomLeftPath.horizontalPosition > 7 || bottomLeftPath.verticalPosition < 0 || bottomLeftPath.verticalPosition > 7) {
            break;
        }

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

// in this method the enemy moves have already been calculated
export const getCastlingMoves = (king: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = []; 

    if(king.hasMoved) return possibleMoves;

    // get the rooks from the king's team which haven't moved
    const rooks = boardState.filter(p => p.isRook 
        && p.team === king.team 
        && !p.hasMoved)

        // loop through the rooks
        for(const rook of rooks) {
            // determine if we need to go to the right or the left side
            const direction = (rook.position.horizontalPosition - king.position.horizontalPosition > 0) ? 1 : -1;

            const adjacentPosition = king.position.clone();
            adjacentPosition.horizontalPosition += direction;

            if(!rook.possibleMoves?.some(m => m.samePosition(adjacentPosition))) continue;

            // we know that the rook can move to the adjacent side of the king

            const attackedTiles = rook.possibleMoves.filter(m => m.verticalPosition === king.position.verticalPosition);

            // check if any enemy piece can attack the spaces between
            // the rook and the king
            const enemyPieces = boardState.filter(p => p.team !== king.team);

            let valid = true;

            for(const enemy of enemyPieces) {
                if(enemy.possibleMoves === undefined) continue;

                for(const move of enemy.possibleMoves) {
                    if(attackedTiles.some(t => t.samePosition(move))) {
                        valid = false;
                    }

                    if(!valid) 
                        break;
                }
                if(!valid)
                    break;
            }

            // alternative version:
            // if(enemyPieces.some(p => p.possibleMoves?.some(m =>  
            // attackedTiles.some(t => t.samePosition(m))))) continue;

            if(!valid) continue;

            // add it as a possible move for the king
            possibleMoves.push(rook.position.clone());
        }

    return possibleMoves;
}