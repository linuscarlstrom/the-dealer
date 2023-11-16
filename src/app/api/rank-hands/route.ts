import { NextRequest, NextResponse } from 'next/server'
import { PokerHand, PokerCard, Dealer } from '#/lib'
import { RankHandsResponse, RankedHands } from '#/types'

enum RankCardError {
	InvalidHandSize = 'Invalid hand size',
	InvalidCardValues = 'Invalid card values'
}

export async function GET(request: NextRequest): Promise<NextResponse<RankHandsResponse | { msg: string }>> {
	try {
		const { handOneStrings, handTwoStrings } = getQueryParameters(request)
		const { handOne, handTwo } = createHands(handOneStrings, handTwoStrings)
		const rankings = Dealer.rankHands(handOne, handTwo)
		return NextResponse.json(buildRankHandResponse(rankings))
	} catch (e) {
		const err = e as Error
		if (Object.values(RankCardError).includes(err.message as RankCardError)) {
			return NextResponse.json({ msg: err.message }, { status: 400 })
		}

		// Don't expose random errors
		return NextResponse.json({ msg: 'Unknown error' }, { status: 500 })
	}
}

function getQueryParameters(request: NextRequest): { handOneStrings: string[]; handTwoStrings: string[] } {
	const query = request.nextUrl.searchParams
	const handOneStrings = query.get('handOne')?.split(',')
	const handTwoStrings = query.get('handTwo')?.split(',')
	if (handOneStrings?.length !== 5 || handTwoStrings?.length !== 5) {
		throw new Error(RankCardError.InvalidHandSize)
	}

	return { handOneStrings, handTwoStrings }
}

function createHands(handOneStrings: string[], handTwoStrings: string[]): { handOne: PokerHand; handTwo: PokerHand } {
	try {
		const handOneCards = handOneStrings.map(PokerCard.fromString)
		const handTwoCards = handTwoStrings.map(PokerCard.fromString)
		return { handOne: new PokerHand(handOneCards), handTwo: new PokerHand(handTwoCards) }
	} catch (_) {
		throw new Error(RankCardError.InvalidCardValues)
	}
}

function buildRankHandResponse(rankings: RankedHands): RankHandsResponse {
	const ranks = <RankHandsResponse['ranks']>[]
	for (const [handString, ranking] of Object.entries(rankings.ranks)) {
		const hand = <'handOne' | 'handTwo'>handString
		ranks.push({ hand, bestHand: ranking.bestHand.map(card => card.toString()), bestRank: ranking.rankName })
	}

	const { winner, winningHand } = rankings
	const winningCards = rankings.winningCards.map(card => card.toString())
	return { winner, winningHand, winningCards, ranks }
}
