type GameActionsProps = {
	onNewGamePress: () => void
	onRankPress: () => void
	rankDisabled?: boolean
}

export default function GameActions({ onRankPress, onNewGamePress, rankDisabled = false }: GameActionsProps) {
	return (
		<div className="game-actions">
			<div className="button-area">
				<button className="button" onClick={onRankPress} disabled={rankDisabled}>
					Rank
				</button>
				<button className="button" onClick={onNewGamePress}>
					Deal
				</button>
			</div>
		</div>
	)
}
