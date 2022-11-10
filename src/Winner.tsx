export interface WinnerReset {
    winner: string,
    reset(): void
}

export const Winner = (props: WinnerReset) => {
    return (<>
        <div className="reset-winner">
            <button> Winner :  {props.winner ? ` ${props.winner}` : ''} </button>
            <button onClick={props.reset}>  Reset </button>
        </div></>)
}