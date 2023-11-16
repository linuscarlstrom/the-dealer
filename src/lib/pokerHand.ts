import { CardRankChar, HandRank } from '#/types'
import type { PokerCard } from './pokerCard'

export class PokerHand {
	#hand: PokerCard[]
	#pairs: number[]
	#rankString: string[]
	#bestHand: PokerCard[] = []
	#kickers: PokerCard[] = []

	constructor(hand: PokerCard[]) {
		if (hand.length !== 5) throw new Error('Invalid hand size')

		let groupedByRank = <Record<CardRankChar, PokerCard[]>>{}
		for (const card of hand) {
			const rankChar = card.toRankChar()
			groupedByRank[rankChar] ||= []
			groupedByRank[rankChar].push(card)
		}

		this.#pairs = Object.values(groupedByRank)
			.filter(cards => cards.length > 1)
			.map(cards => cards.length)

		// Order hand value by amount of pairs then alphabetic order
		hand.sort((a, b) => {
			const rankCharA = a.toRankChar()
			const rankCharB = b.toRankChar()

			const pairs = groupedByRank[rankCharB].length - groupedByRank[rankCharA].length
			if (pairs) return pairs

			return rankCharB > rankCharA ? -1 : rankCharB === rankCharA ? 0 : 1
		})

		this.#hand = hand
		this.#rankString = hand.map(card => card.toRankChar())
	}

	get ranking(): HandRank {
		if (this.#isRoyalFlush()) return this.#createRank(1, 'royal-flush')
		if (this.#isFourOfAKind()) return this.#createRank(2, 'four-of-a-kind')
		if (this.#isFullHouse()) return this.#createRank(3, 'full-house')
		if (this.#isFlush()) return this.#createRank(4, 'flush')
		if (this.#isStraight()) return this.#createRank(5, 'straight')
		if (this.#isThreeOfAKind()) return this.#createRank(6, 'three-of-a-kind')
		if (this.#isTwoPair()) return this.#createRank(7, 'two-pair')
		if (this.#isOnePair()) return this.#createRank(8, 'one-pair')

		this.#bestHand = [...this.#hand.slice(0, 1)]
		this.#kickers = [...this.#hand.slice(1)]
		return this.#createRank(9, 'high-card')
	}

	#createRank(rank: number, rankName: string): HandRank {
		return { rank, rankName, rankString: this.#rankString.join(''), bestHand: this.#bestHand, kickers: this.#kickers }
	}

	#isRoyalFlush(): boolean {
		if (!this.#isFlush() || !this.#isStraight() || this.#hand[0].value !== 'A') {
			return false
		}

		this.#bestHand = [...this.#hand]
		return true
	}

	#isFourOfAKind(): boolean {
		if (!this.#pairs.includes(4)) {
			return false
		}

		this.#bestHand = this.#hand.slice(0, 4)
		this.#kickers = this.#hand.slice(4)
		return true
	}

	#isFullHouse(): boolean {
		if (this.#pairs.length !== 2 || !this.#pairs.includes(3)) {
			return false
		}

		this.#bestHand = [...this.#hand]
		return true
	}

	#isFlush(): boolean {
		const sortedSuites = this.#hand.map(card => card.suite).sort()
		if (sortedSuites[0] !== sortedSuites[4]) {
			return false
		}

		this.#bestHand = [...this.#hand]
		return true
	}

	#isStraight(): boolean {
		const isStraight = this.#rankString.every((char, index) => {
			if (!index) return true
			const previousChar = this.#rankString[index - 1]
			return String.fromCharCode(previousChar.charCodeAt(0) + 1) === char
		})

		if (isStraight) {
			this.#bestHand = [...this.#hand]
			return true
		}

		// Steel wheel straight needs to rank Ace as one
		const steelWheelStraight = this.#rankString.join('') === 'AJKLM'
		if (steelWheelStraight) {
			this.#bestHand = [...this.#hand.slice(4), ...this.#hand.slice(0, 4)]
			return true
		}

		return false
	}

	#isThreeOfAKind(): boolean {
		if (this.#pairs.length !== 1 || !this.#pairs.includes(3)) {
			return false
		}

		this.#bestHand = this.#hand.slice(0, 3)
		this.#kickers = this.#hand.slice(3)
		return true
	}

	#isTwoPair(): boolean {
		if (this.#pairs.length !== 2 || !this.#pairs.includes(2)) {
			return false
		}

		this.#bestHand = this.#hand.slice(0, 4)
		this.#kickers = this.#hand.slice(4)
		return true
	}

	#isOnePair(): boolean {
		if (this.#pairs.length !== 1 || !this.#pairs.includes(2)) {
			return false
		}

		this.#bestHand = this.#hand.slice(0, 2)
		this.#kickers = this.#hand.slice(2)
		return true
	}
}
