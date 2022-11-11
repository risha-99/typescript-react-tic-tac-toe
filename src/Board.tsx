import { useEffect, useRef, useState } from "react";
import "./css/board.css";
import { GameMarkers, GameResults } from "./Enums/PlayerDataValue";
import { Winner } from "./Winner";

const newGrid = () => {
    return Array.from(Array(3), () => new Array(3).fill(GameMarkers.UNTOUCHED))
}

export const Board = () => {
    const [grid, setGrid] = useState<GameMarkers[][]>(newGrid());    
    const [activePlayer, setActivePlayer] = useState(GameMarkers.X);
    const [winner, setWinner] = useState<GameResults>(GameMarkers.UNTOUCHED);

    const drawMark = (rowIndex: number, columnIndex: number) => {
        if (grid[rowIndex][columnIndex] !== GameMarkers.UNTOUCHED) {
            return;
        }

        if(winner === GameMarkers.O || winner === GameMarkers.X){
            return;
        }

        setGrid((previousGrid) => {
            const newGrid = [...previousGrid];
            newGrid[rowIndex][columnIndex] = activePlayer;
            return newGrid;
        });

        setActivePlayer(previousActivePlayer => {
            return previousActivePlayer === GameMarkers.X ? GameMarkers.O : GameMarkers.X;
        })
    }

    const checkForWin = (): GameMarkers => {

        let winner = GameMarkers.UNTOUCHED;

        grid.forEach((row, rowIndex) => {
            // Check win horizontally
            if (row[0] !== GameMarkers.UNTOUCHED && row[0] === row[1] && row[1] === row[2]) {
                winner = row[0];
            }

            // Check win vertically
            if (grid[0][rowIndex] === grid[1][rowIndex] && grid[1][rowIndex] === grid[2][rowIndex]) {
                if (grid[0][rowIndex] !== GameMarkers.UNTOUCHED) {
                    winner = grid[0][rowIndex];
                }
            }
        })

        // Check win Diagonally
        if ((grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) || grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
            if (grid[1][1] !== GameMarkers.UNTOUCHED) {
                winner = grid[1][1];
            }
        }
        return winner;
    }

    const handleReset = () => {
        setGrid(newGrid());
        setActivePlayer(GameMarkers.X);
        setWinner(GameMarkers.UNTOUCHED);
    }

    useEffect(() => {
        const winner = checkForWin();
        if (winner !== GameMarkers.UNTOUCHED) {
            setWinner(winner);
        }else {
            const touchedMarkerCount = grid.flat().filter(marker => marker !== GameMarkers.UNTOUCHED).length;
            if(touchedMarkerCount === 9){
                setWinner('Its a tie');
            }
        }
    }, [grid])

    return (
        <>
            <div className="grid-container">
                {
                    grid.map((row, rowIndex) => (
                        row.map((column, columnIndex) => (
                            <div key={rowIndex + columnIndex} onClick={() => drawMark(rowIndex, columnIndex)} className="grid-item">{grid[rowIndex][columnIndex]}</div>
                        ))
                    ))
                }
            </div>

            <Winner winner={winner} reset={() => handleReset()} />
        </>
    )
}