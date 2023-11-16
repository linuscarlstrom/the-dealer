'use client'

import { useGame, useRank } from '../hooks'

import PlayerArea from './playerArea'
import GameActions from './gameActions'

export default function PlayingArea() {
	const { data, loading, newGame } = useGame()
	const { rankings, rankHands, clearRankings } = useRank()

	const onNewGame = () => {
		clearRankings()
		newGame()
	}

	const onRank = () => {
		const hands = data.handOne && data.handTwo ? [data.handOne, data.handTwo] : null
		if (hands) rankHands(hands)
	}

	if (loading || !data.handOne || !data.handTwo) return <></>

	return (
		<>
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
		</>
	)
}
