import { PieceType, TeamType, Piece, Position } from "../Constants";

export default class Referee {
    tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {

        const piece = boardState.find(p => p.position.horizontalPosition === x && p.position.verticalPosition === y)
        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    tileIsOccupiedByOpponent(x: number, y: number, boardState: Piece[], team: TeamType): boolean {
        const piece = boardState.find((p) => p.position.horizontalPosition === x && p.position.verticalPosition === y && p.team !== team);

        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    isEnPassantMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState: Piece[]) {
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (type === PieceType.PAWN) {
            if ((desiredPosition.horizontalPosition - initialPosition.horizontalPosition === -1 || desiredPosition.horizontalPosition - initialPosition.horizontalPosition === 1) && desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection) {
                const piece = boardState.find(p => p.position.horizontalPosition === desiredPosition.horizontalPosition && p.position.verticalPosition === desiredPosition.verticalPosition - pawnDirection && p.enPassant);
                if (piece) {
                    return true;
                }
            } 
        }

        // CONDITIONS TO CHECK
        // if the attacking piece is a pawn DONE
        // upper left / upper right || bottom left / bottom right DONE
        // if a piece is under / above attacked tile DONE
        // if the attacked piece has moved two spaces at once in the previous turn and not the current one DONE

        // Put attacking piece in correct position
        // Remove en passanted piece

        return false;
    }


    isValidMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState: Piece[]) {
        // console.log("Referee is checking the move...");
        // console.log(`Previous location:(${px}, ${py})`)
        // console.log(`Current location:(${x}, ${y})`)
        // console.log(`Piece type: ${type}`)
        // console.log(`Team: ${team}`)

        if (type === PieceType.PAWN) {
            const specialRow = (team === TeamType.OUR) ? 1 : 6;
            const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

            // MOVEMENT LOGIC
            if (initialPosition.horizontalPosition === desiredPosition.horizontalPosition && initialPosition.verticalPosition === specialRow && desiredPosition.verticalPosition - initialPosition.verticalPosition === 2 * pawnDirection) {
                if (!this.tileIsOccupied(desiredPosition.horizontalPosition, desiredPosition.verticalPosition, boardState) && !this.tileIsOccupied(desiredPosition.horizontalPosition, desiredPosition.verticalPosition - pawnDirection, boardState)) {
                    return true;
                }
            } else if (initialPosition.horizontalPosition === desiredPosition.horizontalPosition && desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection) {
                if (!this.tileIsOccupied(desiredPosition.horizontalPosition, desiredPosition.verticalPosition, boardState)) {
                    return true;
                }
            }
            // ATTACKING LOGIC
            else if (desiredPosition.horizontalPosition - initialPosition.horizontalPosition === -1 && desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection) {
                // ATTACK IN UPPER OR BOTTOM LEFT CORNER
                console.log("upper / bottom left");
                if (this.tileIsOccupiedByOpponent(desiredPosition.horizontalPosition, desiredPosition.verticalPosition, boardState, team)) {
                    return true;
                }
            } else if (desiredPosition.horizontalPosition - initialPosition.horizontalPosition === 1 && desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection) {
                // ATTACK IN UPPER OR BOTTOM RIGHT CORNER
                console.log("upper / bottom right");
                if (this.tileIsOccupiedByOpponent(desiredPosition.horizontalPosition, desiredPosition.verticalPosition, boardState, team)) {
                    return true;
                }
            }
        }
        return false;
    }
}