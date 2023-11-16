import { CardSuite, CardValue, CardRankChar } from '#/types'

export class PokerCard {
	static cardSuites: CardSuite[] = ['♠', '♥', '♦', '♣']
	static cardValues: CardValue[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

	#value: CardValue
	#suite: CardSuite

	constructor(value: CardValue, suite: CardSuite) {
		this.#value = value
		this.#suite = suite
	}

	static fromString(cardString: string) {
		const [value, suite] = cardString
		if (!PokerCard.#isCardValue(value)) throw new Error(`Invalid card value "${value}"`)
		if (!PokerCard.#isCardSuite(suite)) throw new Error(`Invalid card suite "${suite}"`)
		return new PokerCard(value, suite)
	}

	get suite() {
		return this.#suite
	}

	get value() {
		return this.#value
	}

	toString(): string {
		return `${this.#value}${this.#suite}`
	}

	toRankChar(): CardRankChar {
		// Returns a character value for the given card, i.e Ace = A (65), 2 = M (77)
		// This represents the card value as a character where A is highest and M/N is the lowest
		const cardValueIndex = PokerCard.cardValues.indexOf(this.#value)
		return String.fromCharCode(77 - cardValueIndex) as CardRankChar
	}

	static #isCardValue(cardValue: string): cardValue is CardValue {
		return PokerCard.cardValues.includes(cardValue as CardValue)
	}

	static #isCardSuite(cardSuite: string): cardSuite is CardSuite {
		return PokerCard.cardSuites.includes(cardSuite as CardSuite)
	}
}
