import type { PokerCard } from '#/lib/pokerCard'

export type CardSuite = '♠' | '♥' | '♦' | '♣'

export type CardValue = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A'

export type CardRankChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N'

export type HandRank = {
	rank: number
	rankName: string
	rankString: string
	bestHand: PokerCard[]
	kickers: PokerCard[]
}

export type RankedHands = {
	winner: 'handOne' | 'handTwo' | 'draw'
	winningHand: string
	winningCards: PokerCard[]
	ranks: {
		handOne: HandRank
		handTwo: HandRank
	}
}

export type RankHandsResponse = {
	winner: 'handOne' | 'handTwo' | 'draw'
	winningHand: string
	winningCards: string[]
	ranks: {
		hand: 'handOne' | 'handTwo'
		bestHand: string[]
		bestRank: string
	}[]
}

export type DrawHandsResponse = {
	handOne: string[]
	handTwo: string[]
}
