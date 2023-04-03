import { Piece, Position } from "../../models";
import { Pawn } from "../../models/Pawn";
import { TeamType } from "../../Types";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";


export const pawnMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    const specialRow = (team === TeamType.OUR) ? 1 : 6;
    const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

    // MOVEMENT LOGIC FOR THE PAWN
    if (
        initialPosition.horizontalPosition === desiredPosition.horizontalPosition && 
        initialPosition.verticalPosition === specialRow && 
        desiredPosition.verticalPosition - initialPosition.verticalPosition === 2 * pawnDirection
    ) {
        if (
            !tileIsOccupied(desiredPosition, boardState) && 
            !tileIsOccupied(
                new Position(desiredPosition.horizontalPosition, desiredPosition.verticalPosition - pawnDirection),
                boardState
            )
        ) {
            return true;
        }
    } else if (
        initialPosition.horizontalPosition === desiredPosition.horizontalPosition && 
        desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection
    ) {
        if (!tileIsOccupied(desiredPosition, boardState)) {
            return true;
        }
    }
    // ATTACKING LOGIC
    else if (
        desiredPosition.horizontalPosition - initialPosition.horizontalPosition === -1 && 
        desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection
    ) {
        // ATTACK IN UPPER OR BOTTOM LEFT CORNER
        if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
            return true;
        }
    } else if (
        desiredPosition.horizontalPosition - initialPosition.horizontalPosition === 1 && 
        desiredPosition.verticalPosition - initialPosition.verticalPosition === pawnDirection
    ) {
        // ATTACK IN UPPER OR BOTTOM RIGHT CORNER
        if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
            return true;
        }
    }
    return false;
}

export const getPossiblePawnMoves = (pawn: Piece, boardState: Piece[]) : Position[] => {
    const possibleMoves: Position[] = [];

    const specialRow = pawn.team === TeamType.OUR ? 1 : 6;
    const pawnDirection = pawn.team === TeamType.OUR ? 1 : -1;

    const normalMove: Position = new Position(pawn.position.horizontalPosition, pawn.position.verticalPosition + pawnDirection);
    const specialMove: Position = new Position(normalMove.horizontalPosition, normalMove.verticalPosition + pawnDirection);
    const upperLeftAttack: Position = new Position(pawn.position.horizontalPosition - 1, pawn.position.verticalPosition + pawnDirection);
    const upperRightAttack: Position = new Position(pawn.position.horizontalPosition + 1, pawn.position.verticalPosition + pawnDirection);
    const leftPosition: Position = new Position(pawn.position.horizontalPosition - 1, pawn.position.verticalPosition);
    const rightPosition: Position = new Position(pawn.position.horizontalPosition + 1, pawn.position.verticalPosition);

    if (!tileIsOccupied(normalMove, boardState))
    {
        possibleMoves.push(normalMove)

        if (pawn.position.verticalPosition === specialRow &&
            !tileIsOccupied(specialMove, boardState))
            {
                possibleMoves.push(specialMove)
            }
    }

    if(tileIsOccupiedByOpponent(upperLeftAttack, boardState, pawn.team)) {
        possibleMoves.push(upperLeftAttack);
    } else if (!tileIsOccupied(upperLeftAttack, boardState)) {
        const leftPawn = boardState.find(p => p.samePosition(leftPosition));
        if (leftPawn != null && (leftPawn as Pawn).enPassant) {
            possibleMoves.push(upperLeftAttack);
        }
    }

    if(tileIsOccupiedByOpponent(upperRightAttack, boardState, pawn.team)) {
        possibleMoves.push(upperRightAttack);
    } else if (!tileIsOccupied(upperRightAttack, boardState)) {
        const rightPawn = boardState.find(p => p.samePosition(rightPosition));
        if (rightPawn != null && (rightPawn as Pawn).enPassant) {
            possibleMoves.push(upperRightAttack);
        }
    }

    return possibleMoves;
}