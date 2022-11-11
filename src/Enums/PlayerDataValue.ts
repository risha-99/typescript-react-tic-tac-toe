export enum GameMarkers {
  X = "X",
  O = "O",
  UNTOUCHED = ''
}

export type GameResults = GameMarkers | 'Its a tie';