import { PieceType, TeamType, Piece } from "../components/Chessboard/Chessboard";

export default class Referee {
    tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
        console.log("Checking if tile is occupied...")

        const piece = boardState.find(p => p.horizontalPosition === x && p.verticalPosition === y)
        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    isValidMove(px: number, py: number, x:number, y: number, type: PieceType, team: TeamType, boardState: Piece[]) {
        console.log("Referee is checking the move...");
        console.log(`Previous location:(${px}, ${py})`)
        console.log(`Current location:(${x}, ${y})`)
        console.log(`Piece type: ${type}`)
        console.log(`Team: ${team}`)

        if(type === PieceType.PAWN) {
            if (team === TeamType.OUR) {
                if (py === 1) {
                    if (px === x && y - py === 1) {
                        if (!this.tileIsOccupied(x, y, boardState)) {
                            return true;
                        }
                    } else if (px === x && y - py === 2) {
                        if (!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y-1, boardState)) {
                            return true;
                        }
                    }
                } else {
                    if (px === x && y - py === 1) {
                        if (!this.tileIsOccupied(x, y, boardState)) {
                            return true;
                        }
                    }
                }
            } else {
                if (py === 6) {
                    if (px === x && y - py === -1) {
                        if (!this.tileIsOccupied(x, y, boardState)) {
                        return true;
                        }
                    } else if (px === x && y - py === -2) {
                        if (!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y+1, boardState)) {
                            return true;
                        }
                    }
                } else {
                    if (px === x && (y - py === -1)) {
                        if (!this.tileIsOccupied(x, y, boardState)) {
                        return true; 
                        }
                    }
                }
            }
        }
        return false;
    }
}