export class Position {
    horizontalPosition: number;
    verticalPosition: number;
    constructor(horizontalPosition: number, verticalPosition: number) {
        this.horizontalPosition = horizontalPosition;
        this.verticalPosition = verticalPosition;
    }

    samePosition(otherPosition: Position) : boolean {
        return this.horizontalPosition === otherPosition.horizontalPosition && this.verticalPosition === otherPosition.verticalPosition
    }
}