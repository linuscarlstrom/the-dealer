import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { PokerHand } from './pokerHand'
import { PokerCard } from './pokerCard'

describe('PokerHand', () => {
	describe('constructor', () => {
		test('validates hand size', () => {
			// Arrange
			let hasThrown
			const cards = ['J♦', 'Q♦', 'K♦', 'T♦'].map(PokerCard.fromString)

			// Act
			try {
				const hand = new PokerHand(cards)
			} catch (_) {
				hasThrown = true
			}
			// Assert
			assert.ok(hasThrown)
		})
	})

	describe('rank', () => {
		test('rank royal flush hand', () => {
			// Arrange
			const cards = ['J♦', 'Q♦', 'A♦', 'K♦', 'T♦'].map(PokerCard.fromString)

			// Act
			const { ranking } = new PokerHand(cards)

			// Assert
			assert.equal(ranking.rankName, 'royal-flush')
		})

		test('rank four of a kind hand', () => {
			// Arrange
			const cards = ['6♦', '4♦', '6♠', '6♥', '6♣'].map(PokerCard.fromString)

			// Act
			const { ranking } = new PokerHand(cards)

			// Assert
			assert.equal(ranking.rankName, 'four-of-a-kind')
		})

		test('rank full house', () => {
			// Arrange
			const cards = ['6♦', '4♦', '6♠', '6♥', '4♣'].map(PokerCard.fromString)

			// Act
			const { ranking } = new PokerHand(cards)

			// Assert
			assert.equal(ranking.rankName, 'full-house')
		})

		test('rank flush hand', () => {
			// Arrange
			const cards = ['4♦', '3♦', 'K♦', 'J♦', '7♦'].map(PokerCard.fromString)

			// Act
			const { ranking } = new PokerHand(cards)

			// Assert
			assert.equal(ranking.rankName, 'flush')
		})

		test('rank steel wheel straight hand', () => {
			// Arrange
			const steelWheelCards = ['4♦', '3♠', '5♥', '2♦', 'A♣'].map(PokerCard.fromString)

			// Act
			const { ranking } = new PokerHand(steelWheelCards)

			// Assert
			assert.equal(ranking.rankName, 'straight')
		})

		test('rank straight hand', () => {
			// Arrange
			const cards = ['4♦', '3♠', '5♥', '6♦', '7♣'].map(PokerCard.fromString)

			// Act
			const { ranking } = new PokerHand(cards)

			// Assert
			assert.equal(ranking.rankName, 'straight')
		})

		test('rank three of a kind hand', () => {
			// Arrange
			const cards = ['4♦', 'K♠', 'K♥', '6♦', 'K♣'].map(PokerCard.fromString)

			// Act
			const { ranking } = new PokerHand(cards)

			// Assert
			assert.equal(ranking.rankName, 'three-of-a-kind')
		})

		test('rank two pair hand', () => {
			// Arrange
			const cards = ['A♦', 'K♠', 'K♥', '6♦', 'A♣'].map(PokerCard.fromString)

			// Act
			const { ranking } = new PokerHand(cards)

			// Assert
			assert.equal(ranking.rankName, 'two-pair')
		})

		test('rank one pair hand', () => {
			// Arrange
			const cards = ['J♦', 'K♠', 'K♥', '6♦', 'A♣'].map(PokerCard.fromString)

			// Act
			const { ranking } = new PokerHand(cards)

			// Assert
			assert.equal(ranking.rankName, 'one-pair')
		})

		test('rank high card hand', () => {
			// Arrange
			const cards = ['J♦', 'K♠', '3♥', '6♦', 'A♣'].map(PokerCard.fromString)

			// Act
			const { ranking } = new PokerHand(cards)

			// Assert
			assert.equal(ranking.rankName, 'high-card')
		})
	})
})
