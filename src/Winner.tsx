import { GameMarkers, GameResults } from "./Enums/PlayerDataValue"

export interface WinnerReset {
    winner: GameResults,
    reset(): void
}

export const Winner = (props: WinnerReset) => {
    return (<>
        <div className="reset-winner">
            <button> Winner :  {props.winner ? ` ${props.winner}` : ''} </button>
            <button onClick={props.reset}>  Reset </button>
        </div></>)
}