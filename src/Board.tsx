import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import "./css/board.css";
import { PlayerDataValue } from "./Enums/PlayerDataValue";
import { Winner } from "./Winner";

export const Board = () => {
    const [data, setData] = useState(Array(8).fill(''));
    const [turn, setTurn] = useState<PlayerDataValue>(PlayerDataValue.X);
    const [winner, setWinner] = useState<string>("");
    let winPlayer: string = '';

    const board = useRef<HTMLInputElement>(null);

    /** Draw the pattern as Players Plays */
    const draw = (e: BaseSyntheticEvent, checkedBlock: number) => {
        if (!e.target.innerHTML && !winner) {
            setTurn(turn === PlayerDataValue.X ? PlayerDataValue.O : PlayerDataValue.X);
            e.target.innerHTML = turn;
            data[checkedBlock] = turn;
            setData(data);
        }
    }

    /** Check similar data pattern horizontally*/
    const checkValuesHorizontally = () => {
        for (let row: number = 0; row < 9; row += 3) {
            if (data[row] !== '') {
                if (data[row] === data[row + 2] && data[row + 2] === data[row + 1]) {
                    winPlayer = data[row]
                    return true
                }
            }
        }
    }

    /** Check similar data pattern vertically*/
    const checkValuesVertically = () => {
        for (let column: number = 0; column < 9; column += 1) {
            if (data[column] !== '') {
                if (data[column] === data[column + 3] && data[column + 6] === data[column + 3]) {
                    winPlayer = data[column];
                    return true
                }
            }
        }
    }

    /** Check similar data pattern left diagonally*/
    const checkValuesLeftDiaglonally = () => {
        for (let diagonal: number = 0; diagonal < 1; diagonal++) {
            if (data[diagonal] !== '') {
                if (data[diagonal] === data[diagonal + 4] && data[diagonal + 4] === data[diagonal + 8]) {
                    winPlayer = data[diagonal]
                    return true
                }
            }
        }
    }

    /** Check similar data pattern right diagonally*/
    const checkValuesRightDiagonally = () => {
        for (let diagonal: number = 2; diagonal < 3; diagonal++) {
            if (data[diagonal] !== '') {
                if (data[diagonal] === data[diagonal + 2] && data[diagonal] === data[diagonal + 4]) {
                    winPlayer = data[diagonal]
                    return true
                }
            }
        }
    }

    /** Reset the board for new match */
    const handleReset = () => {
        let cells: any = board.current?.children;
        data.forEach((cell, index) => {
            cells[index].innerHTML = '';
        })

        setData(Array(8).fill(''));
        setWinner("");
        setTurn(PlayerDataValue.X);
    }

    /** Check condition in board for similar pattern */
    const checkWin = () => {
        return checkValuesHorizontally() || checkValuesVertically() || checkValuesLeftDiaglonally() || checkValuesRightDiagonally()
    }

    useEffect(() => {
        if (checkWin()) {
            setWinner(winPlayer);
        } else {
            let totalfilledCells = data.filter((playerData) => playerData !== "")
            if (totalfilledCells.length === 9) {
                setWinner("It's a Tie");
            }
        }
    }, [turn])

    return (
        <>
            <div className="board" ref={board}>
                <div className="input input-1" onClick={(e) => draw(e, 0)}></div>
                <div className="input input-2" onClick={(e) => draw(e, 1)}></div>
                <div className="input input-3" onClick={(e) => draw(e, 2)}></div>
                <div className="input input-4" onClick={(e) => draw(e, 3)}></div>
                <div className="input input-5" onClick={(e) => draw(e, 4)}></div>
                <div className="input input-6" onClick={(e) => draw(e, 5)}></div>
                <div className="input input-7" onClick={(e) => draw(e, 6)}></div>
                <div className="input input-8" onClick={(e) => draw(e, 7)}></div>
                <div className="input input-9" onClick={(e) => draw(e, 8)}></div>
            </div>

            <Winner winner={winner} reset={() => handleReset()} />
        </>
    )
}