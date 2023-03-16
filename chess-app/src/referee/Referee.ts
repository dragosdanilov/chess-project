import { PieceType, TeamType, Piece, Position, samePosition } from "../Constants";

export default class Referee {
    tileIsEmptyOrOccupiedByOpponent(
        position: Position, 
        boardState: Piece[], 
        team: TeamType
    ) {
        return (
            !this.tileIsOccupied(position, boardState) || 
            this.tileIsOccupiedByOpponent(position, boardState, team)
        );
    }

    tileIsOccupied(position: Position, boardState: Piece[]): boolean {

        const piece = boardState.find(
            (p) => samePosition(p.position, position)
            );
        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    tileIsOccupiedByOpponent(position: Position, boardState: Piece[], team: TeamType): boolean {
        const piece = boardState.find(
            (p) => samePosition(p.position, position) && p.team !== team);

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

            // MOVEMENT LOGIC FOR THE PAWN
            if (
                initialPosition.horizontalPosition === desiredPosition.horizontalPosition && 
                initialPosition.verticalPosition === specialRow && 
                desiredPosition.verticalPosition - initialPosition.verticalPosition === 2 * pawnDirection
            ) {
                if (
                    !this.tileIsOccupied(
                        desiredPosition,
                        boardState
                    ) && 
                    !this.tileIsOccupied(
                        {horizontalPosition: desiredPosition.horizontalPosition, verticalPosition: desiredPosition.verticalPosition - pawnDirection},
                        boardState
                    )
                ) {
                    return true;
                }
            } else if (initialPosition.horizontalPosition === desiredPosition.horizontalPosition && desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection) {
                if (!this.tileIsOccupied(desiredPosition, boardState)) {
                    return true;
                }
            }
            // ATTACKING LOGIC
            else if (desiredPosition.horizontalPosition - initialPosition.horizontalPosition === -1 && desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection) {
                // ATTACK IN UPPER OR BOTTOM LEFT CORNER
                console.log("upper / bottom left");
                if (this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
                    return true;
                }
            } else if (desiredPosition.horizontalPosition - initialPosition.horizontalPosition === 1 && desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection) {
                // ATTACK IN UPPER OR BOTTOM RIGHT CORNER
                console.log("upper / bottom right");
                if (this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
                    return true;
                }
            }
        } else if (type === PieceType.KNIGHT) {
            // MOVEMENT LOGIC FOR THE KNIGHT
            // 8 different moving patterns

            for (let i = -1; i < 2; i += 2) {
                for (let j = -1; j < 2; j += 2) {
                    // TOP & BOTTOM LINE MOVEMENT
                    if (desiredPosition.verticalPosition - initialPosition.verticalPosition === 2 * i) {
                        if (desiredPosition.horizontalPosition - initialPosition.horizontalPosition === j) {
                            if (this.tileIsEmptyOrOccupiedByOpponent(
                                desiredPosition, 
                                boardState, 
                                team)
                            ) {
                            return true;
                            }
                        }
                    }
                    // RIGHT & LEFT LINE MOVEMENT
                    if (desiredPosition.horizontalPosition - initialPosition.horizontalPosition === 2 * i) {
                        if (desiredPosition.verticalPosition - initialPosition.verticalPosition === j) {
                            if (this.tileIsEmptyOrOccupiedByOpponent(
                                desiredPosition, 
                                boardState, 
                                team)
                            ) {
                            return true;
                            }
                        }
                    }
                }
            }
        } else if (type === PieceType.BISHOP) {
            // MOVEMENT LOGIC FOR THE BISHOP

            // Top-right movement
            for (let i = 1; i < 8; i++) {
                if (desiredPosition.horizontalPosition -  initialPosition.horizontalPosition === i && desiredPosition.verticalPosition - initialPosition.verticalPosition === i) {
                    console.log(`Moving top right ${i} tile(s)`)
                    break;
                }
            }

            // Bottom-right movement
            for (let i = 1; i < 8; i++) {
                if (desiredPosition.horizontalPosition -  initialPosition.horizontalPosition === i && desiredPosition.verticalPosition - initialPosition.verticalPosition === -i) {
                    console.log(`Moving bottom right ${i} tile(s)`)
                    break;
                }
            }

            // Bottom-left movement
            for (let i = 1; i < 8; i++) {
                if (desiredPosition.horizontalPosition -  initialPosition.horizontalPosition === -i && desiredPosition.verticalPosition - initialPosition.verticalPosition === -i) {
                    console.log(`Moving bottom left ${i} tile(s)`)
                    break;
                }
            }

            // Top-left movement
            for (let i = 1; i < 8; i++) {
                if (desiredPosition.horizontalPosition -  initialPosition.horizontalPosition === -i && desiredPosition.verticalPosition - initialPosition.verticalPosition === i) {
                    console.log(`Moving top left ${i} tile(s)`)
                    break;
                }
            }
        }
        return false;
    }
}