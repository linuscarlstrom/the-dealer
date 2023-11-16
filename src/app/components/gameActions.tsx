type GameActionsProps = {
	onNewGamePress: () => void
	onRankPress: () => void
	rankDisabled?: boolean
}

export default function GameActions({ onRankPress, onNewGamePress, rankDisabled = false }: GameActionsProps) {
	return (
		<div className="game-actions">
			<div className="button-area">
				<button className="button rank" onClick={onRankPress} disabled={rankDisabled}>
					<p>Rank</p>
				</button>
				<button className="button deal" onClick={onNewGamePress}>
					<p>Deal</p>
				</button>
			</div>
		</div>
	)
}
