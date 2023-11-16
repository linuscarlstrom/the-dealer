import { PokerCard } from './pokerCard'

export class PokerDeck {
	#cards: string[] = []

	constructor() {
		this.#createDeck()
	}

	get cards(): string[] {
		return this.#cards
	}

	deal(amount: number): string[] {
		return this.#cards.splice(0, amount)
	}

	shuffle(): PokerDeck {
		// Don't shuffle the deck without all cards o.O
		if (this.#cards.length !== 52) this.#createDeck()

		// Fisher-Yates shuffle
		for (let i = this.#cards.length - 1; i > 0; i--) {
			// Generate a new index between 0 and the current index.
			// Previous indexes are already shuffled since we go backwards
			const newIndex = Math.floor(Math.random() * (i + 1))
			const currentCard = this.#cards[i]

			// Swap the current index with the new index
			this.#cards[i] = this.#cards[newIndex]
			this.#cards[newIndex] = currentCard
		}

		return this
	}

	#createDeck() {
		this.#cards = PokerCard.cardSuites
			.map(suite => {
				return PokerCard.cardValues.map(value => `${value}${suite}`)
			})
			.flat()
	}
}
