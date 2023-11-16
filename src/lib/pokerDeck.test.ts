import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { PokerDeck } from './pokerDeck'

describe('PokerDeck', () => {
	describe('getters', () => {
		test('cards', () => {
			// Arrange
			// Act
			const pokerDeck = new PokerDeck()
			const spadeSuite = pokerDeck.cards.filter(card => card.endsWith('♠'))
			const heartSuite = pokerDeck.cards.filter(card => card.endsWith('♥'))
			const diamondSuite = pokerDeck.cards.filter(card => card.endsWith('♦'))
			const cloverSuite = pokerDeck.cards.filter(card => card.endsWith('♣'))

			// Assert
			assert.equal(pokerDeck.cards.length, 52)
			assert.equal(spadeSuite.length, 13)
			assert.equal(heartSuite.length, 13)
			assert.equal(diamondSuite.length, 13)
			assert.equal(cloverSuite.length, 13)
		})
	})

	describe('deal', () => {
		test('deal cards and removes them from the deck', () => {
			// Arrange
			const amount = 5
			const pokerDeck = new PokerDeck()

			// Act
			const dealtCards = pokerDeck.deal(amount)

			// Assert
			assert.equal(dealtCards.length, amount)
			assert.equal(pokerDeck.cards.length, 52 - amount)
		})
	})

	describe('shuffle', () => {
		test('take back all cards before shuffle', () => {
			// Arrange
			const pokerDeck = new PokerDeck()
			pokerDeck.deal(5)

			// Act
			pokerDeck.shuffle()

			// Assert
			assert.equal(pokerDeck.cards.length, 52)
		})

		test('shuffles the deck of cards', () => {
			// Arrange
			const pokerDeck = new PokerDeck()
			const unShuffledCards = [...pokerDeck.cards]

			// Act
			pokerDeck.shuffle()

			// Assert
			assert.notDeepEqual(unShuffledCards, pokerDeck.cards)
		})
	})
})
