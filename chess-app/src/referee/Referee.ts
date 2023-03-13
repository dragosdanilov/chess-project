import { PieceType, TeamType, Piece } from "../components/Chessboard/Chessboard";

export default class Referee {
    tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {

        const piece = boardState.find(p => p.horizontalPosition === x && p.verticalPosition === y)
        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    tileIsOccupiedByOpponent(x: number, y: number, boardState: Piece[], team: TeamType): boolean {
        const piece = boardState.find((p) => p.horizontalPosition === x && p.verticalPosition === y && p.team !== team);

        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    isEnPassantMove(px: number, py: number, x:number, y: number, type: PieceType, team: TeamType, boardState: Piece[]) {
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (type === PieceType.PAWN) {
            if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
                const piece = boardState.find(p => p.horizontalPosition === x && p.verticalPosition === y - pawnDirection && p.enPassant);
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


    isValidMove(px: number, py: number, x:number, y: number, type: PieceType, team: TeamType, boardState: Piece[]) {
        // console.log("Referee is checking the move...");
        // console.log(`Previous location:(${px}, ${py})`)
        // console.log(`Current location:(${x}, ${y})`)
        // console.log(`Piece type: ${type}`)
        // console.log(`Team: ${team}`)

        if (type === PieceType.PAWN) {
            const specialRow = (team === TeamType.OUR) ? 1 : 6;
            const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

            // MOVEMENT LOGIC
            if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
                if (!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y - pawnDirection, boardState)) {
                    return true;
                }
            } else if (px === x && y - py === pawnDirection) {
                if (!this.tileIsOccupied(x, y, boardState)) {
                    return true;
                }
            }
            // ATTACKING LOGIC
            else if (x - px === -1 && y - py === pawnDirection) {
                // ATTACK IN UPPER OR BOTTOM LEFT CORNER
                console.log("upper / bottom left");
                if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
                    return true;
                }
            } else if (x - px === 1 && y - py === pawnDirection) {
                // ATTACK IN UPPER OR BOTTOM RIGHT CORNER
                console.log("upper / bottom right");
                if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
                    return true;
                }
            }
        }
        return false;
    }
}