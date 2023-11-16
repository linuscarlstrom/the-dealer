'use client'

import { useGame, useRank } from '../hooks'

import PlayerArea from './playerArea'
import GameActions from './gameActions'
import Spinner from './spinner'

export default function PlayingArea() {
	const { data, loading, refreshing, newGame } = useGame()
	const { rankings, rankHands, clearRankings, loading: loadingRanking } = useRank()

	const onNewGame = () => {
		clearRankings()
		newGame()

		// Clear winning cards on new game
		// to simply animate the card back into the hand
		rankings.winningCards = []
	}

	const onRank = () => {
		const hands = data.handOne && data.handTwo ? [data.handOne, data.handTwo] : null
		if (hands) rankHands(hands)
	}

	if (loading || !data.handOne || !data.handTwo) return <Spinner />

	return (
		<div className={`${refreshing ? 'refreshing-game' : ''} ${loadingRanking ? 'ranking-game' : ''}`}>
			<PlayerArea
				players={[
					{ id: 'handOne', hand: data.handOne },
					{ id: 'handTwo', hand: data.handTwo }
				]}
				winner={rankings.winner}
				winningHand={rankings.winningHand}
				winningCards={rankings?.winningCards}
			/>
			<GameActions onNewGamePress={onNewGame} onRankPress={onRank} rankDisabled={rankings.winner ? true : false} />
		</div>
	)
}
