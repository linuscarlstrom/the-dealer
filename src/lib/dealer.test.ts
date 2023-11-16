import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { PokerHand } from '.'
import { Dealer } from './dealer'
import { PokerCard } from './pokerCard'

describe('Dealer', () => {
	describe('rankHands', () => {
		test('pick winning hand based on rank', () => {
			// Arrange
			const handOneCards = ['J♠', 'T♥', 'J♥', 'Q♠', '6♥'].map(PokerCard.fromString)
			const handTwoCards = ['J♣', '3♠', '6♦', 'Q♣', '4♣'].map(PokerCard.fromString)
			const handOne = new PokerHand(handOneCards)
			const handTwo = new PokerHand(handTwoCards)

			// Act
			const rankings = Dealer.rankHands(handOne, handTwo)

			// Assert
			assert.equal(rankings.winner, 'handOne')
		})

		test('return a draw when hands are equal', () => {
			// Arrange
			const handOneCards = ['J♠', 'T♥', 'J♥', 'T♣', 'A♥'].map(PokerCard.fromString)
			const handTwoCards = ['J♣', 'T♠', 'J♦', 'T♦', 'A♣'].map(PokerCard.fromString)
			const handOne = new PokerHand(handOneCards)
			const handTwo = new PokerHand(handTwoCards)

			// Act
			const rankings = Dealer.rankHands(handOne, handTwo)

			// Assert
			assert.equal(rankings.winner, 'draw')
		})

		test('pick a winner based on highest value for the same rank', () => {
			// Arrange
			const handOneCards = ['2♠', '3♥', '4♥', '5♣', '6♥'].map(PokerCard.fromString)
			const handTwoCards = ['4♣', '5♠', '6♦', '7♦', '8♣'].map(PokerCard.fromString)
			const handOne = new PokerHand(handOneCards)
			const handTwo = new PokerHand(handTwoCards)

			// Act
			const rankings = Dealer.rankHands(handOne, handTwo)

			// Assert
			assert.equal(rankings.winner, 'handTwo')
		})

		test('pick a winner based on kicker the same rank', () => {
			// Arrange
			const handOneCards = ['K♠', 'K♥', '9♥', '5♣', '6♥'].map(PokerCard.fromString)
			const handTwoCards = ['K♣', 'K♦', '9♦', '7♦', '8♣'].map(PokerCard.fromString)
			const handOne = new PokerHand(handOneCards)
			const handTwo = new PokerHand(handTwoCards)

			// Act
			const rankings = Dealer.rankHands(handOne, handTwo)

			// Assert
			assert.equal(rankings.winner, 'handTwo')
			assert.equal(rankings.winningHand, 'one-pair-with-kicker')
		})
	})
})
