import Hand from './hand'

type PlayerAreaProps = {
	players: {
		id: string
		hand: string[]
	}[]
	winner?: string
	winningHand?: string
	winningCards?: string[]
}

export default function PlayerArea({ players, winner, winningHand, winningCards = [] }: PlayerAreaProps) {
	console.log('winner', winner)
	return (
		<div className="player-area">
			{players.map(({ id, hand }) => (
				<div className={`player  ${id === winner || winner === 'draw' ? 'winner' : ''}`} key={id}>
					<div className="scoring">
						{id === winner ? winningHand?.replace(/-/g, ' ') : ''}
						{winner === 'draw' ? 'Draw' : ''}
					</div>

					<Hand cardStrings={hand} highlight={hand.filter(card => winningCards.includes(card))} />
				</div>
			))}
		</div>
	)
}
