import { NextResponse } from 'next/server'
import { DrawHandsResponse } from '#/types'
import { PokerDeck } from '#/lib/pokerDeck'

export const dynamic = 'force-dynamic'

export async function GET(): Promise<NextResponse<DrawHandsResponse>> {
	const pokerDeck = new PokerDeck().shuffle()
	const handOne = pokerDeck.deal(5).map(card => card.toString())
	const handTwo = pokerDeck.deal(5).map(card => card.toString())

	return NextResponse.json({ handOne, handTwo })
}
