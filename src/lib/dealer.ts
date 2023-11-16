import { RankedHands } from '#/types'

import { PokerCard } from './pokerCard'
import { PokerHand } from './pokerHand'

export class Dealer {
	static rankHands(handA: PokerHand, handB: PokerHand): RankedHands {
		if (handA.ranking.rank !== handB.ranking.rank) {
			return this.#crowWinnerByRank(handA, handB)
		}

		if (handA.ranking.rankString === handB.ranking.rankString) {
			return this.#crowDraw(handA, handB)
		}

		// The hands have the same rank so we need to determine the winner
		// by highest card or by looking at the kickers.
		let useKicker = handA.ranking.bestHand[0].toRankChar() === handB.ranking.bestHand[0].toRankChar()
		if (useKicker) {
			return this.#crowWinnerByKicker(handA, handB)
		}

		return this.#crowWinnerByHighestCards(handA, handB)
	}

	static #crowWinnerByRank(handA: PokerHand, handB: PokerHand): RankedHands {
		const winner = handA.ranking.rank < handB.ranking.rank ? 'handOne' : 'handTwo'
		const winningHand = winner === 'handOne' ? handA.ranking.rankName : handB.ranking.rankName
		const winningCards = winner === 'handOne' ? handA.ranking.bestHand : handB.ranking.bestHand
		return { winner, winningHand, winningCards, ranks: { handOne: handA.ranking, handTwo: handB.ranking } }
	}

	static #crowDraw(handA: PokerHand, handB: PokerHand): RankedHands {
		return {
			winner: 'draw',
			winningHand: '',
			winningCards: [],
			ranks: { handOne: handA.ranking, handTwo: handB.ranking }
		}
	}

	static #crowWinnerByKicker(handA: PokerHand, handB: PokerHand): RankedHands {
		let winner = <RankedHands['winner']>''
		let winningKicker = <PokerCard>{}
		for (const [i, handAKicker] of handA.ranking.kickers.entries()) {
			const handBKicker = handB.ranking.kickers?.[i]
			const handBKickerChar = handBKicker?.toRankChar()
			const handAKickerChar = handAKicker.toRankChar()
			if (handAKickerChar === handBKickerChar) {
				continue
			}

			winner = handAKickerChar < handBKickerChar ? 'handOne' : 'handTwo'
			winningKicker = winner === 'handOne' ? handAKicker : handBKicker
			break
		}

		const winningHand = winner === 'handOne' ? handA.ranking.rankName : handB.ranking.rankName + '-with-kicker'
		const winningCards = winner === 'handOne' ? handA.ranking.bestHand : handB.ranking.bestHand

		// Add the used kicker to the hand
		winningCards.push(winningKicker)

		return { winner, winningHand, winningCards, ranks: { handOne: handA.ranking, handTwo: handB.ranking } }
	}

	static #crowWinnerByHighestCards(handA: PokerHand, handB: PokerHand): RankedHands {
		const winner = handA.ranking.rankString < handB.ranking.rankString ? 'handOne' : 'handTwo'
		const winningHand = winner === 'handOne' ? handA.ranking.rankName : handB.ranking.rankName
		const winningCards = winner === 'handOne' ? handA.ranking.bestHand : handB.ranking.bestHand
		return { winner, winningHand, winningCards, ranks: { handOne: handA.ranking, handTwo: handB.ranking } }
	}
}
